const fs = require('fs'),
  path = require('path'),
  express = require('express'),
  app = express(),
  session = require('express-session'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  FacebookStrategy = require('passport-facebook').Strategy,
  GitHubStrategy = require('passport-github').Strategy

const Config = {
  PORT: 9000
}

const AppConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../conf/app.json'), 'utf8'))

passport.use(new LocalStrategy((UserId, UserPwd, done) => {
  if (UserId === 'jhfoo' && UserPwd === 'abc') {
    return done(null, {
      name: 'Foo JH'
    })
  }

  // else
  return done(null, false, {
    message: 'Incorrect credentials'
  })
}))

passport.serializeUser(function(user, done) {
  console.log('serializeUser')
  console.log(user)
  done(null, user)
})

passport.deserializeUser(function(user, done) {
  done(null, user);
})

passport.use(new FacebookStrategy({
  clientID: AppConfig.AuthProviders.facebook.clientId,
  clientSecret: AppConfig.AuthProviders.facebook.clientSecret,
  callbackURL: AppConfig.AuthProviders.facebook.callbackUrl,
}, (accessToken, refreshToken, profile, done) => {
  console.log(`accessToken: ${accessToken}`)
  console.log(`refreshToken: ${refreshToken}`)
  console.log(profile)

  done(null, {
    accessToken: accessToken,
    refreshToken: refreshToken,
    profile: profile
  })
  // User.findOrCreate(..., function(err, user) {
  //   if (err) { 
  //     return done(err)
  //   }
  //   done(null, user)
  // })
}))

passport.use(new GitHubStrategy({
  clientID: AppConfig.AuthProviders.github.clientId,
  clientSecret: AppConfig.AuthProviders.github.clientSecret,
  callbackURL: AppConfig.AuthProviders.github.callbackUrl,
}, (accessToken, refreshToken, profile, cb) => {
  console.log(`accessToken: ${accessToken}`)
  console.log(`refreshToken: ${refreshToken}`)
  console.log(profile)

  return cb(null, {
    accessToken: accessToken,
    refreshToken: refreshToken,
    profile: profile
  })
}))

app.get('/login', (req, res) => {
  res.cookie('AuthRedirect', req.query.url ? req.query.url : '')
  res.redirect(302,'/login/index.html')
})
app.use('/login/', express.static('public'))
app.use(require('cookie-parser')())
app.use(session({ 
  secret: 'smelly-cat',
  resave: false,
  saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())

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
        domain: 'kungfoo.info',
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

app.get('/login/github', passport.authenticate('github'))
app.get('/login/github/callback', passport.authenticate('github', { 
    failureRedirect: '/login' 
  }), (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/')
  }
)

app.get('/login/facebook', passport.authenticate('facebook'))
app.get('/login/facebook/callback', passport.authenticate('facebook', { 
    successRedirect: '/',
    failureRedirect: '/login' 
  })
)

app.get('/logout', (req, res) => {
  res.cookie('proxyauth', '', {
    domain: 'kungfoo.info',
    path: '/',
  })
  .redirect(302,'https://auth.kungfoo.info')
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