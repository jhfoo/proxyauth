# core
import math
import time

# community
import prometheus_client
from prometheus_client import Gauge, generate_latest

# custom
import src.lib.MetricMgr as MetricMgr

PUBLISH_FREQ_SEC = 5 * 60 
_DateTimeNextPublish = None
_PublishedMetrics = {}
_CurrentMetrics = {}
_registry = None

def _render(data):
  registry = prometheus_client.CollectorRegistry() 

  # create instruments
  HostHits = Gauge(
    'HostHits',
    'Number of requests to a host',
    ['host'],
    registry = registry
  )

  HostStatus = Gauge(
    'HostStatus',
    'HTTP response status code',
    ['host','StatusCode'],
    registry = registry
  )

  for host in data:
    print (f"{host} count: {data[host]['count']}")
    HostHits.labels(host = host).set(data[host]['count'])
    for StatusCode in data[host]['StatusCode']:
      HostStatus.labels(host = host, StatusCode = StatusCode).set(data[host]['StatusCode'][StatusCode])

  return generate_latest(registry)

def renderCurrent():
  global _CurrentMetrics

  return _render(_CurrentMetrics)

def render():
  global _registry
  global _PublishedMetrics

  # is data expired?
  if not _DateTimeNextPublish or time.time() > _DateTimeNextPublish:
    # yes: publish empty metrics
    _registry = _render({})
  else:
    # no: if registry cached?
    if not _registry:
      print (f"Create new registry")
      _registry = _render(_PublishedMetrics)

  return _registry
  

def trackCall(
  DurationMs: float,
  host: str,
  StatusCode: int,
  now: float
):
  global _DateTimeNextPublish
  global _PublishedMetrics
  global _CurrentMetrics
  global _registry

  # check if time to publish
  if _DateTimeNextPublish == None:
    # app just started: set next publish date/time
    _DateTimeNextPublish = math.floor(time.time()) + PUBLISH_FREQ_SEC
    _registry = None
  elif _DateTimeNextPublish < now:
    # time to publish
    _PublishedMetrics = _CurrentMetrics
    _CurrentMetrics = {}
    _DateTimeNextPublish = math.floor(time.time()) + PUBLISH_FREQ_SEC 
    _registry = None

  if not host in _CurrentMetrics:
    # add host to metrics
    _CurrentMetrics[host] = {
      'host': host,
      'count': 0,
      'StatusCodeCount': {},
      'DurationMsTotal': 0
    }

  # update metrics
  _CurrentMetrics[host]['count'] += 1
  _CurrentMetrics[host]['DurationMsTotal'] += DurationMs
  if not 'StatusCode' in _CurrentMetrics[host]:
    _CurrentMetrics[host]['StatusCode'] = {}
  if not StatusCode in _CurrentMetrics[host]['StatusCode']:
    _CurrentMetrics[host]['StatusCode'][StatusCode] = 0
  _CurrentMetrics[host]['StatusCode'][StatusCode] += 1

  print (MetricMgr.renderCurrent().decode())

  return _CurrentMetrics[host]