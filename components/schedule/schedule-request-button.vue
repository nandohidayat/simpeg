<template>
  <div>
    <v-tooltip
      v-if="
        (!schedulerequest.schedule.ass &&
          parseInt(schedulerequest.schedule.req) === 1) ||
          (schedulerequest.schedule.ass &&
            parseInt(schedulerequest.schedule.req) === 0)
      "
      bottom
    >
      <template #activator="{ on }">
        <v-btn v-on="on" color="teal" icon><v-icon>mdi-sync</v-icon></v-btn>
      </template>
      <span>Processing</span>
    </v-tooltip>
    <v-tooltip
      v-if="
        !schedulerequest.schedule.ass &&
          parseInt(schedulerequest.schedule.req) === 0
      "
      bottom
    >
      <template #activator="{ on }">
        <v-btn v-on="on" @click="saveRequest(1)" color="teal" icon
          ><v-icon>mdi-send</v-icon></v-btn
        >
      </template>
      <span>Kirim</span>
    </v-tooltip>
    <v-menu
      v-if="
        schedulerequest.schedule.ass &&
          parseInt(schedulerequest.schedule.req) === 1
      "
      bottom
    >
      <template v-slot:activator="{ on: menu }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn v-on="{ ...tooltip, ...menu }" color="teal" icon
              ><v-icon>mdi-send</v-icon></v-btn
            >
          </template>
          <span>Respon</span>
        </v-tooltip>
      </template>
      <v-card>
        <v-card-text>
          <v-btn
            @click="saveRequest(2)"
            color="success"
            class="mb-3"
            small
            block
            >Accept</v-btn
          >
          <v-btn @click="saveRequest(0)" color="error" small block
            >Decline</v-btn
          >
        </v-card-text>
      </v-card>
    </v-menu>
    <v-menu
      v-if="
        schedulerequest.schedule.ass &&
          parseInt(schedulerequest.schedule.req) === 2
      "
      bottom
    >
      <template v-slot:activator="{ on: menu }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn v-on="{ ...tooltip, ...menu }" color="teal" icon
              ><v-icon>mdi-check-bold</v-icon></v-btn
            >
          </template>
          <span>Accepted</span>
        </v-tooltip>
      </template>
      <v-card>
        <v-card-text>
          <v-btn @click="saveRequest(0)" color="error" small>Cancel</v-btn>
        </v-card-text>
      </v-card>
    </v-menu>
    <v-tooltip
      v-if="
        !schedulerequest.schedule.ass &&
          parseInt(schedulerequest.schedule.req) === 2
      "
      bottom
    >
      <template #activator="{ on }">
        <v-btn v-on="on" color="teal" icon
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
  computed: {
    ...mapState(['schedulerequest'])
  },
  methods: {
    async saveRequest(status) {
      if (!confirm('Apakah anda yakin?')) return

      const data = {
        ...this.schedulerequest.schedule,
        req: status
      }

      try {
        await this.$store.dispatch('schedulerequest/updateSchedule', data)
        this.$alert('success', 'Successfully Saved')
      } catch (err) {
        this.$alert('error', err)
      }
    }
  }
}
</script>

<style scoped></style>
