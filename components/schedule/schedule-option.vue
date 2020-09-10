<template>
  <div>
    <v-toolbar flat>
      <span style="width: 350px;">
        <v-autocomplete
          outlined
          :value="dept"
          :items="departemen.departemens"
          :item-text="(obj) => obj.nm_dept"
          :item-value="(obj) => obj.id_dept"
          style="z-index: 20;"
          label="Departemen"
          dense
          hide-details
          @change="$emit('update:dept', $event)"
        >
        </v-autocomplete>
      </span>
      <v-spacer></v-spacer>
      <v-sheet max-width="300" class="d-inline-block mx-1">
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
              readonly
              outlined
              dense
              label="Bulan"
              hide-details
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            :value="date"
            color="teal"
            type="month"
            no-title
            locale="id-id"
            @change="
              $emit('update:date', $event)
              menu = false
            "
          >
          </v-date-picker>
        </v-menu>
      </v-sheet>
      <v-tooltip bottom z-index="20">
        <template #activator="{ on }">
          <v-btn
            color="teal"
            dark
            class="mx-1"
            v-on="on"
            @click="exportSchedule()"
            ><v-icon left>mdi-download</v-icon> DOWNLOAD</v-btn
          >
        </template>
        <span>Export</span>
      </v-tooltip>
      <v-menu
        v-if="hadOption(5)"
        v-model="menu1"
        :close-on-content-click="false"
        z-index="20"
        min-width="300"
      >
        <template #activator="{ on: menu2 }">
          <v-tooltip bottom z-index="20">
            <template #activator="{ on: tooltip }">
              <v-btn
                color="teal"
                dark
                class="mx-1"
                v-on="{ ...tooltip, ...menu2 }"
                ><v-icon left>mdi-upload</v-icon> Upload</v-btn
              >
            </template>
            <span>Import</span>
          </v-tooltip>
        </template>
        <v-list dense>
          <v-list-item dense>
            <v-file-input
              v-model="jadwal"
              label="Jadwal"
              dense
              color="teal"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            ></v-file-input>
          </v-list-item>
          <v-list-item dense>
            <v-spacer></v-spacer>
            <v-btn dark color="teal" small @click="importSchedule()"
              >Upload</v-btn
            >
          </v-list-item>
        </v-list>
      </v-menu>

      <v-tooltip v-if="hadOption(5)" bottom z-index="20">
        <template #activator="{ on }">
          <v-btn
            color="teal"
            dark
            class="mx-1"
            v-on="on"
            @click="updateSchedule()"
            ><v-icon left>mdi-content-save</v-icon> SIMPAN</v-btn
          >
        </template>
        <span>Save</span>
      </v-tooltip>
      <request-btn
        v-if="
          hadOption(5) &&
          schedulerequest.schedule !== null &&
          schedulerequest.schedule !== undefined
        "
        :year="year"
        :month="month"
        :dept="dept"
      ></request-btn>
    </v-toolbar>
  </div>
</template>

<script>
import moment from 'moment'
import 'moment/locale/id'
import { mapState, mapGetters } from 'vuex'

import RequestBtn from '@/components/schedule/schedule-request-button'

export default {
  components: {
    RequestBtn,
  },
  props: {
    date: {
      type: String,
      default: undefined,
    },
    read: {
      type: Boolean,
      default: false,
    },
    year: {
      type: Number,
      default: undefined,
    },
    month: {
      type: Number,
      default: undefined,
    },
    dept: {
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
      menu1: false,
      jadwal: undefined,
    }
  },
  computed: {
    ...mapState(['schedulerequest', 'departemen']),
    ...mapGetters('user', ['hadOption']),
    dateMoment() {
      return this.date ? moment(this.date).locale('id').format('MMMM YYYY') : ''
    },
  },
  methods: {
    async updateSchedule() {
      try {
        if (this.order) {
          await this.$store.dispatch('schedule/updateScheduleOrder', {
            dept: this.dept,
          })
        } else {
          await this.$store.dispatch('schedule/updateSchedule', {
            dept: this.dept,
            year: this.year,
            month: this.month,
          })
        }
        this.$alert('success', 'Successfully Saved')
      } catch (err) {
        this.$alert('error', err)
      }
    },
    exportSchedule() {
      const win = window.open(
        `${this.$axios.defaults.baseURL}schedule/excel?dept=${this.dept}&year=${this.year}&month=${this.month}`,
        '_blank'
      )
      win.focus()
    },
    async importSchedule() {
      const formData = new FormData()
      formData.append('schedules', this.jadwal)
      formData.append('year', this.year)
      formData.append('month', this.month)
      try {
        await this.$axios.$post(
          `${this.$axios.defaults.baseURL}schedule/excel`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )

        this.menu1 = false
        this.jadwal = undefined

        this.$alert('success', 'Successfully Uploaded')

        await this.$store.dispatch('schedule/fetchSchedules', {
          year: this.year,
          month: this.month,
          dept: this.dept,
        })
      } catch (err) {
        this.$alert('error', err)
      }
    },
  },
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
