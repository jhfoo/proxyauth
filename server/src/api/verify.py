# core
import random

# community
from typing import Union
from fastapi import FastAPI, Request, APIRouter
import datetime
import socket
from fastapi.responses import (
  RedirectResponse
)

router = APIRouter()

scammers = {}
HomeAddr = {
  'ip': '',
  'DateTimeLastLookup': 0,
}
HomeDomains = ['evan-dev.kungfoo.info']
ADDR_HOME = 'chie.kungfoo.info'

@router.get("/api/verify")
def verifyRequest(req: Request, q: Union[str, None] = None):
  # check if accessing home domains
  if req.headers.get('host') in HomeDomains:
    return verifyLocalDomains(req)
  
  RemoteIp = req.headers.get("x-forwarded-for")
  print (f'From {RemoteIp}')
  print (f'To {req.headers.get("x-forwarded-uri")}')
  print (req.headers)
  return {"q": q}

@router.get('/api/whoami')
def authWhoAmI(req: Request):
  print (f'Cookies: {req.cookies.get("sid")}')
  return {
    'sid': req.cookies.get('sid')
  }
  
@router.get('/api/logout')
def authLogout(req: Request):
  resp = RedirectResponse('/')
  resp.delete_cookie('sid', domain='kungfoo.info')
  return resp


@router.post('/api/auth')
def authSubmit(req: Request):
  resp = RedirectResponse(url='/')
  resp.status_code = 302
  resp.set_cookie(
    key='sid',
    value=getNewSession(),
    domain='kungfoo.info'
  )
  # resp = RedirectResponse(url='/api/setcookie')
  # resp.status_code = 302
  return resp

def getNewSession():
  CharList = '0123456789abcdefghijklmnopqrstuvwxyz'
  ret = ''
  print (f"CharList size: {len(CharList)}")
  for count in range(1,10):
    ret += CharList[random.randrange(0, len(CharList)-1)]

  return ret

def verifyLocalDomains(req):
  # check if accessing from home addr
  # update home addr if expired
  if HomeAddr['DateTimeLastLookup'] < datetime.datetime.timestamp(datetime.datetime.now()) - 10000:
    HomeAddr['ip'] = socket.gethostbyname(ADDR_HOME)
    print (f"Home address ({ADDR_HOME}): {HomeAddr['ip']}")
    HomeAddr['DateTimeLastLookup'] = datetime.datetime.timestamp(datetime.datetime.now())

  if req.headers.get("x-forwarded-for") == HomeAddr['ip']:
    return 'ok'

  # else
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

