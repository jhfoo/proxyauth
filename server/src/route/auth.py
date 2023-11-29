# core
import datetime
# community
from typing import Union
from typing_extensions import Annotated
from fastapi import FastAPI, Request, APIRouter, Response, Form
from fastapi.responses import (
  RedirectResponse
)

# custom
import src.lib.auth as libauth
import src.lib.SessionMgr as SessionMgr

ADDR_HOME = 'chie.kungfoo.info'
COOKIE_SESSION_ID = 'sid'
COOKIE_DOMAIN = 'kungfoo.info'
KEY_DATETIME_EXPIRED = 'DateTimeExpired'

SessionMgr.init()

router = APIRouter()

scammers = {}
HomeAddr = {
  'ip': '',
  'DateTimeLastLookup': 0,
}
HomeDomains = ['evan-dev.kungfoo.info']

@router.get("/api/verify")
def verifyRequest(req: Request, q: Union[str, None] = None):
  # check if accessing home domains
  if req.headers.get('host') in HomeDomains:
    return libauth.verifyLocalDomains(req)
  
  RemoteIp = req.headers.get("x-forwarded-for")
  print (f'From {RemoteIp}')
  print (f'To {req.headers.get("x-forwarded-uri")}')
  print (req.headers)
  return {"q": q}

@router.get('/api/whoami')
def authWhoAmI(req: Request, res: Response):
  SessionId = req.cookies.get(COOKIE_SESSION_ID)

  profile = SessionMgr.getProfileBySessionId(SessionId)
  if profile:
    profile['sid'] = SessionId
    return profile

  # invalid SessionId
  res.delete_cookie(COOKIE_SESSION_ID)
  return {}
    
@router.get('/api/logout')
def authLogout(req: Request, res: Response):
  SessionId = req.cookies.get(COOKIE_SESSION_ID)
  if SessionId:
    SessionMgr.deregisterSession(SessionId)
    res.delete_cookie('sid', domain=COOKIE_DOMAIN)

  return 'ok'


@router.post('/api/auth')
def authSubmit(req: Request, 
  DisplayName: Annotated[str, Form()],
  email: Annotated[str, Form()]):
  print (f"DEBUG DisplayName: {DisplayName}")
  print (f"DEBUG email: {email}")

  SessionId = SessionMgr.registerSession(DisplayName, email)

  resp = RedirectResponse(url='/')
  resp.status_code = 302
  resp.set_cookie(
    key=COOKIE_SESSION_ID,
    value=SessionId,
    domain=COOKIE_DOMAIN
  )
  # resp = RedirectResponse(url='/api/setcookie')
  # resp.status_code = 302
  return resp

