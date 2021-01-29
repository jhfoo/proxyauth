const fs = require('fs'),
  path = require('path'),
  express = require('express'),
  app = express(),
  // session = require('express-session'),
  jwt = require('jsonwebtoken'),
  jwtDecode = require('jwt-decode')

app.use(require('cookie-parser')())

app.get('/', (req, res) => {
  let token = {}
  try {
    console.log(req.cookies['x-proxyauth-jwt'])
    jwt.verify(req.cookies['x-proxyauth-jwt'],'smelly-cat')
    token = jwtDecode(req.cookies['x-proxyauth-jwt'])
  } catch (err) {
    console.error(err)
    token = err
  }

  res
  .header('content-type','text/plain')
  .send(JSON.stringify({
    cookies: req.cookies,
    headers: req.headers,
    jwt: token,
  }, null, 2))

})

app.listen(9001, () => {
  console.log(`Listening on http://localhost:9001`)
})