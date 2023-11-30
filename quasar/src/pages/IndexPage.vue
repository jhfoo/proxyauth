<template>
  <q-page class="">
    <div>Hello {{ user.DisplayName }} ({{ user.email }})</div>
    <div>Authorized Hosts</div>
    <div v-for="host in AuthorizedHosts">- <a :href="'https://' + host">{{ host }}</a></div>
    
  </q-page>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref({})
const AuthorizedHosts = ref([])

user.value = await getUserProfile()
if (!user.value) {
  router.push('/login')
}

AuthorizedHosts.value = await getAuthorizedHosts()

async function getAuthorizedHosts() {
  const resp = await axios.get('/api/authorized')
  console.log(resp.data)
  return resp.data
}

async function getUserProfile() {
  const resp = await axios.get('/api/whoami')
  console.log(resp.data)
  return resp.data.sid ? resp.data : null
} 
</script>
