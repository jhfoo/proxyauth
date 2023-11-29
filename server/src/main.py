# core
import json

# community
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

# custom
import src.api.verify as verify


app = FastAPI()

# @app.get("/")
# def read_root(req: Request):
#   return req.headers


# @app.api_route("/{path_name:path}", methods=["GET"])
# async def catch_all(req: Request, path_name: str):
#   print (f'STATIC: {"public" + path_name}')
#   return FileResponse('/usr/home/app/proxyauth/server/public/index.html')
#   RemoteIp = req.headers.get("x-real-ip")
#   if not RemoteIp in scammers:
#     scammers[RemoteIp] = {
#       'count': 0,
#       'LastHit': ''
#     }

#   scammers[RemoteIp]['count'] += 1
#   scammers[RemoteIp]['LastTime'] = datetime.datetime.timestamp(datetime.datetime.now())

#   print (f'Intrusion detected: {RemoteIp}, count = {scammers[RemoteIp]["count"]}')
    
#   print (req.headers)
#   return {"request_method": req.method, "path_name": path_name}

app.include_router(verify.router)
app.mount('/', StaticFiles(directory='public', html=True), name='static')
