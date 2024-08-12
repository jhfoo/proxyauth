# core
import json
import random

# community
import datetime
import socket

# custom
import src.lib.SessionMgr as SessionMgr
import src.lib.ProbeTracker as ProbeTracker
import src.lib.AuthorizationMgr as AuthorizationMgr

KEY_DATETIME_EXPIRED = 'DateTimeExpired'
KEY_DATETIME_LAST_LOOKUP = 'DateTimeLastLookup'
KEY_IP = 'ip'
KEY_FQDN = 'fqdn'
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

def refreshHomeAddr(HomeAddr):
  if not KEY_DATETIME_LAST_LOOKUP in HomeAddr or HomeAddr[KEY_DATETIME_LAST_LOOKUP] < datetime.datetime.timestamp(datetime.datetime.now()) - 10000:
    HomeAddr[KEY_IP] = socket.gethostbyname(HomeAddr[KEY_FQDN])
    print (f"Home address ({ HomeAddr[KEY_FQDN] }): {HomeAddr[KEY_IP]}")
    HomeAddr[KEY_DATETIME_LAST_LOOKUP] = datetime.datetime.timestamp(datetime.datetime.now())

  return HomeAddr

def verifyLocalDomains(HomeAddr: dict, req, whitelist:list[str] ):
  RemoteIp = req.headers.get("x-forwarded-for")

  # check if accessing from home addr
  if RemoteIp == HomeAddr[KEY_IP] \
    or RemoteIp in whitelist:
    print (f'RemoteIp in whitelist: {RemoteIp}')
    return True

  # else check if cookie is valid
  print (f"Cookie: {req.cookies.get('sid')}")
  session = SessionMgr.getSession(req.cookies.get('sid'))
  if session and AuthorizationMgr.isAuthorized(session.ProfileId, req.headers.get('host')):
    return True

  # record request
  TrackCount = ProbeTracker.track({
    'ip': RemoteIp
  })

  print (f'WARNING: Accessing a home domain: {RemoteIp} ({TrackCount} hits)')
  return False


