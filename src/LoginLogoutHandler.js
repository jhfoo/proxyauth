const express = require('express')

module.exports = {
  init(app, AppConfig) {
    app.get('/login', (req, res) => {
      res.cookie('AuthRedirect', req.query.url ? req.query.url : '')
      res.redirect(302,'/login/index.html')
    })
    app.use('/login/', express.static('public'))

    app.get('/logout', (req, res) => {
      res.cookie('proxyauth', '', {
        domain: AppConfig.domain.parent,
        path: '/',
      })
      .redirect(302,'https://' + AppConfig.domain.auth)
    })    
  },
}
