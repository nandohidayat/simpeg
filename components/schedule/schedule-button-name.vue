<template>
  <div>
    <div :id="`schedule${idxOrder}`">
      <v-btn
        :ripple="false"
        height="35"
        width="200"
        depressed
        small
        tile
        color="white"
      >
        <span
          class="d-inline-block text-truncate text-left"
          style="width: 180px"
        >
          {{ value }}
        </span>
      </v-btn>
      <v-overlay absolute opacity="0" :value="order"></v-overlay>
    </div>
    <v-menu
      v-if="order"
      v-model="menu"
      :activator="`#schedule${idxOrder}`"
      :transition="false"
      open-on-hover
      offset-x
      max-width="58"
    >
      <v-list dense>
        <v-list-item v-if="value === undefined" dense @click="reorder('del')">
          <v-icon>mdi-minus-circle-outline</v-icon>
        </v-list-item>
        <v-list-item
          v-else-if="!lastData(idxOrder)"
          dense
          @click="reorder('add')"
        >
          <v-icon>mdi-plus-circle-outline</v-icon>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    idxOrder: {
      type: Number,
      default: undefined,
    },
    value: {
      type: String,
      default: undefined,
    },
    order: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      menu: false,
    }
  },
  computed: {
    ...mapGetters('schedule', ['lastData']),
  },
  methods: {
    reorder(type) {
      this.$store.commit('schedule/REORDER', { idx: this.idxOrder, type })
    },
  },
}
</script>
