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
        <a-sub-menu v-if="hadSubmenu(4)">
          <span slot="title"><a-icon type="user" />Akses</span>
          <a-menu-item v-if="hadAkses(4)" key="data-akses">
            <nuxt-link :to="{ name: 'data-akses' }"> User Akses </nuxt-link>
          </a-menu-item>
          <a-menu-item v-if="hadAkses(13)" key="data-akses-group">
            <nuxt-link :to="{ name: 'data-akses-group' }"> Group </nuxt-link>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu v-if="hadSubmenu(5)">
          <span slot="title"><a-icon type="schedule" />Jadwal</span>
          <a-menu-item v-if="hadAkses(3)" key="data-jadwal">
            <nuxt-link :to="{ name: 'data-jadwal' }"> Data Shift </nuxt-link>
          </a-menu-item>
          <a-menu-item v-if="hadAkses(14)" key="data-jadwal-akses">
            <nuxt-link :to="{ name: 'data-jadwal-akses' }">
              Akses Jadwal
            </nuxt-link>
          </a-menu-item>
          <a-menu-item v-if="hadAkses(15)" key="data-jadwal-pendapatan">
            <nuxt-link :to="{ name: 'data-jadwal-pendapatan' }">
              Pendapatan Harian
            </nuxt-link>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu v-if="hadSubmenu(6)">
          <span slot="title"><a-icon type="control" />Setup</span>
          <a-menu-item v-if="hadAkses(16)" key="data-setup-departemen">
            <nuxt-link :to="{ name: 'data-setup-departemen' }">
              Departemen
            </nuxt-link>
          </a-menu-item>
          <a-sub-menu v-if="hadAkses(17)" title="Pendapatan">
            <a-menu-item key="data-setup-pendapatan">
              <nuxt-link :to="{ name: 'data-setup-pendapatan' }">
                Setup Pendapatan
              </nuxt-link>
            </a-menu-item>
            <a-menu-item key="data-setup-pendapatan-profil">
              <nuxt-link :to="{ name: 'data-setup-pendapatan-profil' }">
                Setup Profil
              </nuxt-link>
            </a-menu-item>
          </a-sub-menu>
        </a-sub-menu>
      </a-menu>
    </v-app-bar>

    <v-container fluid class="px-10 pb-5">
      <nuxt-child />
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      current: [],
    }
  },
  computed: {
    ...mapGetters('user', ['hadSubmenu', 'hadAkses']),
  },
  created() {
    this.current = [this.$route.name]
  },
}
</script>
