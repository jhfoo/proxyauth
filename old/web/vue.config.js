module.exports = {
  outputDir: '../public',
  publicPath: '/login/',
  devServer: {
    host: 'dev2.node.consul',
    // host: 'auth-devweb.kungfoo.info',
  },

  transpileDependencies: [
    'vuetify'
  ]
}
