# core
import argparse
import json
import os
import time

# community
import yaml
import consul

# custom
import src.lib.exceptions as exceptions

FILE_APP_CONFIG = 'conf/proxyauth.yaml'
PROXYAUTH_MODE = 'PROXYAUTH_MODE'
CONSUL_KEY = 'proxyauth'
MODE_DEV = 'dev'
MODE_PROD = 'prod'
CACHE_EXPIRY_SEC = 5 * 30
KEY_DATETIMEEXPIRED = 'DateTimeExpired'
KEY_WHITELIST = 'whitelist'
KEY_DOMAINS = 'domains'

AppConfigCache = None

def getDomains():
  global AppConfigCache

  if AppConfigCache == None or \
    time.time() > AppConfigCache[KEY_DATETIMEEXPIRED]:
    getConfig()

  return AppConfigCache['data'][KEY_DOMAINS]

def getWhitelist():
  if AppConfigCache == None:
    getConfig()
  
  # update cache
  if time.time() > AppConfigCache[KEY_DATETIMEEXPIRED]:
    getConfig()

  return AppConfigCache['data'][KEY_WHITELIST]

def getConfig():
  global AppConfigCache

  if PROXYAUTH_MODE in os.environ:
    ConfigMode = os.environ[PROXYAUTH_MODE]
    print (f"Config mode: {ConfigMode}")
  else:
    print(f"Defaulting mode to {MODE_DEV}")
    ConfigMode = MODE_DEV

  # switch app config between file and consul
  MasterAppConfig = {}
  if os.environ['PROXYAUTH_CONSUL']:
    # load from consul
    con = consul.Consul(
      host = os.environ['PROXYAUTH_CONSUL']
    )
    resp = con.kv.get(CONSUL_KEY)
    # sanity check for missing Consul key
    if resp[1] == None:
      raise exceptions.PlannedException(f'Missing key in Consul: ')
    
    MasterAppConfig = json.loads(resp[1]['Value'].decode('utf-8'))
  else:
    with open(FILE_APP_CONFIG,'r') as infile:
      MasterAppConfig = yaml.safe_load(infile)

  # sanity check for config mode
  if not ConfigMode in MasterAppConfig:
    raise Exception(f'Missing config mode: {ConfigMode}')

  AppConfigCache = {
    'DateTimeExpired': time.time() + CACHE_EXPIRY_SEC,
    'data': MasterAppConfig[ConfigMode]
  }
  return AppConfigCache['data']
