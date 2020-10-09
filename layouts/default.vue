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
    <v-app-bar app color="white" style="z-index: 999;" dense>
      <a-menu mode="horizontal" style="width: 100%;">
        <a-menu-item key="mail0">
          <a-icon type="mail" />Navigation One
        </a-menu-item>
        <a-menu-item key="mail1">
          <a-icon type="mail" />Navigation One
        </a-menu-item>
        <a-menu-item key="mail2">
          <a-icon type="mail" />Navigation One
        </a-menu-item>
        <a-menu-item key="mail3">
          <a-icon type="mail" />Navigation One
        </a-menu-item>
        <a-menu-item key="mail4">
          <a-icon type="mail" />Navigation One
        </a-menu-item>
        <a-menu-item key="mail5">
          <a-icon type="mail" />Navigation One
        </a-menu-item>
        <a-menu-item key="mail6">
          <a-icon type="mail" />Navigation One
        </a-menu-item>
        <a-menu-item key="mail7">
          <a-icon type="mail" />Navigation One
        </a-menu-item>
        <a-menu-item key="mail8">
          <a-icon type="mail" />Navigation One
        </a-menu-item>
        <a-menu-item key="mail9">
          <a-icon type="mail" />Navigation One
        </a-menu-item>
        <a-menu-item key="mail10">
          <a-icon type="mail" />Navigation One
        </a-menu-item>
        <a-menu-item key="mail11">
          <a-icon type="mail" />Navigation One
        </a-menu-item>
      </a-menu>
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
    nama() {
      return this.$auth.user.nama.toLowerCase() || ''
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

<style>
.n-btn::before {
  color: red !important;
}
</style>
