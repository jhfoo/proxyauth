# core
import json
import random
import hashlib
import os
from typing import Optional

# community
from pydantic import BaseModel

class Profile(BaseModel):
  email: str
  DisplayName: str
  PasswordHash: str
  id: Optional[str] = None

FILE_PROFILES = './data/profiles.json'

_profiles = {}

def init():
  global _profiles

  # auto create profile database
  if not os.path.exists(FILE_PROFILES):
    file = open(FILE_PROFILES,'w')
    file.write(json.dumps({}, indent=2))
    file.close()

  # load profiles into cache
  file = open(FILE_PROFILES,'r')
  _profiles = json.loads(file.read())
  file.close()

def persist():
  global _profiles

  file = open(FILE_PROFILES,'w')
  file.write(json.dumps(_profiles, indent=2))
  file.close()

  return True

def getProfile(ProfileId: str):
  global _profiles

  if not ProfileId in _profiles:
    raise Exception('[ProfileMgr] Invalid ProfileId')
  
  return Profile(**_profiles[ProfileId])

def isEmailExist(email, profiles):
  for id in profiles:
    if email == profiles[id]['email']:
      return True
    
  return False

def add(profile: Profile):
  global _profiles

  # validate profile does not exist
  if isEmailExist(profile.email, _profiles):
    raise Exception('[ProfileMgr] Duplicate identifier')
  
  # validated: create ProfileId
  try:
    while True:
      # generate a salt for the ProfileId hash
      salt = str(random.randint(1,999999))
      profile.id = hashlib.md5((salt + profile.email).encode('utf-8')).hexdigest()

      if profile.id not in _profiles:
        break

    # add and save
    _profiles[profile.id] = profile.dict()
    persist()

    return profile.id
  except Exception as err:
    raise Exception(f"[ProfileMgr] {str(err)}")

def createPasswordHash(email, passwd):
  return str(hash(email + passwd))