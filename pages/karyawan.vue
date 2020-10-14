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
      <a-menu mode="horizontal" style="width: 100%;">
        <a-sub-menu>
          <span slot="title"><a-icon type="user" />Karyawan</span>
          <a-menu-item key="daftar-karyawan">
            Daftar Karyawan
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu>
          <span slot="title"><a-icon type="schedule" />Jadwal</span>
          <a-menu-item key="jadwal-karyawan">
            Jadwal Karyawan
          </a-menu-item>
          <a-menu-item key="absen-karyawan">
            Absen Karyawan
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu>
          <span slot="title"><a-icon type="dollar" />Pendapatan</span>
          <a-menu-item key="daftar-pendapatan">
            Daftar Pendapatan
          </a-menu-item>
          <a-menu-item key="template-pendapatan">
            Template Pendapatan
          </a-menu-item>
          <a-menu-item key="email-pendapatan">
            Email Pendapatan
          </a-menu-item>
          <a-menu-item key="manage-template">
            Manage Template
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
export default {}
</script>
