const { ServiceBroker } = require("moleculer")

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

// Start the broker
broker.start()
  // Call the service
  // .then(() => broker.call("math.add", { a: 5, b: 3 }))
  // Print the response
  // .then(res => console.log("5 + 3 =", res))
  .catch(err => console.error(`Error occured! ${err.message}`));