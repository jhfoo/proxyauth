# core
import json

# community
from typing import Union, Annotated
# from typing_extensions import Annotated
from fastapi import (
  APIRouter,
  Request, 
  Response
)
from fastapi.responses import (
  RedirectResponse
)
from httpx_oauth.clients.google import GoogleOAuth2
import chompjs
from google.oauth2 import id_token
import requests
import consul

router = APIRouter()

ConsulAgent = consul.Consul(
  host='consul.service.consul',
  scheme='http'
)
idx, data = ConsulAgent.kv.get('proxyauth/dev/google')
JsonData = json.loads(data['Value'])
# print (f"Value: {JsonData}")

googleAuth = GoogleOAuth2(JsonData['ClientId'], JsonData['ClientSecret'])

@router.get('/login')
async def loginRedirect(req: Request):
  BaseUrl = f"https://{req.app.AppConfig['host']}"
  return RedirectResponse(url = await googleAuth.get_authorization_url(
    BaseUrl + '/api/auth/google/callback',
    scope=['https://www.googleapis.com/auth/userinfo.email']
    # scope=["openid", "email", "profile"]
    )
  )

@router.get('/profile/{token}')
async def getProfile(token: str):
  print (f'token: {token}')
  # UserId, UsereEmail = await googleAuth.get_id_email(token)
  # print (f'user: {UserId}, email: {UsereEmail}')
  return token
  
@router.get('/callback')
async def parseCode(code: str, req: Request):
  KEY_ACCESS = 'access_token'

  BaseUrl = f"https://{req.app.AppConfig['host']}"
  print (f'code: {code}')
  AccessToken = await googleAuth.get_access_token(code, BaseUrl + '/api/auth/google/callback')
  for key in AccessToken:
    print (f'{key}: {AccessToken[key]} ')
  idinfo = id_token.verify_oauth2_token(AccessToken['access_token'], requests.Request())
  # UserId, UserEmail = await googleAuth.get_id_email(AccessToken['access_token'])
  return 'ok'
  # token = chompjs.parse_js_object(str(AccessToken))

  # UserId, UserEmail = await googleAuth.get_id_email(token[KEY_ACCESS])
  # UserId, UserEmail = await googleAuth.get_id_email(AccessToken)
  print (f'user: {UserId}, email: {UserEmail}')
  return f'user: {UserId}, email: {UserEmail}'
