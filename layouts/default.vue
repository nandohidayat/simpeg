<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" temporary app style="z-index: 1000;">
      <v-list dense>
        <v-list-item to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group v-for="(m, i) in $auth.user.menu" :key="i" no-action>
          <template v-slot:activator>
            <v-list-item-action>
              <v-icon>{{ m.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ m.header }}</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="(c, idx) in m.children"
            :key="idx"
            :to="c.link"
            router
            exact
          >
            <v-list-item-title>{{ c.header }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="white" style="z-index: 999;">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="d-flex justify-center align-center">
        <v-img
          src="/spp/roemani.png"
          contain
          width="45"
          class="d-inline-block mr-2"
        ></v-img>
        <span class="font-weight-light">
          RS ROEMANI
        </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="d-flex align-center">
        <div class="text-right mr-3">
          <div
            class="text-capitalize font-weight-medium"
            style="font-size: 12pt;"
          >
            {{ nama.toLowerCase() }}
          </div>
          <div class="caption" style="position: relative; top: -3px;">
            Active
          </div>
        </div>
        <v-menu offset-y nudge-bottom="15">
          <template v-slot:activator="{ on }">
            <v-avatar color="teal" size="40" style="cursor: pointer;" v-on="on">
              <v-icon dark>mdi-account-circle</v-icon>
            </v-avatar>
          </template>
          <v-card tile>
            <v-list dense>
              <v-list-item :to="`/karyawan/${$auth.user.nik}`">
                <v-list-item-icon
                  ><v-icon>mdi-account-box</v-icon></v-list-item-icon
                >
                <v-list-item-content>
                  <v-list-item-title>Profile</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider class="my-1"></v-divider>
              <v-list-item @click="logout">
                <v-list-item-icon
                  ><v-icon>mdi-exit-to-app</v-icon></v-list-item-icon
                >
                <v-list-item-content>
                  <v-list-item-title>Log Out</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </div>
    </v-app-bar>
    <v-main class="grey lighten-4">
      <v-container fluid class="px-10 pb-5">
        <nuxt />
      </v-container>
    </v-main>
    <notification-bar></notification-bar>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

import notificationBar from '@/components/notification/notification-bar'

export default {
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
    nama() {
      return this.$auth.user.nama || ''
    },
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
