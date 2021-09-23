<template>
  <v-card>
    <v-card-text>
      <v-data-table
        :headers="header"
        :items="scheduleaccess.schedules"
        multi-sort
        :items-per-page="100"
      >
        <template #top>
          <v-toolbar flat class="my-2">
            <v-toolbar-title>Schedule Access</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-btn color="teal" dark depressed @click="openDialog()"
              ><v-icon left>mdi-plus</v-icon>Tambah Akses</v-btn
            >
          </v-toolbar>
        </template>
        <template #item.action="{ item }">
          <v-icon @click="openDialog(item)"> mdi-pencil </v-icon>
          <v-icon @click="deleteConfirm(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
      <base-confirm
        v-model="confirm"
        :text="text"
        @confirm="deleteData()"
      ></base-confirm>
      <schedule-form v-model="dialog" :edit="edit" :data="data"></schedule-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

import ScheduleForm from '@/components/schedule/schedule-access-form'
import BaseConfirm from '@/components/base/base-confirm'

export default {
  middleware({ store, redirect }) {
    if (!store.getters['user/hadAkses'](14)) {
      return redirect('/404')
    }
  },
  components: {
    ScheduleForm,
    BaseConfirm,
  },
  async fetch({ store }) {
    await Promise.all([
      store.dispatch('departemen/fetchDepartemens'),
      store.dispatch('scheduleaccess/fetchSchedules'),
    ])
  },
  data() {
    return {
      header: [
        {
          text: 'Departemen',
          value: 'nm_dept',
        },
        {
          text: 'Access',
          value: 'nm_acc',
        },
        {
          text: 'Assessor',
          value: 'assessor',
        },
        {
          text: 'Actions',
          value: 'action',
        },
      ],
      dialog: false,
      edit: false,
      data: undefined,
      confirm: false,
      text: '',
      delete: undefined,
      newSchedule: {
        dept: undefined,
        access: undefined,
        assessor: false,
      },
    }
  },
  computed: {
    ...mapState(['scheduleaccess']),
  },
  methods: {
    openDialog(item = undefined) {
      if (item) {
        this.edit = true
        this.data = item
      } else {
        this.edit = false
        this.data = this.newSchedule
      }
      this.dialog = true
    },
    deleteConfirm(del) {
      this.delete = del
      this.text = `Hapus akses?`
      this.confirm = true
    },
    async deleteData() {
      try {
        await this.$store.dispatch(
          'scheduleaccess/deleteSchedule',
          this.delete.id_schedule_access
        )

        this.confirm = false
        this.$alert('success', 'Successfully Deleted')
      } catch (e) {
        this.$alert('error', e)
      }
    },
  },
  head() {
    return {
      title: 'Akses Jadwal',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Akses Jadwal',
        },
      ],
    }
  },
}
</script>
