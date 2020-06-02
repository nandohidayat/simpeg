<template>
  <v-menu
    v-model="menu"
    :position-x="x"
    :position-y="y"
    :close-on-click="false"
    :close-on-content-click="false"
    :transition="false"
    absolute
    offset-y
    z-index="21"
  >
    <v-list dense>
      <div v-if="switches">
        <v-list-item
          v-for="(j, i) in fJob"
          :key="i"
          @click="updateSchedule(j.id_job, 'job')"
          dense
        >
          <v-list-item-title>{{ j.keterangan }}</v-list-item-title>
        </v-list-item>
      </div>
      <div v-else>
        <v-list-item
          v-for="(s, i) in fShift"
          :key="i"
          @click="updateSchedule(s.id_shift)"
          dense
        >
          <v-list-item-title>{{ s.kode }}</v-list-item-title>
        </v-list-item>
      </div>
      <v-list-item @click="reset()" dense
        ><v-icon color="error">mdi-close</v-icon></v-list-item
      >
    </v-list>
  </v-menu>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    staff: {
      type: Number,
      default: undefined
    },
    day: {
      type: Array,
      default: () => []
    },
    switches: {
      type: Boolean,
      default: false
    },
    menu: {
      type: Boolean,
      default: false
    },
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters('shift', ['fShift']),
    ...mapGetters('job', ['fJob'])
  },
  methods: {
    updateSchedule(value, type = 'shift') {
      this.$store.commit('schedule/UPDATE_SCHEDULES', {
        staff: this.staff,
        day: this.day,
        value,
        type
      })
      this.reset()
    },
    reset() {
      this.$emit('update:menu', false)
      this.$emit('update:staff', undefined)
      this.$emit('update:day', [])
    }
  }
}
</script>

<style scoped></style>
