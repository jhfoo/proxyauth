module.exports = {
  name: "math",
  actions: {
    add(ctx) {
      return Number(ctx.params.a) + Number(ctx.params.b);
    },
    list(ctx) {
      return 'OK'
    },
    get (ctx) {
      return `get(): ${ctx.params.id}`
    }
  }
}