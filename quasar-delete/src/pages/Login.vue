<template>
  <div class="row">
    <div class="col-md-7 gt-sm">
    </div>
    <div class="col-md-3 self-center">
      <q-card class="">
        <img src="https://cdn.quasar.dev/img/mountains.jpg">

        <template v-if="state == STATE_KNOWN">
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

        <q-form v-if="state == STATE_LOGIN" ref="Loginform" action="/api/auth/login" method="post" enctype="multipart/form-data">
          <q-card-section>
            <div class="text-h6">Log In</div>
            <div v-if="ErrorMsg" class="text-subtitle2 text-pink">{{ ErrorMsg }}</div>

            <q-input ref="FirstLoginField" name="email" v-model="LoginEmail" label="Email" />
            <q-input name="passwd" v-model="LoginPasswd" label="Password" type="password" />
            <q-btn color="secondary" outline rounded class="full-width q-mt-md" label="Login with Google" />
            <q-btn color="secondary" outline rounded class="full-width q-mt-md" label="Login with GitHub" />
          </q-card-section>

          <q-card-actions>
            <q-btn @click="setState(STATE_REGISTER)" color="secondary" flat icon="add" label="New Account" />
            <q-space />
            <q-btn color="primary" flat icon="check" label="Submit" type="submit" />
          </q-card-actions>
        </q-form>

        <q-form v-if="state == STATE_REGISTER">
          <q-card-section>
            <div class="text-h6">Register</div>
            <div v-if="ErrorMsg" class="text-subtitle2 text-pink">{{ ErrorMsg }}</div>

            <q-input name="DisplayName" v-model="LoginDisplayName" label="Display Name" :rules="[val => val.length > 3 || 'At least 3 characters.']" />
            <q-input name="email" v-model="LoginEmail" label="Email" :rules="[(val,rules) => rules.email(val) || 'Invalid email format.']"/>
            <q-input name="Passwd1" v-model="LoginPasswd1" label="Password" :rules="validatePassword1()" type="password" />
            <q-input name="Passwd2" v-model="LoginPasswd2" label="Password (repeat)" :rules="validatePassword2()" type="password" />

            <q-btn color="secondary" outline rounded class="full-width q-mt-md" label="Login with Google" />
            <q-btn color="secondary" outline rounded class="full-width q-mt-md" label="Login with GitHub" />
          </q-card-section>

          <q-card-actions>
            <q-btn @click="setState(STATE_LOGIN)" color="secondary" flat icon="undo" label="Use Existing Account" />
            <q-space />
            <q-btn @click="onRegister()" color="primary" flat icon="check" label="Submit" />
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
import { QInput } from 'quasar'

const STATE_KNOWN = 'known'
const STATE_LOGIN = 'login'
const STATE_REGISTER = 'register'

const router = useRouter()
const LoginEmail = ref('')
const LoginDisplayName = ref('')
const LoginPasswd = ref('')
const LoginPasswd1 = ref('')
const LoginPasswd2 = ref('')
const ErrorMsg = ref('')
const user = ref(await getUser())
const state = ref(getState(user, window.location.search))
const FirstLoginField = ref(null)
const LoginForm = ref(null)

parseErrorLabel(window.location.search)

function setState(NewState) {
  switch (NewState) {
    case STATE_REGISTER:
      router.push('/login?state=register')
      break
    default:
      router.push('/login')
      // LoginForm.value.focus()
      break
  }

  state.value = NewState
}

function validatePassword1() {
  const MIN_LENGTH = 8
  return [
    val => val.length > 0 || 'Cannot be empty',
    val => val.length >= MIN_LENGTH || `At least ${MIN_LENGTH} characters`,
  ]
}

function validatePassword2() {
  return [
    val => val.length > 0 || 'Cannot be empty',
    val => val === LoginPasswd1.value || 'Passwords not matching',
  ]
}

async function onRegister() {
  try {
    const fd = new FormData()
    fd.append('DisplayName', LoginDisplayName.value)
    fd.append('email', LoginEmail.value)
    fd.append('passwd', LoginPasswd1.value)
    const resp = await axios.post('/api/auth/register', fd, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

  } catch (err) {
    console.error('POST /api/auth/register failed')
    console.error(err.response.data)
    ErrorMsg.value = err.response.data.detail
  }
}

async function onLogout() {
  try {
    const resp = await axios.get('/api/auth/logout')
    location.href='/login'
  } catch (err) {
    console.error(err)
  }
}

function getState(user, url) {
  if (user.value) {
    return STATE_KNOWN
  }

  const SearchParams = new URLSearchParams(url)
  if (SearchParams.get('state') == 'register') {
    return STATE_REGISTER
  }

  // else
  return STATE_LOGIN
}

async function getUser() {
  try {
    const resp = await axios.get('/api/auth/whoami')
    return resp.data
  } catch (err) {
    console.error(`ERROR /whoami: ${err.response.data}`)
    return null
  }

}

function parseErrorLabel(url) {
  const SearchParams = new URLSearchParams(url)
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
