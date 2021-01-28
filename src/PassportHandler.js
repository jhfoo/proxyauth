const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  FacebookStrategy = require('passport-facebook').Strategy,
  GitHubStrategy = require('passport-github').Strategy

passport.serializeUser(function(user, done) {
  console.log('serializeUser')
  console.log(user)
  done(null, user)
})

passport.deserializeUser(function(user, done) {
  done(null, user);
})

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

function initStrategies(AppConfig) {
  passport.use(new FacebookStrategy({
    clientID: AppConfig.AuthProviders.facebook.clientId,
    clientSecret: AppConfig.AuthProviders.facebook.clientSecret,
    callbackURL: AppConfig.AuthProviders.facebook.callbackUrl,
    // profileFields:['id','profileUrl','displayName','email'],
  }, (accessToken, refreshToken, profile, done) => {
    console.log(`accessToken: ${accessToken}`)
    console.log(`refreshToken: ${refreshToken}`)
    console.log(profile)
  
    done(null, {
      id: profile.id,
      name: profile.displayName,
      provider: profile.provider,
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
      id: profile.username,
      name: profile.displayName,
      provider: profile.provider,
      // accessToken: accessToken,
      // refreshToken: refreshToken,
      // profile: profile
    })
  }))
}

function registerRoutes(app) {
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
  }))
}

module.exports = {
  init(app, AppConfig) {
    initStrategies(AppConfig)

    app.use(passport.initialize())
    app.use(passport.session())    

    registerRoutes(app)
  },
  passport: passport,
}
