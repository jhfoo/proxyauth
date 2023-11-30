# core
import json

FILE_AUTHZ = 'data/authorization.json'

AuthorizationRegistry = {}

def init():
  global AuthorizationRegistry

  infile = open(FILE_AUTHZ,'r')
  AuthorizationRegistry = json.loads(infile.read())
  infile.close()

def isAuthorized(email, fqdn):
  if email in AuthorizationRegistry and fqdn in AuthorizationRegistry[email]:
    return True
  
  print (f"WARNING: Unauthorized access by {email} to {fqdn}")
  return False

def getDomains(email):
  global AuthorizationRegistry

  if email in AuthorizationRegistry:
    return list(AuthorizationRegistry[email].keys())
  
  # else
  return []
