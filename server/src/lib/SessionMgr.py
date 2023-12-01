# core
import json
import random
import datetime
from typing import Union

# community
from pydantic import BaseModel

STORE_COOKIES = 'data/cookies.json'
KEY_DATETIME_EXPIRED = 'DateTimeExpired'
KEY_DISPLAY_NAME = 'DisplayName'
KEY_EMAIL = 'email'
KEY_SESSION_ID = 'sid'
KEY_PROFILE_ID = 'ProfileId'

_sessions = {}

class Session(BaseModel):
  id: str
  ProfileId: str
  DateTimeExpired: Union[int, None] = None


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
  global _sessions

  if SessionId == None:
    return False
  
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

def getSession(SessionId):
  global _sessions

  print (f"Retrieving profile by sessionId: {SessionId}")

  if isValidSessionId(SessionId):
    print (f"Session found: ${SessionId}")
    return Session(**_sessions[SessionId]) 

  # else
  return None
  

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

def registerSession(ProfileId):
  # remove existing session with duplicate email
  for SessionId in list(_sessions.keys()).copy():
    if KEY_PROFILE_ID in _sessions[SessionId] and _sessions[SessionId][KEY_PROFILE_ID] == ProfileId:
      # found duplicate: remove
      del _sessions[SessionId]
      print (f"Removed duplicate registered ProfileId: {ProfileId}")

  SessionId = getNewSession()
  NewSession = Session(
    ProfileId = ProfileId,
    id = SessionId,
    DateTimeExpired = int(datetime.datetime.timestamp(datetime.datetime.now()) + 60 * 60 * 24),
  )
  _sessions[SessionId] = NewSession.dict()

  persist()
  return SessionId