<template>
  <q-page class="flex flex-center">
    Hello {{ user.DisplayName }}
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >
  </q-page>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref({})

const resp = await axios.get('/api/whoami')
console.log(resp.data)
if (!resp.data.sid) {
  router.push('/login')
} else {
  user.value = resp.data
}

</script>
