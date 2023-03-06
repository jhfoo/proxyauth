const ApiGateway = require("moleculer-web");

module.exports = {
  name: "WebService",
  mixins: [ApiGateway],

  settings: {
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