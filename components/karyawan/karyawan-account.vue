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
          hide-details
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
          hide-details
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-if="data.username" cols="6">
        <v-text-field
          v-if="edit"
          v-model="data.username"
          class="mt-1"
          label="Username"
          outlined
          dense
        >
        </v-text-field>
      </v-col>
      <v-col v-if="data.username" cols="6">
        <v-row v-if="edit" no-gutters class="mt-1">
          <v-col cols="6" class="pr-2">
            <v-btn
              block
              color="teal"
              dark
              depressed
              @click="openDialog('Reset Password?')"
              >Reset Password</v-btn
            >
          </v-col>
          <v-col cols="6" class="pl-2">
            <v-btn
              block
              color="teal"
              dark
              depressed
              @click="openDialog('Delete Account?')"
              >Delete Account</v-btn
            >
          </v-col>
        </v-row>
      </v-col>
      <v-col v-else>
        <v-btn block color="teal" dark depressed></v-btn>
      </v-col>
    </v-row>
    <div v-if="edit" class="d-flex justify-space-between mb-3">
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
    <v-sheet v-if="edit" outlined>
      <v-data-table
        :headers="header"
        :items="tableDept"
        hide-default-footer
        hide-default-header
      ></v-data-table>
    </v-sheet>
    <base-confirm
      v-model="dialog.status"
      :text="dialog.text"
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
    edit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      header: [{ text: 'Departemen', value: 'dept' }],
      status: [
        { text: 'Active', value: true },
        { text: 'Non Active', value: false },
      ],
      dialog: {
        status: false,
        text: '',
      },
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
    async delete() {
      try {
        await this.$store.dispatch('user/delete', this.data.id)

        this.dialog = false
        this.$emit('delete-account')
        this.$alert('success', 'Successfully Deleted')
      } catch (err) {
        this.$alert('error', err)
      }
    },
    openDialog(text) {
      this.dialog.status = true
      this.dialog.text = text
    },
  },
}
</script>
