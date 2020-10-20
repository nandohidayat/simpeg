<template>
  <v-main class="grey lighten-4 pb-7">
    <v-app-bar
      app
      color="white"
      style="z-index: 999; padding: 0;"
      tile
      dense
      class="main-layout px-5"
    >
      <a-menu v-model="current" mode="horizontal" style="width: 100%;">
        <a-sub-menu>
          <span slot="title"><a-icon type="user" />Akses</span>
          <a-menu-item key="data-akses">
            <nuxt-link :to="{ name: 'data-akses' }">
              User Akses
            </nuxt-link>
          </a-menu-item>
        </a-sub-menu>
        <a-divider type="vertical" />
        <a-sub-menu>
          <span slot="title"><a-icon type="schedule" />Jadwal</span>
          <a-menu-item key="data-jadwal">
            <nuxt-link :to="{ name: 'data-jadwal' }">
              Data Shift
            </nuxt-link>
          </a-menu-item>
          <a-menu-item key="data-jadwal-akses">
            <nuxt-link :to="{ name: 'data-jadwal-akses' }">
              Akses Jadwal
            </nuxt-link>
          </a-menu-item>
          <a-menu-item key="data-jadwal-pendapatan">
            <nuxt-link :to="{ name: 'data-jadwal-pendapatan' }">
              Pendapatan Harian
            </nuxt-link>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </v-app-bar>

    <v-container fluid class="px-10 pb-5">
      <nuxt-child />
    </v-container>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      current: [],
    }
  },
  created() {
    this.current = [this.$route.name]
  },
}
</script>
