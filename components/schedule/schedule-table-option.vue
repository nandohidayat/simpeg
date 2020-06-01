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
          <v-tooltip bottom z-index="20">
            <template #activator="{ on }">
              <v-btn v-on="on" @click="openPrint()" color="teal" icon
                ><v-icon>mdi-download</v-icon></v-btn
              >
            </template>
            <span>Print</span>
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
        query: { dept: this.dept, year: this.year, month: this.month }
      })
      window.open(routeData.href, '_blank')
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
