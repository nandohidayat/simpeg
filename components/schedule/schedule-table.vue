<template>
  <div :class="read ? 'mt-5' : ''">
    <v-card class="px-4" outlined>
      <v-row style="height: 65px;">
        <v-col :cols="read ? 8 : 9" class="pt-4">
          <span v-if="read">
            <v-icon large left>mdi-calendar</v-icon
            ><span class="title font-weight-light">Data Jadwal</span>
          </span>
          <span
            v-else
            v-text="`Jadwal ${schedule.ruang || ''}`"
            class="headline text--primary"
          ></span>
        </v-col>
        <v-col :cols="read ? 3 : 2">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                :value="dateMoment"
                v-on="on"
                readonly
                outlined
                dense
              ></v-text-field>
            </template>
            <v-date-picker
              :value="value"
              @change="updateData"
              color="teal"
              type="month"
              no-title
              locale="id-id"
            >
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="1" style="margin-top: 2px;">
          <v-btn v-if="!read" @click="saveSchedules" color="teal" dark
            ><v-icon>mdi-content-save</v-icon></v-btn
          >
        </v-col>
      </v-row>
    </v-card>
    <v-data-table
      :headers="schedule.header"
      :items="schedule.schedules"
      class="elevation-2 mt-3"
    >
      <template v-slot:item.nama="{ item }">
        <v-edit-dialog
          v-if="!read"
          @save="updateShift"
          @open="ranged.nik = item.nik"
          @close="resetRanged"
          large
          persistent
          offset-y
        >
          {{ item.nama }}
          <template v-slot:input>
            <v-date-picker
              v-model="ranged.dates"
              no-title
              range
              locale="id-id"
              color="teal"
              class="mt-3"
            >
            </v-date-picker>
            <v-select
              v-model="ranged.shift"
              :items="filteredShift(item.shift)"
              :item-text="(obj) => obj.kode"
              :item-value="(obj) => obj.id_shift"
              label="Shift"
              dense
              clearable
              solo
              class="mt-3"
            ></v-select>
          </template>
        </v-edit-dialog>
        <span v-else>{{ item.nama }}</span>
      </template>
      <template :slot="`item.day${l}`" slot-scope="{ item }" v-for="l in last">
        <v-edit-dialog v-if="!read">
          {{
            shift.shifts.find((s) => s.id_shift == item[`day${l}`])
              ? shift.shifts.find((s) => s.id_shift == item[`day${l}`]).kode
              : undefined
          }}
          <template v-slot:input>
            <v-select
              v-model="item[`day${l}`]"
              :items="filteredShift(item.shift)"
              :item-text="(obj) => obj.kode"
              :item-value="(obj) => obj.id_shift"
              label="Shift"
              clearable
            ></v-select>
          </template>
        </v-edit-dialog>
        <span v-else>
          {{
            shift.shifts.find((s) => s.id_shift == item[`day${l}`])
              ? shift.shifts.find((s) => s.id_shift == item[`day${l}`]).kode
              : undefined
          }}
        </span>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import moment from 'moment'
import 'moment/locale/id'

import { mapState } from 'vuex'

export default {
  props: {
    value: {
      type: String,
      default: undefined
    },
    read: {
      type: Boolean,
      default: false
    },
    year: {
      type: Number,
      default: undefined
    },
    month: {
      type: Number,
      default: undefined
    }
  },
  data() {
    return {
      menu: false,
      ranged: {
        dates: [],
        shift: undefined,
        nik: undefined
      }
    }
  },
  computed: {
    ...mapState(['schedule', 'shift']),
    last() {
      return new Date(this.year, this.month, 0).getDate()
    },
    dateMoment() {
      return this.value
        ? moment(this.value)
            .locale('id')
            .format('MMMM YYYY')
        : ''
    }
  },
  watch: {
    value(val) {
      this.changedMonth()
    }
  },
  methods: {
    filteredShift(arr) {
      return this.shift.shifts.filter((s) => arr.includes(s.id_shift))
    },
    updateVerify() {
      if (this.ranged.dates.length === 0) return true

      if (parseInt(this.ranged.dates[0].substring(5, 7)) !== this.month)
        return true
      if (
        parseInt(this.ranged.dates[1]) &&
        parseInt(this.ranged.dates[1].substring(5, 7)) !== this.month
      )
        return true
      return false
    },
    updateShift() {
      if (this.updateVerify()) return

      let first = this.ranged.dates[0]
      let last = this.ranged.dates[1] || this.ranged.dates[0]
      first = parseInt(first.slice(-2))
      last = parseInt(last.slice(-2))

      if (first > last) {
        ;[first, last] = [last, first]
      }

      const idx = this.schedule.schedules.findIndex(
        (s) => s.nik === this.ranged.nik
      )

      for (let i = first; i <= last; i++) {
        this.schedule.schedules[idx][`day${i}`] = this.ranged.shift
      }
    },
    resetRanged() {
      this.ranged.dates = []
      this.ranged.shift = undefined
      this.ranged.nik = undefined
    },
    updateData(event) {
      this.$emit('input', event)
    },
    async changedMonth() {
      this.menu = false

      const query = {
        year: this.year,
        month: this.month
      }

      if (this.read) query.nik = this.$route.params.id

      try {
        await this.$store.dispatch('schedule/fetchSchedules', query)
      } catch (err) {
        this.$store.dispatch('notification/addError', err)
      }
    },
    async saveSchedules() {
      try {
        await this.$store.dispatch('schedule/createSchedules', {
          schedules: this.schedule.schedules,
          year: this.year,
          month: this.month
        })
      } catch (err) {
        this.$store.dispatch('notification/addError', err)
      }
    }
  }
}
</script>

<style scoped></style>
