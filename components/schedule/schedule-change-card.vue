<template>
  <base-card :toolbar="!single" :full="true" data="perubahan jadwal">
    <template #title>
      <v-icon large left>mdi-calendar</v-icon>
      <span class="title font-weight-light">Data Perubahan Jadwal</span>
      <v-spacer></v-spacer>
      <base-form data="perubahan jadwal">
        <template #form="{ newdata }">
          <schedule-change-form
            :newdata="newdata"
            :dept="dept"
          ></schedule-change-form>
        </template>
      </base-form>
    </template>
    <template #action>
      <base-form data="perubahan jadwal">
        <template #form="{ newdata }">
          <schedule-change-form
            :newdata="newdata"
            :dept="dept"
          ></schedule-change-form>
        </template>
      </base-form>
    </template>
    <div style="max-height: 600px" class="overflow-y-auto">
      <v-list>
        <template v-for="(i, index) in schedulechange.schedules">
          <v-list-item @click.stop="openDialog(i)" class="body-2">
            <v-row>
              <v-col v-if="single" cols="1"></v-col>
              <v-col cols="9">
                <div class="mb-1">
                  <span style="width: 80px" class="d-inline-block"
                    >Permintaan</span
                  >
                  : <span class="ml-1">{{ i.type | permintaan }}</span>
                </div>
                <div class="mb-1">
                  <span style="width: 80px" class="d-inline-block">Mulai</span>
                  :
                  <span class="ml-1">{{ i.mulai | date }}</span>
                </div>
                <div class="mb-1">
                  <span style="width: 80px" class="d-inline-block"
                    >Selesai</span
                  >
                  :
                  <span class="ml-1">{{ i.selesai | date }}</span>
                </div>
                <div class="mb-1">
                  <span style="width: 80px" class="d-inline-block"
                    >Pemohon</span
                  >
                  :
                  <span class="ml-1">
                    {{ nama(i.pemohon) }}
                  </span>
                </div>
                <div v-if="i.dengan !== null && i.dengan !== undefined">
                  <span style="width: 80px" class="d-inline-block">{{
                    parseInt(detail.type) === 2 ? `Pengganti` : `Dengan`
                  }}</span>
                  :
                  <span class="ml-1">
                    {{ nama(i.dengan) }}
                  </span>
                </div>
              </v-col>
              <v-col :cols="single ? 2 : 3" align-self="center">
                <v-chip v-if="i.status === 1" color="warning" x-small
                  >awaiting</v-chip
                >
                <v-chip v-else-if="i.status === 2" color="success" x-small
                  >approved</v-chip
                >
                <v-chip v-else-if="i.status === 3" color="error" x-small
                  >declined</v-chip
                >
              </v-col>
            </v-row>
          </v-list-item>
          <v-divider
            v-if="index < schedulechange.schedules.length - 1"
          ></v-divider>
        </template>
      </v-list>
      <v-dialog v-model="dialog" max-width="600">
        <v-card>
          <v-card-title>Perubahan Jadwal</v-card-title>
          <v-card-text>
            <div class="caption">Permintaan</div>
            <div class="body-1 font-weight-medium">
              {{ detail.type | permintaan }}
            </div>
            <v-row>
              <v-col cols="6">
                <div class="caption">Mulai</div>
                <div class="body-1 font-weight-medium">
                  {{ detail.mulai | date }}
                </div>
              </v-col>
              <v-col cols="6">
                <div class="caption">Selesai</div>
                <div class="body-1 font-weight-medium">
                  {{ detail.selesai | date }}
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <div class="caption">Pemohon</div>
                <div class="body-1 font-weight-medium">
                  {{ nama(detail.pemohon) }}
                </div>
              </v-col>
              <v-col
                v-if="detail.dengan !== null && detail.dengan !== undefined"
                cols="6"
              >
                <div class="caption">
                  {{ parseInt(detail.type) === 2 ? `Pengganti` : `Dengan` }}
                </div>
                <div class="body-1 font-weight-medium">
                  {{ nama(detail.dengan) }}
                </div>
              </v-col>
              <v-col
                v-else-if="
                  parseInt(detail.type) === 2 && parseInt(detail.status) === 1
                "
                cols="6"
              >
                <v-autocomplete
                  v-model="dengan"
                  :items="karyawan.karyawans"
                  :item-text="(obj) => obj.nm_pegawai"
                  :item-value="(obj) => obj.id_pegawai"
                  label="Pengganti"
                  clearable
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <div class="caption">Status</div>
                <div class="body-1 font-weight-medium">
                  <span v-if="detail.status === 1" class="warning--text"
                    >Awaiting</span
                  >
                  <span v-else-if="detail.status === 2" class="success--text"
                    >Approved</span
                  >
                  <span v-else-if="detail.status === 3" class="error--text"
                    >Declined</span
                  >
                </div>
              </v-col>
              <v-col cols="6">
                <div class="caption">Kepala</div>
                <div class="body-1 font-weight-medium">
                  {{ nama(detail.kepala) }}
                </div>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              v-if="parseInt(detail.status) === 1 && single"
              @click="deleteSchedule(detail.id_schedule_change)"
              small
              dark
              color="teal"
              >Delete</v-btn
            >
            <div v-else-if="parseInt(detail.status) === 1">
              <v-btn
                @click="
                  updateSchedule({
                    ...detail,
                    status: 2,
                    dengan
                  })
                "
                small
                dark
                color="success"
                >Approve</v-btn
              >
              <v-btn
                @click="
                  updateSchedule({
                    ...detail,
                    status: 3,
                    dengan
                  })
                "
                small
                dark
                color="error"
                >Decline</v-btn
              >
            </div>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </base-card>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import 'moment/locale/id'

import baseCard from '@/components/data/base-card'
import baseForm from '@/components/data/base-form'
import scheduleChangeForm from '@/components/schedule/schedule-change-form'

export default {
  components: {
    'base-card': baseCard,
    'base-form': baseForm,
    'schedule-change-form': scheduleChangeForm
  },
  filters: {
    date(val) {
      return moment(val)
        .locale('id')
        .format('D MMMM YYYY')
    },
    permintaan(val) {
      if (val === undefined) return

      const list = [
        {
          key: 1,
          text: 'Tukar Shift'
        },
        {
          key: 2,
          text: 'Cuti'
        }
      ]

      return list.find((p) => p.key === parseInt(val)).text
    }
  },
  props: {
    single: {
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
      dialog: false,
      detail: {},
      dengan: undefined
    }
  },
  computed: {
    ...mapState(['schedulechange', 'karyawan'])
  },
  watch: {
    month(val) {
      this.getSchedules()
    }
  },
  methods: {
    openDialog(i) {
      this.dialog = true
      this.detail = i
    },
    nama(val) {
      if (val === undefined || val === null) return '-'

      return this.karyawan.karyawans.find((k) => k.id_pegawai === val)
        .nm_pegawai
    },
    async getSchedules() {
      try {
        await this.$store.dispatch('schedulechange/fetchSchedules', {
          dept: this.dept,
          month: this.month,
          year: this.year
        })
      } catch (e) {
        this.$store.dispatch('notification/addNotif', {
          type: 'error',
          text: e
        })
      }
    },
    async deleteSchedule(i) {
      try {
        await this.$store.dispatch('schedulechange/deleteSchedule', i)
        this.dialog = false
        this.$store.dispatch('notification/addNotif', {
          type: 'success',
          text: 'Successfully Deleted'
        })
      } catch (e) {
        this.$store.dispatch('notification/addNotif', {
          type: 'error',
          text: e
        })
      }
    },
    async updateSchedule(i) {
      try {
        await this.$store.dispatch('schedulechange/updateSchedule', i)
        this.dialog = false
        this.$store.dispatch('notification/addNotif', {
          type: 'success',
          text: 'Successfully Saved'
        })
      } catch (e) {
        this.$store.dispatch('notification/addNotif', {
          type: 'error',
          text: e
        })
      }
    }
  }
}
</script>

<style scoped></style>
