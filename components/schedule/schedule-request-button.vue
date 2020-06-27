<template>
  <div>
    <v-tooltip
      v-if="
        (!schedulerequest.schedule.assessor &&
          parseInt(schedulerequest.schedule.status) === 1) ||
        (schedulerequest.schedule.assessor &&
          parseInt(schedulerequest.schedule.status) === 0)
      "
      bottom
      z-index="20"
    >
      <template #activator="{ on }">
        <v-btn color="teal" icon v-on="on"><v-icon>mdi-sync</v-icon></v-btn>
      </template>
      <span v-if="schedulerequest.schedule.assessor">Belum Dikirim</span>
      <span v-else>Sedang Direview</span>
    </v-tooltip>
    <v-tooltip
      v-if="
        !schedulerequest.schedule.assessor &&
        parseInt(schedulerequest.schedule.status) === 0
      "
      bottom
      z-index="20"
    >
      <template #activator="{ on }">
        <v-btn color="teal" icon v-on="on" @click="saveRequest(1)"
          ><v-icon>mdi-send</v-icon></v-btn
        >
      </template>
      <span>Kirim</span>
    </v-tooltip>
    <v-menu
      v-if="
        schedulerequest.schedule.assessor &&
        parseInt(schedulerequest.schedule.status) === 1
      "
      bottom
      z-index="20"
    >
      <template v-slot:activator="{ on: menu }">
        <v-tooltip bottom z-index="20">
          <template v-slot:activator="{ on: tooltip }">
            <v-btn color="teal" icon v-on="{ ...tooltip, ...menu }"
              ><v-icon>mdi-send</v-icon></v-btn
            >
          </template>
          <span>Respon</span>
        </v-tooltip>
      </template>
      <v-list dense>
        <v-list-item @click="saveRequest(2)">Accept</v-list-item>
        <v-list-item @click="saveRequest(0)">Decline</v-list-item>
      </v-list>
    </v-menu>
    <v-menu
      v-if="
        schedulerequest.schedule.assessor &&
        parseInt(schedulerequest.schedule.status) === 2
      "
      bottom
      z-index="20"
    >
      <template v-slot:activator="{ on: menu }">
        <v-tooltip bottom z-index="20">
          <template v-slot:activator="{ on: tooltip }">
            <v-btn color="teal" icon v-on="{ ...tooltip, ...menu }"
              ><v-icon>mdi-check-bold</v-icon></v-btn
            >
          </template>
          <span>Accepted</span>
        </v-tooltip>
      </template>
      <v-list>
        <v-list-item @click="saveRequest(0)">Cancel</v-list-item>
      </v-list>
    </v-menu>
    <v-tooltip
      v-if="
        !schedulerequest.schedule.assessor &&
        parseInt(schedulerequest.schedule.status) === 2
      "
      bottom
      z-index="20"
    >
      <template #activator="{ on }">
        <v-btn color="teal" icon v-on="on"
          ><v-icon>mdi-check-bold</v-icon></v-btn
        >
      </template>
      <span>Accepted</span>
    </v-tooltip>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    month: {
      type: [String, Number],
      default: undefined,
    },
    year: {
      type: [String, Number],
      default: undefined,
    },
    dept: {
      type: String,
      default: String,
    },
  },
  computed: {
    ...mapState(['schedulerequest']),
  },
  methods: {
    async saveRequest(status) {
      if (!confirm('Apakah anda yakin?')) return

      try {
        await this.$store.dispatch('schedulerequest/updateSchedule', {
          dept: this.dept,
          year: this.year,
          month: this.month,
          status,
        })
        this.$alert('success', 'Successfully Saved')
      } catch (err) {
        this.$alert('error', err)
      }
    },
  },
}
</script>
