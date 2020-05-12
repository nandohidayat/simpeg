<template>
  <base-card title="Departemen Shift / Job" toolbar>
    <v-row>
      <v-col cols="11">
        <v-autocomplete
          v-model="dept"
          :items="departemen.departemens"
          :item-value="(obj) => obj.id_dept"
          :item-text="(obj) => obj.nm_dept"
          @change="getSelected()"
          label="Departemen"
          clearable
        ></v-autocomplete>
      </v-col>
      <v-col cols="1" class="d-flex align-center">
        <v-divider vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn @click="updateSelected()" small color="teal" dark
          ><v-icon>mdi-content-save</v-icon></v-btn
        >
      </v-col>
    </v-row>
    <header>Shift</header>
    <v-row>
      <v-col v-for="s in shift.shifts" :key="s.id_shift" cols="2">
        <v-checkbox
          v-model="selectedshift"
          :label="s.kode"
          :value="s.id_shift"
          color="teal"
        ></v-checkbox>
      </v-col>
    </v-row>
    <header>Job</header>
    <v-row>
      <v-col v-for="j in job.jobs" :key="j.id_jobt" cols="2">
        <v-checkbox
          v-model="selectedjob"
          :label="j.keterangan"
          :value="j.id_job"
          color="teal"
        ></v-checkbox>
      </v-col>
    </v-row>
  </base-card>
</template>

<script>
import { mapState } from 'vuex'

import baseCard from '@/components/base/base-card'

export default {
  components: {
    'base-card': baseCard
  },
  data() {
    return {
      dept: undefined,
      selectedshift: [],
      selectedjob: [],
      tab: undefined
    }
  },
  computed: {
    ...mapState(['departemen', 'shift', 'job'])
  },
  methods: {
    async getSelected() {
      if (this.dept === undefined) {
        this.selectedshift = []
        this.selectedjob = []
      } else {
        try {
          await Promise.all([
            this.$store.dispatch(`shift/fetchDepartemen`, this.dept),
            this.$store.dispatch(`job/fetchDepartemen`, this.dept)
          ])
          this.selectedshift = this.shift.departemen
          this.selectedjob = this.job.departemen
        } catch (err) {
          this.$store.dispatch('notification/addNotif', {
            type: 'error',
            text: err
          })
        }
      }
    },
    async updateSelected() {
      if (this.dept === undefined) return

      const datashift = { departemen: this.dept, shift: this.selectedshift }
      const datajob = { departemen: this.dept, job: this.selectedjob }

      try {
        await Promise.all([
          this.$store.dispatch(`shift/updateDepartemen`, datashift),
          this.$store.dispatch(`job/updateDepartemen`, datajob)
        ])

        this.$store.dispatch('notification/addNotif', {
          type: 'success',
          text: 'Successfully Saved'
        })
      } catch (err) {
        this.$store.dispatch('notification/addNotif', {
          type: 'error',
          text: err
        })
      }
    }
  }
}
</script>

<style scoped></style>
