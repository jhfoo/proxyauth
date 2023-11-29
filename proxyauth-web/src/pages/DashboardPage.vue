<template>
  <div class="row q-pt-md">
    <div class="col-xs-2 col-sm-3">&nbsp;</div>
    <div class="col-xs-8 col-sm-6">
      you are
    </div>
    <div class="col-xs-2 col-sm-3">&nbsp;</div>
  </div>
</template>

<script>
import axios from 'axios'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DashboardPage',
  data() {
    return {
    }
  },
  async setup() {
    let resp = await axios.get('https://auth-dev.kungfoo.info/auth/whoami')
    console.log(resp.data)
    if (Object.keys(resp.data).length === 0) {
      location.href='/#/login'
    }
  },
  computed: {
  },
  methods: {
  }
})
</script>
