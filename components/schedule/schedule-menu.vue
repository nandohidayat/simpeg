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
      <div>
        <v-list-item
          v-for="(s, i) in fShift()"
          :key="i"
          dense
          @click="updateSchedule(s.id_shift)"
        >
          <v-list-item-title>{{ s.kode || '' }}</v-list-item-title>
        </v-list-item>
      </div>
      <v-list-item dense @click="reset()"
        ><v-icon color="error">mdi-close</v-icon></v-list-item
      >
    </v-list>
  </v-menu>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    menu: {
      type: Boolean,
      default: false,
    },
    x: {
      type: Number,
      default: 0,
    },
    y: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapGetters('shift', ['fShift']),
  },
  methods: {
    updateSchedule(value) {
      this.$store.commit('schedule/UPDATE_SCHEDULES', value)
      this.reset()
    },
    reset() {
      this.$store.commit('schedule/updateSelected', {
        day: [],
        staff: undefined,
      })
      this.$emit('update:menu', false)
    },
  },
}
</script>
