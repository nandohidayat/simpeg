<template>
  <div
    :style="{
      zIndex: 10,
      position: 'sticky',
      backgroundColor: 'white',
      left: 0,
    }"
    class="elevation-4 d-inline-block"
  >
    <div
      :style="{ position: 'sticky', top: 0, zIndex: 11 }"
      class="elevation-4"
    >
      <v-btn height="35" width="200" depressed small tile color="white">
        Nama
      </v-btn>
      <v-divider></v-divider>
    </div>
    <draggable
      id="drag"
      v-model="schedule.order"
      group="nama"
      :disabled="!order"
    >
      <div v-for="(o, i) in schedule.order" :key="i">
        <view-button v-if="isNaN(o)" :id="i" :order="order"></view-button>
        <view-button
          v-else
          :id="i"
          :value="schedule.nama[o]"
          :order="order"
          :hover="schedule.hover === o"
          @click.native="(e) => nameClick(e, o)"
        ></view-button>
        <v-divider></v-divider>
      </div>
    </draggable>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import draggable from 'vuedraggable'

import ViewButton from '@/components/schedule/schedule-view-button'

export default {
  components: {
    ViewButton,
    draggable,
  },
  props: {
    staff: {
      type: String,
      default: undefined,
    },
    day: {
      type: Array,
      default: undefined,
    },
    order: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      hover: undefined,
    }
  },
  computed: {
    ...mapState(['schedule']),
    ...mapGetters('user', ['hadOption']),
  },
  methods: {
    nameClick(event, staff) {
      if (!this.hadOption(5)) return
      if (this.staff === staff) {
        this.$emit('update:day', [])
        this.$emit('update:staff', undefined)
      } else {
        this.$emit('update:day', [0, this.schedule.day - 1])
        this.$emit('update:staff', staff)
      }
      this.$emit('menu', event)
    },
  },
}
</script>
