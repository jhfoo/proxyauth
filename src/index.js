const express = require('express'),
  app = express(),
  session = require('express-session'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  FacebookStrategy = require('passport-facebook').Strategy

const Config = {
  PORT: 9000
}

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
  clientID: '398360224794432',
  clientSecret: '78f145571edd612b122db36392cba8cd',
  callbackURL: "https://auth.kungfoo.info/login/facebook/callback"
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

app.use('/login/', express.static('public'))
app.use(session({ 
  secret: 'smelly-cat',
  resave: false,
  saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())


app.get('/', (req, res) => {
  console.log('/')
  console.log(req.session)
  res.send('ok')
})

app.get('/login/facebook', passport.authenticate('facebook'))
app.get('/login/facebook/callback', passport.authenticate('facebook', { 
    successRedirect: '/',
    failureRedirect: '/login' 
  })
)

app.get('/proxy-auth', (req, res) => {
  res.status(401).end()
})

app.listen(Config.PORT, () => {
  console.log(`Listening on http://localhost:${Config.PORT}`)
})