# core
import json
import random

# community
import datetime
import socket

KEY_DATETIME_EXPIRED = 'DateTimeExpired'
STORE_COOKIES = 'data/cookies.json'

def getAuthorizedCookies():
  infile = open(STORE_COOKIES,'r')
  ret = json.loads(infile.read())
  infile.close()

  return ret

def getNewSession(sessions):
  CharList = '0123456789abcdefghijklmnopqrstuvwxyz'
  SESSION_LENGTH = 16

  SessionId = ''
  for count in range(1, SESSION_LENGTH):
    SessionId += CharList[random.randrange(0, len(CharList)-1)]

  sessions[SessionId] = {
    KEY_DATETIME_EXPIRED: datetime.datetime.timestamp(datetime.datetime.now()) + 60 * 60 * 24
  }

  # persist updated sessions
  CookieFile = open(STORE_COOKIES,'w')
  CookieFile.write(json.dumps(sessions, indent=2))
  CookieFile.close()

  return SessionId

def verifyLocalDomains(req):
  # check if accessing from home addr
  # update home addr if expired
  if HomeAddr['DateTimeLastLookup'] < datetime.datetime.timestamp(datetime.datetime.now()) - 10000:
    HomeAddr['ip'] = socket.gethostbyname(ADDR_HOME)
    print (f"Home address ({ADDR_HOME}): {HomeAddr['ip']}")
    HomeAddr['DateTimeLastLookup'] = datetime.datetime.timestamp(datetime.datetime.now())

  # if req.headers.get("x-forwarded-for") == HomeAddr['ip']:
  #   return 'ok'

  # else check if cookie is valid
  print (f"Cookie: {req.cookies.get('sid')}")

  # record request
  RemoteIp = req.headers.get("x-forwarded-for")
  if not RemoteIp in scammers:
    scammers[RemoteIp] = {
      'count': 0,
      'LastHit': ''
    }

  scammers[RemoteIp]['count'] += 1
  scammers[RemoteIp]['LastTime'] = datetime.datetime.timestamp(datetime.datetime.now())
  print (f'WARNING: Accessing a home domain: {RemoteIp} ({scammers[RemoteIp]["count"]} hits)')

  resp = RedirectResponse(url='https://auth-dev.kungfoo.info/login')
  return resp

