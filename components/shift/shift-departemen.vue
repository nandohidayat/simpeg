<template>
  <base-card :data="false" :title="title">
    <v-row>
      <v-col cols="10">
        <v-autocomplete
          v-model="dept"
          :items="departemen.departemens"
          :item-value="(obj) => obj.id_dept"
          :item-text="(obj) => obj.nm_dept"
          @change="getShift"
          label="Departemen"
          clearable
        ></v-autocomplete>
      </v-col>
      <v-col cols="2" class="d-flex align-center">
        <v-divider vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn @click="saveShift" small color="teal" dark
          ><v-icon>mdi-content-save</v-icon></v-btn
        >
      </v-col>
    </v-row>
    <header>Shift</header>
    <v-row>
      <v-col v-for="s in shift.shifts" :key="s.id_shift" cols="3">
        <v-checkbox
          v-model="selected"
          :label="s.kode"
          :value="s.id_shift"
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
      selected: [],
      title: 'Shift Departemen'
    }
  },
  computed: {
    ...mapState(['departemen', 'shift'])
  },
  methods: {
    async getShift() {
      if (this.dept === undefined) {
        this.selected = []
      } else {
        try {
          await this.$store.dispatch('shift/fetchDepartemen', this.dept)
          this.selected = this.shift.departemen.map((i) => parseInt(i))
        } catch (err) {
          this.$store.dispatch('notification/addNotif', {
            type: 'error',
            text: err
          })
        }
      }
    },
    async saveShift() {
      if (this.dept === undefined) return
      try {
        await this.$store.dispatch('shift/createDepartemen', {
          departemen: this.dept,
          shift: this.selected
        })

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
