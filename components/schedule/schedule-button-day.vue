<template>
  <v-btn
    :class="{ active: active }"
    :color="bgColor"
    :ripple="false"
    height="35px"
    width="35px"
    depressed
    small
    tile
    ><span>{{ kode }}</span></v-btn
  >
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  props: {
    id: {
      type: String,
      default: undefined,
    },
    shift: {
      type: [Number, String],
      default: undefined,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters('shift', ['getKode', 'getBgColor']),
    ...mapState(['schedule']),
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
