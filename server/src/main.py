# core
import json
import math
import time

# community
from fastapi import (
  FastAPI,
  Request
)
from fastapi.staticfiles import StaticFiles

# custom
import src.route.auth as RouteAuth
import src.route.metric as RouteMetric
import src.lib.MetricMgr as MetricMgr

app = FastAPI()

@app.middleware('http')
async def trackMetrics(req: Request, call_next):
  # measure time taken to process call
  start = time.time()
  res = await call_next(req)
  now = time.time()
  DurationSec = now - start
  DurationMs = math.ceil(DurationSec * 10000)/10
  res.headers['X-Process-Time-Msec'] = str(math.ceil(DurationSec * 10000)/10)

  metric = MetricMgr.trackCall(
    DurationMs = DurationMs,
    host = req.headers.get('host'),
    StatusCode = res.status_code,
    now = now
  )
  res.headers['X-Hit-Count'] = str(metric['count'])

  return res

app.include_router(RouteAuth.router, prefix='/api/auth')
app.include_router(RouteMetric.router, prefix='/api/metric')
app.mount('/', StaticFiles(directory='public', html=True), name='static')
