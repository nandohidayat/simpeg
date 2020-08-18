<template>
  <v-btn
    :color="bgColor"
    :ripple="false"
    height="35px"
    width="35px"
    depressed
    small
    tile
    :class="className"
    ><span>{{ kode }}</span></v-btn
  >
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    shift: {
      type: Number,
      default: undefined,
    },
    active: {
      type: Boolean,
      default: false,
    },
    className: {
      type: Object,
      default: undefined,
    },
  },
  computed: {
    ...mapGetters('shift', ['getKode', 'getBgColor']),
    kode() {
      if (this.shift === undefined) return

      return this.getKode(this.shift)
    },
    bgColor() {
      if (this.active) {
        return 'grey lighten-2'
      } else if (this.shift === undefined || this.shift === null) {
        return 'white'
      } else {
        return this.getBgColor(this.shift)
      }
    },
  },
}
</script>
