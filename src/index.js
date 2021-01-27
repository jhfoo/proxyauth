const fs = require('fs'),
  path = require('path'),
  express = require('express'),
  app = express(),
  session = require('express-session'),
  PassportHandler = require('./PassportHandler'),
  LoginLogoutHandler = require('./LoginLogoutHandler')

const Config = {
  PORT: 9000
}

const AppConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../conf/app.json'), 'utf8'))

app.use(require('cookie-parser')())
app.use(session({ 
  secret: 'smelly-cat',
  resave: false,
  saveUninitialized: true,
}))

LoginLogoutHandler.init(app, AppConfig)
PassportHandler.init(app, AppConfig)


function isAuthUser(profile) {
  switch (profile.provider) {
    case 'github':
      return profile.id === '5701889'
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
    if (isAuthUser(req.session.passport.user.profile)) {
      // authorise GO on proxy
      res.cookie('proxyauth', 'aaabbb', {
        domain: AppConfig.domain.parent,
        path: '/',
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



app.get('/proxy-auth', (req, res) => {
  if (req.cookies.proxyauth && req.cookies.proxyauth === 'aaabbb') {
    res.send('ok')
  } else {
    console.log(req.session)
    console.log(req.headers)
    res.status(401).end()
  }
})

app.listen(Config.PORT, () => {
  console.log(`Listening on http://localhost:${Config.PORT}`)
})