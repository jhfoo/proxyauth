# core
import datetime
import json
import os

# community
from typing import Union, Annotated
# from typing_extensions import Annotated
from fastapi import (
  APIRouter, 
  Response
)
from fastapi.responses import PlainTextResponse 
from prometheus_client import Gauge

# custom
import src.lib.MetricMgr as MetricMgr

router = APIRouter()

@router.get('/prometheus', response_class=PlainTextResponse)
def getPrometheus(res: Response):
  return MetricMgr.render()