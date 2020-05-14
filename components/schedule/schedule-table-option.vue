<template>
  <div :class="read ? 'mt-5' : ''">
    <v-card class="px-4" outlined>
      <v-row style="height: 65px;">
        <v-col v-if="read" cols="1">
          <v-icon v-if="read" large left>mdi-calendar</v-icon>
        </v-col>
        <v-col :cols="read ? 4 : 5" class="pt-4">
          <v-select
            :value="dept"
            :items="departemen.departemens"
            :item-text="(obj) => obj.nm_dept"
            :item-value="(obj) => obj.id_dept"
            @change="$emit('update:dept', $event)"
            style="z-index:20"
            label="Departemen"
            dense
          >
          </v-select>
        </v-col>
        <v-col :cols="read ? 4 : 3"></v-col>
        <v-col :cols="read ? 3 : 2">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            z-index="20"
          >
            <template #activator="{ on }">
              <v-text-field
                :value="dateMoment"
                v-on="on"
                readonly
                outlined
                dense
              ></v-text-field>
            </template>
            <v-date-picker
              :value="date"
              @change="
                $emit('update:date', $event)
                menu = false
              "
              color="teal"
              type="month"
              no-title
              locale="id-id"
            >
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col
          v-if="!read"
          cols="2"
          class="d-flex justify-space-around"
          style="margin-top: 2px;"
        >
          <v-btn @click="openPrint()" color="teal" icon
            ><v-icon>mdi-download</v-icon></v-btn
          >

          <v-tooltip bottom z-index="20">
            <template #activator="{ on }">
              <v-btn v-on="on" @click="updateSchedule()" color="teal" icon
                ><v-icon>mdi-content-save</v-icon></v-btn
              >
            </template>
            <span>Save</span>
          </v-tooltip>
          <request-btn
            v-if="
              schedulerequest.schedule !== null &&
                schedulerequest.schedule !== undefined
            "
          ></request-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import moment from 'moment'
import 'moment/locale/id'
import { mapState } from 'vuex'

import requestButton from '@/components/schedule/schedule-request-button'

export default {
  components: {
    'request-btn': requestButton
  },
  props: {
    date: {
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
    },
    dept: {
      type: String,
      default: undefined
    },
    updater: {
      type: String,
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
    ...mapState(['schedule', 'shift', 'schedulerequest', 'departemen']),
    last() {
      return new Date(this.year, this.month, 0).getDate()
    },
    dateMoment() {
      return this.date
        ? moment(this.date)
            .locale('id')
            .format('MMMM YYYY')
        : ''
    },
    shiftDepartemen() {
      return this.shift.shifts.filter((s) =>
        this.shift.departemen.includes(s.id_shift)
      )
    },
    redDate() {
      return [
        ...new Set(this.schedule.weekend.concat(this.schedule.holiday))
      ].map((i) => {
        return new Date(this.year, this.month - 1, i + 1)
          .toISOString()
          .substr(0, 10)
      })
    }
  },
  watch: {
    updater() {
      try {
        this.$store.dispatch('schedule/fetchSchedules', {
          year: this.year,
          month: this.month,
          dept: this.dept
        })
      } catch (err) {
        this.$alert('error', err)
      }
    }
  },
  methods: {
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
        (s) => s.id_pegawai === this.ranged.nik
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
    async updateSchedule() {
      try {
        await this.$store.dispatch('schedule/updateSchedule', {
          dept: this.dept,
          year: this.year,
          month: this.month
        })
        this.$alert('success', 'Successfully Saved')
      } catch (err) {
        this.$alert('error', err)
      }
    },
    openPrint() {
      const routeData = this.$router.resolve({
        name: 'schedule-print',
        query: { dept: this.dept, date: this.date }
      })
      window.open(routeData.href, '_blank')
    },
    displayShift(val) {
      return val === null || val === undefined
        ? undefined
        : this.shift.shifts.find((s) => parseInt(s.id_shift) === parseInt(val))
            .kode
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
