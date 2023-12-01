# core
import json

FILE_AUTHZ = 'data/authorization.json'

AuthorizationRegistry = {}

def init():
  global AuthorizationRegistry

  infile = open(FILE_AUTHZ,'r')
  AuthorizationRegistry = json.loads(infile.read())
  infile.close()

def isAuthorized(ProfileId, fqdn):
  # normalize to ProfileId
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
