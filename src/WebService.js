const 
  ApiGateway = require("moleculer-web"),
  passport = require('passport'),
  GithubStrategy = require('passport-github2').Strategy,
  jwt = require('jsonwebtoken'),
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
      authorization: true,
      aliases: {
        'GET verify/:redirect': 'auth.verify',
        'health': '$node.health',
        'GET services': '$node.services',
        'GET login': 'auth.login',
      }
    }, {
      path: '/auth',
      cors: {
        origin: '*',
      },
      // authentication: true,
      aliases: {
        'GET logout': [
          function (req, res, next) {
            req.logout((err) => {
              if (err) {
                console.error(`ERROR: ${err}`)
              } 
              res.clearCookie('AuthToken')
              res.redirect('/#/login')
            })
          },
        ],
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
              failureRedirect: '/#/login'
            })(req, res, next)
          },
          async function (req, res, next) {
            console.log('github auth passed')
            console.log(`user: ${JSON.stringify(req.user, null, 2)}`)

            // prepare jwt
            TOKEN_EXPIRY_SEC = 60 * 60
            let payload = {
              provider: req.user.provider,
              UserId: req.user.username,
              UserName: req.user.displayName,
              exp: Math.floor(Date.now() / 1000) + TOKEN_EXPIRY_SEC,
            }

            // set jwt in cookie
            let token = jwt.sign(payload, await secrets.getSecretByKey('jwt/dev/default'))
            console.log(`jwt: ${token}`)
            res.cookie('AuthToken', token, {
              httpOnly: true,
              domain: 'kungfoo.info',
            })
            res.redirect('/#/dashboard')
          }
        ],
        'GET whoami': [
          // function (req, res, next) {
          //   console.log('DEBUG: whoami middleware')
          //   passport.authenticate('github', {
          //     failureRedirect: '/login'
          //   })(req, res, next)
          // },
          async function (req, res, next) {
            let DecodedToken = await this.getIdentityFromRequest(req)
            console.log(`whoami: ${JSON.stringify(DecodedToken, null, 2)}`)
            if (DecodedToken) {
              res.end(JSON.stringify(DecodedToken, null, 2))
            } else {
              res.end('{}')
            }
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
    async getIdentityFromRequest(req) {
      console.log('authorize()')

      token = req.cookies.AuthToken
      if (token) {
        console.log(`DEBUG jwt found in cookie: ${token}`)

        // decode and verify token
        try {
          return jwt.verify(token, await secrets.getSecretByKey('jwt/dev/default'))
        } catch (err) {
          if (err instanceof jwt.TokenExpiredError) {
            console.log(`ERROR: TokenExpiredError`)
          } else {
            console.error('unknown error')
          }
          return null
        }
      }

    },
    async authorize(ctx, route, req, res) {
      console.log(`DEBUG authorize: ${JSON.stringify(ctx.meta, null, 2)}`)
      return Promise.resolve(ctx)
    },
    async authenticate(ctx, route, req, res) {
      let DecodedToken = await this.getIdentityFromRequest(req)
      if (DecodedToken) {
        // auth passed
        return Promise.resolve(DecodedToken)
      }
      // auth failed
      console.log(`DEBUG: auth failed`)
      return Promise.reject()

      // auth fail
      // ctx.meta.$statusCode = 302
      // ctx.meta.$location = 'https://auth-dev.kungfoo.info/login'
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
