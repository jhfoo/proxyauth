const ApiGateway = require("moleculer-web")
const Cookies = require("cookies")

module.exports = {
  name: "WebService",
  mixins: [ApiGateway],

  settings: {
    port: process.env.PORT || 8005,
    routes: [{
      path: '/',
      // aliases: {
      // },
    }],

    onError(req, res) {
      res.setHeader('content-type', 'text/plain')
      res.end(`url: ${req.url}\n` +
        `headers received: ${JSON.stringify(req.headers, null, 2)}`)
    },

    // Serve assets from "public" folder
    assets: {
      folder: "./public"
    },
  },
}