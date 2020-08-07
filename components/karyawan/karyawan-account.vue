<template>
  <v-card-text class="pt-9">
    <div class="d-flex align-start">
      <v-avatar size="90" color="teal" rounded>
        <v-icon class="white--text" size="80">mdi-account-circle</v-icon>
      </v-avatar>
      <div class="ml-7 d-inline-block">
        <h3 class="font-weight-medium mb-2 mt-1">
          {{ data.nama }}
        </h3>
        <v-btn color="teal" dark depressed>Change Avatar</v-btn>
        <v-btn color="teal" outlined class="ml-3" depressed
          >Remove Avatar</v-btn
        >
      </div>
    </div>
    <v-row class="mt-5">
      <v-col cols="6">
        <v-text-field v-model="data.nik" label="NIK" outlined dense>
        </v-text-field>
        <v-text-field
          v-model="data.nama"
          class="mt-1"
          label="Nama"
          outlined
          dense
        >
        </v-text-field>
        <v-text-field
          v-model="data.username"
          class="mt-1"
          label="Username"
          outlined
          dense
        >
        </v-text-field>
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="data.status"
          label="Status"
          :items="status"
          outlined
          dense
        ></v-select>
        <v-text-field
          v-model="data.email"
          class="mt-1"
          label="Email"
          outlined
          dense
        >
        </v-text-field>
        <v-btn
          block
          color="teal"
          dark
          class="mt-1"
          depressed
          @click="dialog = true"
          >Reset Password</v-btn
        >
      </v-col>
    </v-row>
    <div class="d-flex justify-space-between mb-3">
      <span class="subtitle-1 d-inline-block">Departemen</span>
      <v-btn
        color="teal"
        depressed
        dark
        class="d-inline-block"
        @click="$emit('change-tab')"
        >Edit</v-btn
      >
    </div>
    <v-sheet outlined>
      <v-data-table
        :headers="header"
        :items="tableDept"
        hide-default-footer
        hide-default-header
      ></v-data-table>
    </v-sheet>
    <base-confirm
      v-model="dialog"
      text="Reset Password?"
      @confirm="resetPassword"
    ></base-confirm>
  </v-card-text>
</template>

<script>
import BaseConfirm from '@/components/base/base-confirm'

export default {
  components: {
    BaseConfirm,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      header: [{ text: 'Departemen', value: 'dept' }],
      status: [
        { text: 'Active', value: true },
        { text: 'Non Active', value: false },
      ],
      dialog: false,
    }
  },
  computed: {
    tableDept() {
      return this.data.dept.map((d) => ({ dept: d }))
    },
  },
  methods: {
    async resetPassword() {
      try {
        await this.$store.dispatch('user/reset', this.data.id)

        this.dialog = false
        this.$alert('success', 'Successfully Reset')
      } catch (err) {
        this.$alert('error', err)
      }
    },
  },
}
</script>
