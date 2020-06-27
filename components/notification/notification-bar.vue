<template>
  <div>
    <v-snackbar
      v-for="(notif, i) in notification.notifications"
      :key="i"
      :value="notification.snackbar"
      :color="notif.type"
    >
      {{ notif.text }}
      <template #action="{attrs}">
        <v-btn color="white" v-bind="attrs" text @click="del">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['notification']),
  },
  methods: {
    del() {
      this.$store.dispatch('notification/delNotif')
    },
  },
}
</script>
