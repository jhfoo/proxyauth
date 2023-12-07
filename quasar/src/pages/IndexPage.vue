<template>
  <q-page class="">
    <div>Hello {{ user.profile.DisplayName }} ({{ user.profile.email }})</div>
    <div>Expires: {{ user.session.DateTimeExpiredFormatted.format('D MMM YYYY, h:ma') }}</div>
    <div>Authorized Hosts</div>
    <div v-for="host in AuthorizedHosts">- <a :href="'https://' + host">{{ host }}</a></div>
    
  </q-page>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'

const router = useRouter()
const user = ref({})
const AuthorizedHosts = ref([])

user.value = await getUser()
if (!user.value) {
  router.push('/login')
} else {
  AuthorizedHosts.value = await getAuthorizedHosts()
}


async function getAuthorizedHosts() {
  const resp = await axios.get('/api/auth/authorized')
  console.log(resp.data)
  return resp.data
}

async function getUser() {
  try {
    const resp = await axios.get('/api/auth/whoami')
    console.log(resp.data)
    if (!resp.data) {
      return null
    }

    resp.data.session.DateTimeExpiredFormatted = dayjs.unix(resp.data.session.DateTimeExpired)
    return resp.data
  } catch (err) {
    console.error((err))
    return null
  }
} 
</script>
