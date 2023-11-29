# core
import json
import random
import datetime



STORE_COOKIES = 'data/cookies.json'
KEY_DATETIME_EXPIRED = 'DateTimeExpired'
KEY_DISPLAY_NAME = 'DisplayName'
KEY_EMAIL = 'email'

_sessions = {}

def init():
  infile = open(STORE_COOKIES,'r')
  global _sessions
  _sessions = json.loads(infile.read())
  infile.close()

  # scrub registered sessions for expiry
  ExpiredSessionCount = 0
  for SessionId in list(_sessions.keys()).copy():
    if _sessions[SessionId][KEY_DATETIME_EXPIRED] < datetime.datetime.timestamp(datetime.datetime.now()):
      ExpiredSessionCount += 1
      del _sessions[SessionId]

  if ExpiredSessionCount > 0:
    print (f"Purging expired sessions: {ExpiredSessionCount}")
    persist()

  print (f"SessionMgr initialized: {len(_sessions.keys())} sessions registered")
  return True

def persist():
  CookieFile = open(STORE_COOKIES,'w')
  CookieFile.write(json.dumps(_sessions, indent=2))
  CookieFile.close()

def isValidSessionId(SessionId):
  if SessionId in _sessions:
    # session registered
    if _sessions[SessionId][KEY_DATETIME_EXPIRED] >= datetime.datetime.timestamp(datetime.datetime.now()):
      # session not expired
      return True
    else:
      # session expired: deregister session
      print (f"SessionId expired: {SessionId}")
      del _sessions[SessionId]
      persist()
  else:
    print(f"SessionId not registered: {SessionId}")

  return False

def getProfileBySessionId(SessionId):
  if isValidSessionId(SessionId):
    return _sessions[SessionId]

  # else
  return {}
  

def getNewSession():
  CharList = '0123456789abcdefghijklmnopqrstuvwxyz'
  SESSION_LENGTH = 16

  SessionId = ''
  for count in range(1, SESSION_LENGTH):
    SessionId += CharList[random.randrange(0, len(CharList)-1)]

  _sessions[SessionId] = {
    KEY_DATETIME_EXPIRED: datetime.datetime.timestamp(datetime.datetime.now()) + 60 * 60 * 24
  }

  return SessionId

def deregisterSession(SessionId):
  del _sessions[SessionId]
  persist()

def registerSession(DisplayName, email):
  SessionId = getNewSession()

  _sessions[SessionId] = {
    KEY_DISPLAY_NAME: DisplayName,
    KEY_EMAIL: email,
    KEY_DATETIME_EXPIRED: int(datetime.datetime.timestamp(datetime.datetime.now()) + 60 * 60 * 24)
  }

  persist()
  return SessionId