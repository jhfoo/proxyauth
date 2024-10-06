# core
import json
import os
import socket
import time

# custom
import src.lib.ConfigMgr as ConfigMgr
import src.lib.exceptions as exceptions

KEY_DOMAINS = 'domains'
FILE_AUTHZ = 'data/authorization.json'
WHITELIST_EXPIRES_SEC = 5 * 60

AuthorizationRegistry = {}
WhitelistCache = None
WhitelistExpires = None
RawWhitelist = None

def init(AppConfig):
  global AuthorizationRegistry
  global ManagedDomains
  global RawWhitelist

  RawWhitelist = AppConfig['whitelist']

  if not os.path.exists(FILE_AUTHZ):
    persist()

  # load persisted config    
  infile = open(FILE_AUTHZ,'r')
  AuthorizationRegistry = json.loads(infile.read())
  infile.close()

def translateFqdn(whitelist):
  TranslatedList = []

  for fqdn in whitelist:
    try:
      ip = socket.gethostbyname(fqdn)
      TranslatedList.append(ip)
      print (f'fqdn: {fqdn} = {ip}')
    except Exception as err:
      print (f'Ignoring whitelist domain: {fqdn}')
  return TranslatedList


def getWhitelist():
  global WhitelistCache
  global WhitelistExpires

  if WhitelistExpires == None \
    or WhitelistExpires < time.time():
    WhitelistCache = translateFqdn(RawWhitelist)
    WhitelistExpires = time.time() + WHITELIST_EXPIRES_SEC
  
  return WhitelistCache

def getManagedDomains():
  # register handled domains
  return ConfigMgr.getDomains()
  
def persist():
  outfile = open(FILE_AUTHZ,'w')
  outfile.write(json.dumps(AuthorizationRegistry, indent=2))
  outfile.close()

def getAuthorizedFqdn(ProfileId):
  if not (ProfileId in AuthorizationRegistry):
    raise exceptions.PlannedException(f'Invalid ProfileId: {ProfileId}')
  
  return AuthorizationRegistry[ProfileId]

def isAuthorized(ProfileId, fqdn):
  # normalize to ProfileId
  print (f"Validating access to {fqdn}")
  if ProfileId in AuthorizationRegistry \
    and fqdn in getAuthorizedFqdn(ProfileId):
    return True
  
  print (f"WARNING: Unauthorized access by ProfileId {ProfileId} to {fqdn}")
  return False

def authorize(ProfileId, fqdn):
  global AuthorizationRegistry

  if ProfileId in AuthorizationRegistry:
    # ProfileId exists
    # check if fqdn already authorized
    if not (fqdn in AuthorizationRegistry[ProfileId]):
      # no: add to auth list
      AuthorizationRegistry[ProfileId].append(fqdn)  
  else:
    # create new entry in dict
    AuthorizationRegistry[ProfileId] = [fqdn]

  persist()
  

def getDomains(email):
  global AuthorizationRegistry

  if email in AuthorizationRegistry:
    return list(AuthorizationRegistry[email].keys())
  
  # else
  return []

def isValidProfileId(ProfileId):
  return ProfileId in AuthorizationRegistry