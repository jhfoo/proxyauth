module.exports = {
  name: "auth",
  actions: {
    verify(ctx) {
      console.log(`user from auth: ${JSON.stringify(ctx.meta.user, null, 2)}`)
      console.log(`redirect in verify(): ${ctx.params.redirect}`)
      console.log(`a: ${ctx.params.a}`)
      ctx.meta.$responseType = 'text/plain'
      ctx.meta.$responseHeaders = {
        'Remote-User': 'abctoken',
        'Remote-Group': 'MyGroup',
        'Remote-Name': 'John D',
      }
      // console.log(`req: ${JSON.stringify(req.$params, null, 2)}`)
      return 'ok';
    },
    whoami(ctx) {
      return 'whoami'
    }
  }
}