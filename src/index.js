const path = require('path'),
  fastify = require('fastify')({ logger: true })

fastify.register(require('fastify-cookie'), {
  // secret: "my-secret", // for cookies signature
  parseOptions: {}     // options for parsing cookies
})

console.log(path.resolve(__dirname, '../public'))
fastify.register(require('fastify-static'), {
  root: path.resolve(__dirname, '../public'),
  prefix: '/login/'
})

// fastify.get('/login', function (req, reply) {
//   return reply.sendFile('index.html', path.resolve(__dirname, '../public'))
// })

fastify.get('/proxy-auth', async (req, res) => {
  console.log(req.headers)
  res.code(401)
  // res.header('x-vouch-token','blahblah')
  // res.setCookie('MyJwt', 'MyValue', {
  //   domain: 'kungfoo.info',
  //   path: '/'
  // })
  return {
    error: '',
    // param: req.params
  }
})

const start = async() => {
  try {
    await fastify.listen(9000, '0.0.0.0')
  } catch (err) {
    fastify.log.error(err)
  }
}

start()