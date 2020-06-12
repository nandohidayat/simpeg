<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" temporary app style="z-index:1000">
      <v-list dense>
        <v-list-item to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group v-for="(m, i) in user.menu" :key="i" no-action>
          <template v-slot:activator>
            <v-list-item-action>
              <v-icon>{{ m.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ m.header }}</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            :to="c.link"
            v-for="(c, idx) in m.children"
            :key="idx"
            router
            exact
          >
            <v-list-item-title>{{ c.header }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="teal" dark style="z-index:999">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Alpha System</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" outlined>
            <v-icon class="mr-2">mdi-account-circle</v-icon>
            {{ user.user.nama }}
          </v-btn>
        </template>
        <v-card tile>
          <v-list dense>
            <v-subheader>Data</v-subheader>
            <v-list-item :to="`/karyawan/${user.user.nik}`">
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
    </v-app-bar>
    <v-content>
      <v-container fluid class="px-10">
        <nuxt />
      </v-container>
    </v-content>
    <notification-bar></notification-bar>
    <v-footer color="teal">
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

import notificationBar from '@/components/notification/notification-bar'

export default {
  components: {
    'notification-bar': notificationBar
  },
  head() {
    return {
      titleTemplate: '%s - Alpha System',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Penjadwalan Karyawan'
        }
      ]
    }
  },
  data() {
    return {
      drawer: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logout')
    }
  }
}
</script>
