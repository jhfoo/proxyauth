# core
import json
import os

# custom
import src.lib.ConfigMgr as ConfigMgr
import src.lib.exceptions as exceptions

KEY_DOMAINS = 'domains'
FILE_AUTHZ = 'data/authorization.json'

AuthorizationRegistry = {}
ManagedDomains = []

def init(AppConfig):
  global AuthorizationRegistry
  global ManagedDomains


  if not os.path.exists(FILE_AUTHZ):
    persist()

  # load persisted config    
  infile = open(FILE_AUTHZ,'r')
  AuthorizationRegistry = json.loads(infile.read())
  infile.close()

  # register handled domains
  ManagedDomains = ConfigMgr.getDomains()

def persist():
  outfile = open(FILE_AUTHZ,'w')
  outfile.write(json.dumps(AuthorizationRegistry, indent=2))
  outfile.close()

def isAuthorized(ProfileId, fqdn):
  # normalize to ProfileId
  print (f"Validating access to {fqdn}")
  if ProfileId in AuthorizationRegistry and fqdn in AuthorizationRegistry[ProfileId]:
    return True
  
  print (f"WARNING: Unauthorized access by ProfileId {ProfileId} to {fqdn}")
  return False

def getDomains(email):
  global AuthorizationRegistry

  if email in AuthorizationRegistry:
    return list(AuthorizationRegistry[email].keys())
  
  # else
  return []
