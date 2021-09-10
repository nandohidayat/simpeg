<template>
  <v-row class="pa-3">
    <v-col cols="6">
      <table style="font-size: 10pt">
        <tr>
          <td class="px-3" colspan="2">Keterangan:</td>
        </tr>
        <tr v-for="s in fShift(true)" :key="s.id_shift">
          <td class="px-3">{{ s.kode }}</td>
          <td>({{ s.mulai | timeFormat }} - {{ s.selesai | timeFormat }})</td>
          <td class="px-3">{{ s.keterangan }}</td>
        </tr>
      </table>
    </v-col>
    <v-col cols="6">
      <v-switch
        v-model="realValue"
        :hide-details="true"
        inset
        color="teal"
        label="Order"
        style="width: 100px"
        class="ml-auto"
        dense
      ></v-switch>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  filters: {
    timeFormat(val) {
      return moment(val, 'HH:mm:ss').format('HH:mm')
    },
  },
  props: {
    order: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters('shift', ['fShift']),
    realValue: {
      get() {
        return this.order
      },
      set(val) {
        this.$emit('update:order', val)
      },
    },
  },
}
</script>
