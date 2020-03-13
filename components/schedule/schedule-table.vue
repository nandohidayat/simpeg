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
            :items="schedule.dept"
            :item-text="(obj) => obj.nm_dept"
            :item-value="(obj) => obj.id_dept"
            @change="updateDept"
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
        <v-col
          v-if="!read"
          cols="2"
          class="d-flex justify-space-around"
          style="margin-top: 2px;"
        >
          <a
            :href="
              `http://localhost:8000/api/schedule/export/${dept}?year=${year}&month=${month}`
            "
          >
            <v-btn color="teal" icon><v-icon>mdi-download</v-icon></v-btn>
          </a>
          <v-tooltip bottom>
            <template #activator="{ on }">
              <v-btn v-on="on" @click="saveSchedules" color="teal" icon
                ><v-icon>mdi-content-save</v-icon></v-btn
              >
            </template>
            <span>Save</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template #activator="{ on }">
              <v-btn v-on="on" color="teal" icon
                ><v-icon>mdi-email-send</v-icon></v-btn
              >
            </template>
            <span>Send</span>
          </v-tooltip>
          <!-- <v-tooltip bottom>
            <template #activator="{ on }">
              <v-btn color="grey" icon>
                <v-icon v-on="on">mdi-check-bold</v-icon>
              </v-btn>
            </template>
            <span>Approved</span>
          </v-tooltip> -->
        </v-col>
      </v-row>
    </v-card>
    <v-data-table
      :headers="schedule.header"
      :items="schedule.schedules"
      class="elevation-2 mt-3"
    >
      <template
        :slot="`header.day${w}`"
        slot-scope="{ header }"
        v-for="w in schedule.weekend"
      >
        <span class="red--text font-weight-black">{{ header.text }}</span>
      </template>
      <template v-slot:item.nama="{ item }">
        <v-edit-dialog
          v-if="!read"
          @save="updateShift"
          @open="ranged.nik = item.id_pegawai"
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
              :items="filteredShift()"
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
            item[`day${l}`] !== null && item[`day${l}`] !== undefined
              ? shift.shifts.find((s) => s.id_shift == item[`day${l}`]).kode
              : undefined
          }}
          <template v-slot:input>
            <v-select
              v-model="item[`day${l}`]"
              :items="filteredShift()"
              :item-text="(obj) => obj.kode"
              :item-value="(obj) => obj.id_shift"
              label="Shift"
              style="width: 100px;"
              clearable
            ></v-select>
          </template>
        </v-edit-dialog>
        <span v-else>
          {{
            item[`day${l}`] !== null && item[`day${l}`] !== undefined
              ? shift.shifts.find((s) => s.id_shift == item[`day${l}`]).kode
              : undefined
          }}
        </span>
      </template>
      <template #item.jam="{item}"> {{ item.jam }}</template>
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
    },
    dept: {
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
    filteredShift() {
      return this.shift.shifts.filter((s) =>
        this.schedule.shift.includes(s.id_shift)
      )
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
    updateData(event) {
      this.$emit('input', event)
    },
    updateDept(event) {
      this.$emit('update-dept', event)
    },
    async changedMonth() {
      this.menu = false

      try {
        await this.$store.dispatch('schedule/fetchSchedules', {
          year: this.year,
          month: this.month,
          dept: this.dept
        })
      } catch (err) {
        this.$store.dispatch('notification/addNotif', {
          text: err,
          type: 'error'
        })
      }
    },
    async saveSchedules() {
      try {
        await this.$store.dispatch('schedule/createSchedules', {
          schedules: this.schedule.schedules,
          date: { year: this.year, month: this.month, dept: this.dept }
        })
        this.$store.dispatch('notification/addNotif', {
          text: 'Saved Successfully',
          type: 'success'
        })
      } catch (err) {
        this.$store.dispatch('notification/addNotif', {
          text: err,
          type: 'error'
        })
      }
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
