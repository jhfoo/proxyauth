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

// Start the broker
broker.start()
  .catch(err => console.error(`Error occured! ${err.message}`));