<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      app
      style="z-index: 1000"
      class="left-drawer"
    >
      <v-list dense nav>
        <v-list-item-group color="#4AB0A7">
          <v-list-item to="/">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="hadMenu(1)" to="/karyawan">
            <v-list-item-icon>
              <v-icon>mdi-card-account-details</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Karyawan</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="hadMenu(2)" to="/data">
            <v-list-item-icon>
              <v-icon>mdi-database</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Database</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <template #append>
        <v-list dense class="elevation-17 font-weight-regular pa-0">
          <v-list-item-group color="#4AB0A7">
            <v-list-item :to="`/karyawan/${$auth.user.nik}`">
              <v-list-item-avatar>
                <v-icon size="40">mdi-account-circle</v-icon>
              </v-list-item-avatar>
              <v-list-item-title class="text-capitalize">{{
                nama
              }}</v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-menu offset-x max-width="150">
              <template #activator="{ on, attrs }">
                <v-list-item color="error" link v-bind="attrs" v-on="on">
                  <v-list-item-title class="text-center"
                    ><v-icon>mdi-power</v-icon></v-list-item-title
                  >
                </v-list-item>
              </template>
              <v-list dense class="pa-0">
                <v-list-item @click="logout">
                  <v-list-item-title
                    ><v-icon>mdi-power</v-icon> Log Out</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item-group>
        </v-list>
      </template>
    </v-navigation-drawer>
    <nuxt></nuxt>
    <v-footer fixed padless style="z-index: 999" width="100%">
      <v-card tile width="100%" color="#90D0CB">
        <v-row no-gutters align="center">
          <v-col cols="auto" class="mr-auto">
            <v-btn
              tile
              color="teal"
              dark
              depressed
              height="36"
              @click.stop="drawer = !drawer"
              ><v-icon left>mdi-menu</v-icon>SIMPEG</v-btn
            >
          </v-col>
          <v-col cols="auto">
            <div class="overline mr-3">RS ROEMANI MUHAMMADIYAH SEMARANG</div>
          </v-col>
        </v-row>
      </v-card>
    </v-footer>
    <notification-bar></notification-bar>
  </v-app>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import notificationBar from '@/components/notification/notification-bar'

export default {
  name: 'Default',
  components: {
    'notification-bar': notificationBar,
  },
  data() {
    return {
      drawer: false,
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters('user', ['hadMenu']),
    nama() {
      return this.$auth.user.nama ? this.$auth.user.nama.toLowerCase() : ''
    },
  },
  created() {
    if (this.$route.path === '/') {
      this.drawer = true
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logout')
    },
  },
  head() {
    return {
      titleTemplate: '%s - SIMPEG',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Penjadwalan Karyawan',
        },
      ],
    }
  },
}
</script>
