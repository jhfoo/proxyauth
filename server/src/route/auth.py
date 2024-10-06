# core
import datetime
import json
import os

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
from fastapi.responses import JSONResponse

# custom
import src.lib.auth as libauth
import src.lib.SessionMgr as SessionMgr
import src.lib.AuthorizationMgr as AuthorizationMgr
import src.lib.ProfileMgr as ProfileMgr
import src.route.authn.google as GoogleAuth
import src.lib.exceptions as exceptions

ADDR_HOME = 'chie.kungfoo.info'
COOKIE_SESSION_ID = 'sid'
COOKIE_DOMAIN = 'kungfoo.info'
KEY_DATETIME_EXPIRED = 'DateTimeExpired'
KEY_WHITELIST = 'whitelist'

HomeAddr = {
  'fqdn': ADDR_HOME,
  'ip': '',
  'DateTimeLastLookup': 0,
}


# create data folder
if not os.path.exists('./data'):
  os.mkdir('./data')
  
SessionMgr.init()
# AuthorizationMgr.init()
ProfileMgr.init()

router = APIRouter()
router.include_router(GoogleAuth.router, prefix='/google')

# HomeDomains = ['evan-dev.kungfoo.info', 'chie-dev.kungfoo.info', 'grafana.kungfoo.info']

def enforceSessionId(req: Request):
  SessionId = req.cookies.get(COOKIE_SESSION_ID)
  if SessionMgr.isValidSessionId(SessionId):
    return SessionId
  
  # else
  raise HTTPException(
    status_code = status.HTTP_401_UNAUTHORIZED,
    detail = 'Invalid or missing session'
  )

@router.get('/test')
def test(req: Request):
  return req.app.AppConfig

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

  BaseUrl = f"https://{req.app.AppConfig['host']}"

  # check if accessing home domains
  TargetFqdn = req.headers.get('host')
  RemoteIp = req.headers.get("x-forwarded-for")
  # if RemoteIp in getCachedWhitelist(req.app.AppConfig['whitelist']):
  if RemoteIp in AuthorizationMgr.getWhitelist():
    return True 

  print (f"{req.headers.get('x-forwarded-for')} query: {TargetFqdn}")
  if TargetFqdn in AuthorizationMgr.getManagedDomains():
    # update home addr if expired
    HomeAddr = libauth.refreshHomeAddr(HomeAddr)
    if libauth.verifyLocalDomains(HomeAddr, req):
      return True
    else:
      return RedirectResponse(url=f'{BaseUrl}/login?e=UNAUTHORIZED&d={TargetFqdn}')

  return RedirectResponse(url=f'{BaseUrl}/login?e=UNHANDLED-DOMAIN&d={TargetFqdn}')

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
  return AuthorizationMgr.getDomains(session.ProfileId)

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
def authWhoAmI(req: Request, res: Response):
  SessionId = req.cookies.get(COOKIE_SESSION_ID)
  session = SessionMgr.getSession(SessionId)
  if session:
    # valid session
    return {
      # "profile": ProfileMgr.getProfile(session.ProfileId).dict(),
      'SessionId': SessionId,
      'ProfileId': session.ProfileId,
      'AuthorizedFqdns': AuthorizationMgr.getAuthorizedFqdn(session.ProfileId)
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


@router.post('/login')
def authSubmit(passwd: Annotated[str, Form()], email: Annotated[str, Form()]):
  # print (f"DEBUG DisplayName: {DisplayName}")
  # print (f"DEBUG email: {email}")

  profile = ProfileMgr.getProfileByEmail(email)
  if not profile:
    raise HTTPException (
      status_code = status.HTTP_400_BAD_REQUEST,
      detail = 'Unknown email'
    )

  if ProfileMgr.isPasswordMatch(email, passwd):
    raise HTTPException (
      status_code = status.HTTP_400_BAD_REQUEST,
      detail = 'Bad password'
    )

  SessionId = SessionMgr.registerSession(profile.id)

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

@router.get('/token')
def getToken(req: Request, res: Response):
  SessionId = req.cookies.get(COOKIE_SESSION_ID)
  if SessionId == None:
    SessionId = SessionMgr.registerSession()

  res.set_cookie(
    key=COOKIE_SESSION_ID,
    value=SessionId,
    domain=COOKIE_DOMAIN
  )  
  return f'SessionId: {SessionId}'

@router.get('/whitelist')
def getToken(req: Request, res: Response):
  return {
    'raw': AuthorizationMgr.RawWhitelist,
    'translated': AuthorizationMgr.getWhitelist(),
    'expires': AuthorizationMgr.WhitelistExpires
  }

@router.get('/session/{SessionId}/{ProfileId}')
def enableFqdnBySessionId(SessionId, ProfileId, req: Request, res: Response):
  # if not ('ProfileId' in session):
  #   return f'Unknown ProfileId: {session['ProfileId']}'

  if not AuthorizationMgr.isValidProfileId(ProfileId):
    raise exceptions.PlannedException(f'Invalid ProfileId: {ProfileId}')  
  SessionMgr.assignProfileId(SessionId, ProfileId)
  session = SessionMgr.getSession(SessionId)

  return f'session: {session}'

@router.get('/test/{fqdn}/{SessionId}')
def testFqdnBySessionId(fqdn, SessionId, req: Request, res: Response):
  session = SessionMgr.getSession(SessionId)
  if session is None:
    return f'Unknown session'
  # if not ('ProfileId' in session):
  #   return f'Unknown ProfileId: {session['ProfileId']}'
  isAuthorized = AuthorizationMgr.isAuthorized(session.ProfileId, fqdn)

  return {
    'SessionId': SessionId,
    'isAuthorized': isAuthorized
  }