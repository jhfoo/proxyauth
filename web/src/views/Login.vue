<template>
  <v-container style="max-width: 960px" fill-height>
    <v-row>
      <v-col cols="12" md="6" offset-md="3">
        <v-card>
          <v-row no-gutters>
            <v-col cols="4">
              <v-img src="@/assets/kitten.jpg" contain height="200"/>
            </v-col>
            <v-col cols="8">
              <v-toolbar dense flat>
                <v-toolbar-title>{{ WelcomeMessage }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn @click="onRefreshWhoami()" icon>
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </v-toolbar>

              <template v-if="isLoggedIn">
                <v-alert @click="onLogout()" icon="mdi-account" type="warning" border="left" class="ml-3 mr-3 mb-0">
                  Not {{ this.user.name }}?<br/>Click here to fix that.
                </v-alert>
                <v-subheader>PROFILE</v-subheader>
                <v-list three-line class="pt-0 pb-0">
                  <v-list-item>
                    <v-list-item-icon><v-icon color="primary">{{ 'mdi-' + user.provider }}</v-icon></v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{ user.profile.name.toUpperCase() }}</v-list-item-title>
                      <v-list-item-subtitle>Last logged in: <br/>From: </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                <v-subheader>LAST ACCESSED</v-subheader>
                <v-list-item-group color="primary">
                  <v-list-item v-for="item in user.history" :href="'https://' + item.domain" v-bind:key="item.domain">
                    <v-list-item-content><v-list-item-title>{{ item.domain }}</v-list-item-title></v-list-item-content>
                    <v-list-item-icon><v-icon>mdi-chevron-right</v-icon></v-list-item-icon>
                  </v-list-item>
                </v-list-item-group>
              </template>
              <v-list v-else>
                <v-subheader>LOGIN</v-subheader>
                <v-list-item-group color="primary">
                  <v-list-item v-for="option in LoginOptions" :href="option.link" v-bind:key="option.text">
                    <v-list-item-icon><v-icon>{{ option.icon }}</v-icon></v-list-item-icon>
                    <v-list-item-content><v-list-item-title>{{ option.text }}</v-list-item-title></v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'

const ApiUrlPrefix = process.env.NODE_ENV === 'production' ? '' : 'http://dev2.node.consul:8002',
  RouteUrlPrefix = process.env.NODE_ENV === 'production' ? '' : 'https://auth-dev.kungfoo.info'

  export default {
    name: 'HelloWorld',
    data: () => ({
      LoginOptions: [
        {
          text: 'Login with Facebook',
          icon: 'mdi-facebook',
          link: RouteUrlPrefix + '/login/facebook',
        },
        {
          text: 'Login with GitHub',
          icon: 'mdi-github',
          link: RouteUrlPrefix + '/login/github',
        },
      ],
      user: {},
    }),
    mounted() {
      this.onRefreshWhoami()
    },
    computed: {
      WelcomeMessage() {
        return this.isLoggedIn ? 'Welcome back!' : 'Hello Stranger'
      },
      isLoggedIn() {
        return this.user.profile
      }
    },
    methods: {
      onLogout() {
        location.href= RouteUrlPrefix + "/logout"
      },
      onRefreshWhoami() {
        axios.get(ApiUrlPrefix + '/whoami').then((resp) => {
          console.log(resp.data)
          console.log(resp.data.profile)
          if (resp.data.profile) {
            this.user = resp.data
          }
        })
        .catch((err) => {
          console.error(err)
        })
      }
    }
  }
</script>