<template>
  <div>
    <v-card class="px-4" outlined>
      <v-row>
        <v-col :cols="5" class="pt-4">
          <v-select
            :value="dept"
            :items="departemen.departemens"
            :item-text="(obj) => obj.nm_dept"
            :item-value="(obj) => obj.id_dept"
            @change="$emit('update:dept', $event)"
            style="z-index:20"
            label="Departemen"
            dense
            hide-details
          >
          </v-select>
        </v-col>
        <v-col :cols="1"></v-col>
        <v-col :cols="3">
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
                hide-details
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
        <v-col cols="3" class="d-flex justify-space-around">
          <v-tooltip bottom z-index="20">
            <template #activator="{ on }">
              <v-btn v-on="on" @click="exportSchedule()" color="teal" icon
                ><v-icon>mdi-download</v-icon></v-btn
              >
            </template>
            <span>Export</span>
          </v-tooltip>
          <v-tooltip bottom z-index="20">
            <template #activator="{ on }">
              <v-btn v-on="on" @click="exportSchedule()" color="teal" icon
                ><v-icon>mdi-upload</v-icon></v-btn
              >
            </template>
            <span>Import</span>
          </v-tooltip>

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
            :year="year"
            :month="month"
            :dept="dept"
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

import RequestBtn from '@/components/schedule/schedule-request-button'

export default {
  components: {
    RequestBtn
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
    order: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      menu: false
    }
  },
  computed: {
    ...mapState(['schedulerequest', 'departemen']),
    dateMoment() {
      return this.date
        ? moment(this.date)
            .locale('id')
            .format('MMMM YYYY')
        : ''
    }
  },
  methods: {
    async updateSchedule() {
      try {
        if (this.order) {
          await this.$store.dispatch('schedule/updateScheduleOrder', {
            dept: this.dept
          })
        } else {
          await this.$store.dispatch('schedule/updateSchedule', {
            dept: this.dept,
            year: this.year,
            month: this.month
          })
        }
        this.$alert('success', 'Successfully Saved')
      } catch (err) {
        this.$alert('error', err)
      }
    },
    exportSchedule() {
      const win = window.open(
        `${this.$axios.defaults.baseURL}schedule/export?dept=${this.dept}&year=${this.year}&month=${this.month}`,
        '_blank'
      )
      win.focus()
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
