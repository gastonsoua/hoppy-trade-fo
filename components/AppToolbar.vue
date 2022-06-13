<template>
  <v-toolbar
    color="primary"
    fixed
    dark
    app
  >
    <v-menu offset-y origin="center center" :nudge-right="140" :nudge-bottom="10" transition="scale-transition">
      <v-btn large flat slot="activator" :to="'/'">
       home
      </v-btn>
    </v-menu>
    <v-spacer/>
    <v-menu offset-y origin="center center" :nudge-right="140" :nudge-bottom="10" transition="scale-transition">
      <v-btn  flat slot="activator" @click="handleLogout" v-if="$auth.loggedIn">
        Logout
      </v-btn>
      <v-btn  flat slot="activator" :to="'/login'" v-if="!$auth.loggedIn">
        login
      </v-btn>
      <v-btn  flat slot="activator" :to="'/register'" v-if="!$auth.loggedIn">
        Inscription
      </v-btn>
    </v-menu>
    <v-btn icon @click="handleFullScreen()">
      <v-icon>fullscreen</v-icon>
    </v-btn>
  </v-toolbar>
</template>
<script>
  import Util from '@/util';

  export default {
    name: 'app-toolbar',
    methods: {
      toggleDrawer() {
        this.$store.commit('toggleDrawer')
      },
      handleFullScreen() {
        Util.toggleFullScreen();
      },
      handleLogout() {
        this.$auth.logout()
      }
    }
  };
</script>
