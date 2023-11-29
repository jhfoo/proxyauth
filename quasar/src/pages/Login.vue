<template>
  <div class="row">
    <div class="col-md-7 gt-sm">
    </div>
    <div class="col-md-3 self-center">
      <q-card class="">
        <img src="https://cdn.quasar.dev/img/mountains.jpg">

        <q-form action="/api/auth" method="post">
          <q-card-section>
            <div class="text-h6">Log In</div>
            <!-- <div class="text-subtitle2">by John Doe</div> -->
              <q-input v-model="LoginEmail" label="Email" />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn color="primary" flat icon-right="chevron_right" label="Submit" type="submit" />
          </q-card-actions>
        </q-form>
      </q-card>
    </div>
  </div>
</template>

<style>
body, html {
  height: 100%;
}
#q-app, .row {
  height: 100%;
}
</style>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const LoginEmail = ref('')

const resp = await axios.get('/api/whoami')
console.log(resp.data)

function onSubmit() {
  console.log('onSubmit(): called')
  router.push('/')
}
</script>
