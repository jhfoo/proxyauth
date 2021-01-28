const fs = require('fs'),
  path = require('path'),
  express = require('express')

const AppConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../conf/app.json'), 'utf8'))

function _clearSessionCookie(req, res) {
  req.session.destroy()
  return res.cookie('proxyauth', '', {
    domain: AppConfig.domain.parent,
    path: '/',
    secure: true,
    httpOnly: true,
  })
}

module.exports = {
  clearSessionCookie(req, res) {
    return _clearSessionCookie(req, res)
  },
  init(app) {
    app.get('/login', (req, res) => {
      res.cookie('AuthRedirect', req.query.url ? req.query.url : '')
      res.redirect(302,'/login/index.html')
    })

    app.use('/login/', express.static('public'))

    app.get('/logout', (req, res) => {
      _clearSessionCookie(req, res).redirect(302,'https://' + AppConfig.domain.auth)
    })    
  },
}
