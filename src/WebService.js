const 
  ApiGateway = require("moleculer-web"),
  passport = require('passport'),
  GithubStrategy = require('passport-github2').Strategy,
  secrets = require('./lib/SecretMgr').getSingleton()

init()

async function init() {
  const ClientId = await secrets.getSecretByKey('passport/github/dev/ClientId')
  const ClientSecret = await secrets.getSecretByKey('passport/github/dev/ClientSecret')
  const CallbackUrl = await secrets.getSecretByKey('passport/github/dev/CallbackUrl')
  
  passport.use(new GithubStrategy({
    clientID: ClientId,
    clientSecret: ClientSecret,
    callbackURL: CallbackUrl,
  },
    function(accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {
        
        // To keep the example simple, the user's GitHub profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the GitHub account with a user record in your database,
        // and return that user instead.
        return done(null, profile);
      });
    }
  ))
  
  passport.serializeUser(function(user, done) {
    console.log(`serializeUser: ${JSON.stringify(user, null, 2)}`)
    done(null, user);
  });
  
  passport.deserializeUser(function(obj, done) {
    console.log(`deserializeUser: ${JSON.stringify(obj, null, 2)}`)
    done(null, obj);
  });
}


module.exports = {
  name: "WebService",
  mixins: [ApiGateway],

  settings: {
    server: false,
    port: process.env.PORT || 8000,
    routes: [{
      path: '/api',
      authentication: true,
      aliases: {
        'GET verify/:redirect': [
          function (req, res, next) {
            this.verifyToken(req, res, next)
            // res.end('ok dude')
            // auth.verify(),
          },
          'auth.verify',
        ],
        'GET login': 'auth.login',
        'health': '$node.health',
        'GET services': '$node.services',
      }
    }, {
      path: '/auth',
      // authentication: true,
      aliases: {
        'GET github': [
          function (req, res, next) {
            passport.authenticate('github', {
              scope: [
                'user:email'
              ]
            })(req, res, next)
            // this.verifyToken(req, res, next)
            // res.end('ok dude')
            // auth.verify(),
          },
          'auth.verify',
        ],
        'GET github/callback': [
          function (req, res, next) {
            console.log('DEBUG: github/callback')
            passport.authenticate('github', {
              failureRedirect: '/login'
            })(req, res, next)
          },
          function (req, res, next) {
            console.log('github auth passed')
            console.log(`user: ${JSON.stringify(req.user, null, 2)}`)
            res.redirect('/welcome')
          }
        ],
        'GET whoami': [
          // function (req, res, next) {
          //   console.log('DEBUG: whoami middleware')
          //   passport.authenticate('github', {
          //     failureRedirect: '/login'
          //   })(req, res, next)
          // },
          function (req, res, next) {
            console.log(`whoami: ${JSON.stringify(req.user, null, 2)}`)
            res.end('whoami debug')
          }
        ]
        // 'auth.whoami',
      }
    }],

    // Serve assets from "public" folder
    assets: {
      folder: "./public"
    },
  },


  methods: {
    authenticate(ctx, route, req, res) {
      console.log('authorize()')
      ctx.meta.$statusCode = 302
      ctx.meta.$location = 'https://auth-dev.kungfoo.info/login'
      // return Promise.resolve(ctx)
    },
    verifyToken(req, res, next) {
      console.log(`redirect: ${req.$params.redirect}`)
      console.log(`querystring a: ${req.$params.a}`)
      console.log(`redirect: ${JSON.stringify(req.headers, null, 2)}`)
      next()
    }
  }
}
