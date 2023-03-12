<template>
  <div class="row q-pt-md">
    <div class="col-xs-2 col-sm-3">&nbsp;</div>
    <div class="col-xs-8 col-sm-6">
      <q-card class="my-card bg-secondary text-white">
        <q-card-section>
          <div class="text-h6">Authenticate</div>
        </q-card-section>

        <q-card-section>
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input
              filled
              v-model="credentials.username"
              label="Username"
              hint="Not the one your mom gave."
              lazy-rules:rules="[ val => val && val.length > 0 || 'Please type something']"
            />

            <q-input
              filled
              type="password"
              v-model="credentials.password"
              label="Password"
              lazy-rules
              :rules="[
                val => val > 0 && val < 100 || 'Does\'t feel safe.'
              ]"
            />

            <q-toggle v-model="isRememberMe" label="Remember me" />
          </q-form>
        </q-card-section>

        <q-card-actions>
          <q-btn label="Submit" type="submit" color="black" flat/>
          <q-btn label="Reset" type="reset" color="black" flat class="q-ml-sm"/>
        </q-card-actions>

        <q-separator dark />

        <div class="q-mx-md q-mt-md">
          <q-btn label="Login with Facebook" color="white" class="full-width" outline rounded/>
          <q-btn href="/auth/github" label="Login with GitHub" color="white" class="full-width q-my-md" outline rounded/>
        </div>


      </q-card>
    </div>
    <div class="col-xs-2 col-sm-3">&nbsp;</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoginPage',
  data() {
    return {
      credentials: {
        username: '',
        password: null,
      },
      isRememberMe: false,
    }
  },
  computed: {
    debug() {
      let params = this.getQueryParams(window.location.href)
      return 'debug: ' + params.rd
    }
  },
  methods: {
    getQueryParams(url) {
      const paramArr = url.slice(url.indexOf('?') + 1).split('&');
      const params = {};
      paramArr.map(param => {
          const [key, val] = param.split('=');
          params[key] = decodeURIComponent(val);
      })
      return params;
    }
  }
})
</script>
