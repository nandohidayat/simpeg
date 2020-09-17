<template>
  <v-tabs color="teal" grow>
    <v-tab :to="{ name: 'pendapatan' }">Daftar Pendapatan</v-tab>
    <v-tab :to="{ name: 'pendapatan-template' }"
      >Download / Upload Template</v-tab
    >
    <v-tab :to="{ name: 'pendapatan-email' }">Kirim Email Pendapatan</v-tab>
    <v-tab :to="{ name: 'pendapatan-manage' }">Manage Template</v-tab>
  </v-tabs>
</template>
