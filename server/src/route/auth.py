# core
import datetime
import json

# community
from typing import Union, Annotated
# from typing_extensions import Annotated
from fastapi import (
  APIRouter, 
  Depends,
  Form, 
  HTTPException, 
  Request, 
  Response, 
  status
)
from fastapi.responses import (
  RedirectResponse
)

# custom
import src.lib.auth as libauth
import src.lib.SessionMgr as SessionMgr
import src.lib.AuthorizationMgr as AuthorizationMgr
import src.lib.ProfileMgr as ProfileMgr

ADDR_HOME = 'chie.kungfoo.info'
COOKIE_SESSION_ID = 'sid'
COOKIE_DOMAIN = 'kungfoo.info'
KEY_DATETIME_EXPIRED = 'DateTimeExpired'

HomeAddr = {
  'fqdn': ADDR_HOME,
  'ip': '',
  'DateTimeLastLookup': 0,
}

SessionMgr.init()
AuthorizationMgr.init()
ProfileMgr.init()

router = APIRouter()

HomeDomains = ['evan-dev.kungfoo.info', 'chie-dev.kungfoo.info']

def enforceSessionId(req: Request):
  SessionId = req.cookies.get(COOKIE_SESSION_ID)
  if SessionMgr.isValidSessionId(SessionId):
    return SessionId
  
  # else
  raise HTTPException(
    status_code = status.HTTP_401_UNAUTHORIZED,
    detail = 'Invalid or missing session'
  )

@router.post('/register')
def registerProfile(
  res: Response,
  DisplayName: Annotated[str, Form()], 
  email: Annotated[str, Form()],
  passwd: Annotated[str, Form()],
):
  if len(DisplayName) < 3:
    raise HTTPException (
      status_code = status.HTTP_400_BAD_REQUEST,
      detail = 'DisplayName too short'
    )

  NewProfile = ProfileMgr.Profile(
    email = email,
    DisplayName = DisplayName,
    PasswordHash = ProfileMgr.createPasswordHash(email, passwd)
  )

  try:
    ProfileId = ProfileMgr.add(NewProfile)
    SessionId = SessionMgr.registerSession(ProfileId)
    res.set_cookie(
      key=COOKIE_SESSION_ID,
      value=SessionId,
      domain=COOKIE_DOMAIN
    )
    return 'ok'
  except Exception as err:
    raise HTTPException(
      status_code = status.HTTP_400_BAD_REQUEST,
      detail = str(err)
    )


@router.get("/verify")
def verifyRequest(req: Request, q: Union[str, None] = None):
  global HomeAddr

  # check if accessing home domains
  TargetFqdn = req.headers.get('host')
  print (f"{req.headers.get('x-forwarded-for')} query: {TargetFqdn}")
  if req.headers.get('host') in HomeDomains:
    # update home addr if expired
    HomeAddr = libauth.refreshHomeAddr(HomeAddr)
    if libauth.verifyLocalDomains(HomeAddr, req):
      return True
    else:
      return RedirectResponse(url=f'https://auth-dev.kungfoo.info/login?e=UNAUTHORIZED&d={TargetFqdn}')

  return RedirectResponse(url=f'https://auth-dev.kungfoo.info/login?e=UNHANDLED-DOMAIN&d={TargetFqdn}')

  # RemoteIp = req.headers.get("x-forwarded-for")
  # print (f'From {RemoteIp}')
  # print (f'To {req.headers.get("x-forwarded-uri")}')
  # print (req.headers)
  # return {"q": q}

@router.get('/authorized')
def authAuthorizedDomains(SessionId: Annotated[str, Depends(enforceSessionId)]):
  session = SessionMgr.getSession(SessionId)
  print (f"SessionId: {session.id}")
  profile = ProfileMgr.getProfile(session.ProfileId)
  return AuthorizationMgr.getDomains(profile.email)

@router.get('/session')
def authWhoAmI(res: Response, SessionId: Annotated[str, Depends(enforceSessionId)]):
  session = SessionMgr.getSession(SessionId)

  if session:
    # valid session
    return session.dict()

  # invalid SessionId: remove it
  res.delete_cookie(COOKIE_SESSION_ID)
  return {}

@router.get('/whoami')
def authWhoAmI(res: Response, SessionId: Annotated[str, Depends(enforceSessionId)]):
  session = SessionMgr.getSession(SessionId)
  if session:
    # valid session
    return {
      "profile": ProfileMgr.getProfile(session.ProfileId).dict(),
      "session": session.dict()
    }

  # invalid SessionId: remove it
  res.delete_cookie(COOKIE_SESSION_ID)
  return {}
    
@router.get('/logout')
def authLogout(req: Request, res: Response):
  SessionId = req.cookies.get(COOKIE_SESSION_ID)
  if SessionId:
    SessionMgr.deregisterSession(SessionId)
    res.delete_cookie(SessionMgr.KEY_SESSION_ID, domain=COOKIE_DOMAIN)

  return 'ok'


@router.post('/auth')
def authSubmit(DisplayName: Annotated[str, Form()], email: Annotated[str, Form()]):
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

