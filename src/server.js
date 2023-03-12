const { ServiceBroker } = require("moleculer"),
  express = require('express'), 
  session = require('express-session'),
  passport = require('passport'),
  secrets = require('./lib/SecretMgr').initSingleton('http://192.168.99.30:8500')

  // web = require('./WebService')
console.log(`DEBUG singleton after init: ${secrets.ServiceBaseUrl}`)

// Create a ServiceBroker
const broker = new ServiceBroker({
  logger: console,
  hotReload: true
})

// Define a service
broker.loadServices(
  folder = 'src/services',
  fileMask = '*.js',
)
// broker.loadService('src/services/WebService')
// broker.loadService('src/services/math');
const web = broker.loadService('src/WebService')

const app = express()
app.use(session({
  secret: 'itchycat',
}))
app.use(passport.session())
app.use('/', web.express())
app.listen (8000, (err) => {
  if (err) {
    return console.error(err)
  }
  console.log('Listening on port 8000')
})

// Start the broker
broker.start()
  // Call the service
  // .then(() => broker.call("math.add", { a: 5, b: 3 }))
  // Print the response
  // .then(res => console.log("5 + 3 =", res))
  .catch(err => console.error(`Error occured! ${err.message}`));