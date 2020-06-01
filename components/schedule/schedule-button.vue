<template>
  <v-btn
    :color="color"
    :ripple="false"
    height="35px"
    width="35px"
    depressed
    small
    tile
    >{{ kode }}</v-btn
  >
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    shift: {
      type: Number,
      default: undefined
    },
    job: {
      type: Number,
      default: undefined
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters('shift', ['getKode']),
    ...mapGetters('job', ['getColor']),
    kode() {
      if (this.shift === undefined) return

      return this.getKode(this.shift)
    },
    color() {
      if (this.active) {
        return 'grey lighten-2'
      } else {
        return this.getColor(this.job)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
