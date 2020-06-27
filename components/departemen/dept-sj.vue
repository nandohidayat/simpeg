<template>
  <base-card title="Departemen Shift / Job" toolbar>
    <v-row>
      <v-col cols="11">
        <v-autocomplete
          v-model="dept"
          :items="departemen.departemens"
          :item-value="(obj) => obj.id_dept"
          :item-text="(obj) => obj.nm_dept"
          label="Departemen"
          clearable
          @change="getSelected()"
        ></v-autocomplete>
      </v-col>
      <v-col cols="1" class="d-flex align-center">
        <v-divider vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="disabled"
          small
          color="teal"
          dark
          @click="updateSelected()"
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
    'base-card': baseCard,
  },
  data() {
    return {
      dept: undefined,
      selectedshift: [],
      selectedjob: [],
      tab: undefined,
      disabled: false,
    }
  },
  computed: {
    ...mapState(['departemen', 'shift', 'job']),
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
            this.$store.dispatch(`job/fetchDepartemen`, this.dept),
          ])
          this.selectedshift = this.shift.departemen
          this.selectedjob = this.job.departemen
        } catch (err) {
          this.$alert('error', err)
        }
      }
    },
    async updateSelected() {
      this.disabled = true
      if (this.dept === undefined) return

      const datashift = { departemen: this.dept, shift: this.selectedshift }
      const datajob = { departemen: this.dept, job: this.selectedjob }

      try {
        await Promise.all([
          this.$store.dispatch(`shift/updateDepartemen`, datashift),
          this.$store.dispatch(`job/updateDepartemen`, datajob),
        ])

        this.$alert('success', 'Successfully Saved')
      } catch (err) {
        this.$alert('error', err)
      } finally {
        this.disabled = false
      }
    },
  },
}
</script>
