# core
import datetime

KEY_COUNT = 'count'
KEY_DATETIME_LAST_TRACK = 'DateTimeLastTrack'

ProbeList = {}

def track(probe):
  RemoteIp = probe['ip']
  if not RemoteIp in ProbeList:
    ProbeList[RemoteIp] = {
      KEY_COUNT: 0,
      KEY_DATETIME_LAST_TRACK: ''
    }

  ProbeList[RemoteIp][KEY_COUNT] += 1
  ProbeList[RemoteIp][KEY_DATETIME_LAST_TRACK] = datetime.datetime.timestamp(datetime.datetime.now())

  return ProbeList[RemoteIp][KEY_COUNT]