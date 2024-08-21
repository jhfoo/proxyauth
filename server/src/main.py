# core
import base64
import json
import math
import time
import os

# community
from contextlib import asynccontextmanager
from fastapi import (
  FastAPI,
  Request
)
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import requests
import yaml

# custom
import src.route.auth as RouteAuth
import src.route.metric as RouteMetric
import src.lib.MetricMgr as MetricMgr
import src.lib.AuthorizationMgr as AuthorizationMgr

FILE_APP_CONFIG = 'conf/proxyauth.yaml'
PROXYAUTH_MODE = 'PROXYAUTH_MODE'
MODE_DEV = 'dev'
MODE_PROD = 'prod'

def initModules(AppConfig):
  AuthorizationMgr.init(AppConfig)
  for domain in AuthorizationMgr.ManagedDomains:
    print (f'Manage domain: {domain}')

@asynccontextmanager
async def lifespan(app: FastAPI):
  if PROXYAUTH_MODE in os.environ:
    ConfigMode = os.environ[PROXYAUTH_MODE]
    print (f"Config mode: {ConfigMode}")
  else:
    print(f"Defaulting mode to {MODE_DEV}")
    ConfigMode = MODE_DEV

  with open(FILE_APP_CONFIG,'r') as infile:
    MasterAppConfig = yaml.safe_load(infile)

    if not ConfigMode in MasterAppConfig:
      raise Exception(f'Missing app mode: {ConfigMode}')

    AppConfig = MasterAppConfig[ConfigMode]

  # req = requests.get(f"http://consul-teller.node.consul:8500/v1/kv/proxyauth/{ConfigMode}")
  # print (f"text:{req.text}")
  # if not req.text:
  #   print(f"[ERROR] Missing Consul config")
  #   exit(1)
  # print(f'kv: {json.dumps(req.json(), indent=2)}')
  # AppConfig = json.loads(base64.b64decode(req.json()[0]['Value']).decode('utf-8'))
    app.AppConfig = AppConfig
    print (f"value: {json.dumps(AppConfig, indent=2)}")
    initModules(AppConfig)

  yield

app = FastAPI(lifespan=lifespan)
app.add_middleware(
  CORSMiddleware,
  allow_origins=[
    '*'
  ],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)



@app.middleware('http')
async def trackMetrics(req: Request, call_next):
  # print (f"DEBUG x-forwarded-for: {req.headers}")
  # measure time taken to process call
  start = time.time()
  res = await call_next(req)
  now = time.time()
  DurationSec = now - start
  DurationMs = math.ceil(DurationSec * 10000)/10
  res.headers['X-Process-Time-Msec'] = str(math.ceil(DurationSec * 10000)/10)

  metric = MetricMgr.trackCall(
    DurationMs = DurationMs,
    host = req.headers.get('host'),
    StatusCode = res.status_code,
    now = now
  )
  res.headers['X-Hit-Count'] = str(metric['count'])

  return res

# app.mount('/', StaticFiles(directory='public', html=True), name='static')
app.include_router(RouteAuth.router, prefix='/api/auth')
app.include_router(RouteMetric.router, prefix='/api/metric')
