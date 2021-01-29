const fs = require('fs'),
  path = require('path'),
  express = require('express'),
  app = express(),
  session = require('express-session'),
  jwt = require('jsonwebtoken'),
  jwtDecode = require('jwt-decode'),
  Config = require('./Config'),
  PassportHandler = require('./PassportHandler'),
  LoginLogoutHandler = require('./LoginLogoutHandler')

// dynamic params
const AppConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../conf/app.json'), 'utf8'))

app.use(require('cookie-parser')())
app.use(session({ 
  secret: 'smelly-cat',
  resave: false,
  saveUninitialized: true,
}))

LoginLogoutHandler.init(app)
PassportHandler.init(app, AppConfig)


function isAuthUser(profile) {
  switch (profile.provider) {
    case 'github':
      return profile.id === 'jhfoo'
    case 'facebook':
      return profile.id === '10158214699402734'
  }
  // else
  return false
}

app.get('/', (req, res) => {
  console.log('/')
  console.log(req.session)
  console.log(req.cookies)
  if (req.session.passport) {
    if (isAuthUser(req.session.passport.user)) {
      // authorise GO on proxy
      const token = jwt.sign(req.session.passport.user, AppConfig.JWT_SECRET, {
        expiresIn: '8h',
      })
      res.cookie(Config.COOKIE_NAME, token, {
        domain: AppConfig.domain.parent,
        path: '/',
        secure: true,
        httpOnly: true,
      })
  
      if (req.cookies.AuthRedirect) {
        res.redirect(302,req.cookies.AuthRedirect)
      } else {
        res.send('Authenticated and authorised')
      }
      return
    }

    // else
    res.send('Authenticated but not authorised to access')
  } else {
    res.redirect(302, '/login')
  }
})

app.get('/about', (req, res) => {
  console.log('/about')
  const out = {
    NODE_ENV: process.env.NODE_ENV,
    JwtCookie: Config.COOKIE_NAME,
    domain: AppConfig.domain,
  }

  if (req.query.format === 'json') {
    res
    .header('content-type','text/plain')
    res.send(JSON.stringify(out, null, 2))
  } else {
    res.send(out)    
  }
})

app.get('/whoami', (req, res) => {
  console.log('/whoami')
  if (req.cookies[Config.COOKIE_NAME]) {
    try {
      jwt.verify(req.cookies[Config.COOKIE_NAME], AppConfig.JWT_SECRET)
      const user = jwtDecode(req.cookies[Config.COOKIE_NAME])
      res.send(user)
    } catch (err) {
      // invalid token
      console.log(err)
      res.send(err)
    }
  } else {
    res.send({})
  }
})

app.get('/proxy-auth', (req, res) => {
  console.log('/proxy-auth')
  if (req.cookies[Config.COOKIE_NAME]) {
    try {
      jwt.verify(req.cookies[Config.COOKIE_NAME], AppConfig.JWT_SECRET)
      const user = jwtDecode(req.cookies[Config.COOKIE_NAME])
      // TODO: authorise target domain access
      res.send('ok')
    } catch (err) {
      // invalid token
      console.log(err)
      LoginLogoutHandler.clearSessionCookie(req, res).status(401).end()
    }
  } else {
    console.log(req.session)
    console.log(req.headers)
    res.status(401).end()
  }
})

app.listen(AppConfig.PORT, () => {
  console.log(`Listening on http://localhost:${AppConfig.PORT}`)
})