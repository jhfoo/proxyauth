<template>
  <div class="row">
    <div class="col-md-7 gt-sm">
    </div>
    <div class="col-md-3 self-center">
      <q-card class="">
        <img src="https://cdn.quasar.dev/img/mountains.jpg">

        <template v-if="user">
          <q-card-section>
            <div class="text-h6">Log In</div>
            <div v-if="ErrorMsg" class="text-subtitle2 text-pink">{{ ErrorMsg }}</div>
            <div class="q-pt-md">Continue as {{ user.DisplayName }}?</div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn color="amber-10" flat icon="change_circle" label="Change Account" @click="onLogout" />
            <q-btn color="primary" flat icon="done" label="Continue" to="/" />
          </q-card-actions>
        </template>

        <q-form v-else action="/api/auth" method="post" enctype="multipart/form-data">
          <q-card-section>
            <div class="text-h6">Log In</div>
            <div v-if="ErrorMsg" class="text-subtitle2 text-pink">{{ ErrorMsg }}</div>

            <q-input name="DisplayName" v-model="LoginDisplayName" label="Display Name" />
            <q-input name="email" v-model="LoginEmail" label="Email" />
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
const LoginDisplayName = ref('')
const ErrorMsg = ref('')
const user = ref({})

const resp = await axios.get('/api/whoami')
console.log(resp.data)

parseErrorLabel()
user.value = await getUserBySession()

async function onLogout() {
  try {
    const resp = await axios.get('/api/logout')
    location.href='/login'
  } catch (err) {
    console.error(err)
  }
}

async function getUserBySession() {
  const resp = await axios.get('/api/whoami')
  return resp.data.sid ? resp.data : null 
}

function parseErrorLabel() {
  const SearchParams = new URLSearchParams(window.location.search)
  switch (SearchParams.get('e')) {
    case 'UNHANDLED-DOMAIN':
      ErrorMsg.value = `Domain ${SearchParams.get('d')} is not managed.`
      break
    case 'UNAUTHORIZED':
      ErrorMsg.value = `Not authorized to access ${SearchParams.get('d')}.`
      break
  }
}

function onSubmit() {
  console.log('onSubmit(): called')
  router.push('/')
}
</script>
