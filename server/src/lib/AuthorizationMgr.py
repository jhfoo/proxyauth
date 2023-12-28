# core
import json
import os

KEY_DOMAINS = 'domains'
FILE_AUTHZ = 'data/authorization.json'

AuthorizationRegistry = {}
ManagedDomains = []

def init(AppConfig):
  global AuthorizationRegistry


  if not os.path.exists(FILE_AUTHZ):
    persist()

  # load persisted config    
  infile = open(FILE_AUTHZ,'r')
  AuthorizationRegistry = json.loads(infile.read())
  infile.close()

  # register handled domains
  if not KEY_DOMAINS in AppConfig:
    raise Exception (f"Missing key in app config: {KEY_DOMAINS}")
  ManagedDomains = AppConfig[KEY_DOMAINS]

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
