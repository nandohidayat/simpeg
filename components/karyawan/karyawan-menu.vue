<template>
  <v-card outlined class="stickthiscard">
    <v-card-text class="text-center">
      <v-avatar color="indigo" size="200" class="mb-4">
        <v-icon size="200" dark>mdi-account-circle</v-icon>
      </v-avatar>
      <v-list dense>
        <v-list-item-group color="teal">
          <v-list-item :to="`#${k.id}`" v-for="(k, i) in menu" :key="i">
            <v-list-item-icon>
              <v-icon>{{ k.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              {{ k.text }}
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    access: {
      type: Boolean,
      default: false
    },
    delete: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    menu() {
      const arr = [
        {
          icon: 'mdi-clipboard-account-outline',
          text: 'Data Karyawan',
          id: 'data-karyawan'
        },
        {
          icon: 'mdi-calendar',
          text: 'Data Jadwal',
          id: 'data-jadwal'
        },
        {
          icon: 'mdi-fingerprint',
          text: 'Data Absen',
          id: 'data-absen'
        }
      ]

      if (this.access) {
        arr.push({
          icon: 'mdi-shield-account',
          text: 'Data Akses',
          id: 'data-akses'
        })
      }

      if (this.delete) {
        arr.push({
          icon: 'mdi-alert',
          text: 'Hapus Karyawan',
          id: 'hapus-karyawan'
        })
      }

      return arr
    }
  }
}
</script>

<style scoped>
.stickthiscard {
  position: fixed;
}
</style>
