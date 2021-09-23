<template>
  <v-card outlined class="mt-5">
    <v-card-title>
      <v-icon large left>mdi-shield-account</v-icon
      ><span class="title font-weight-light">Data Akses</span>
      <v-spacer></v-spacer>
      <v-btn v-if="editing" text icon color="teal" @click="createUser()"
        ><v-icon>mdi-content-save</v-icon></v-btn
      >
      <v-btn v-else text icon color="teal" @click="editing = true"
        ><v-icon>mdi-pencil</v-icon></v-btn
      >
    </v-card-title>
    <v-card-text>
      <v-row v-if="editing">
        <v-col cols="4">
          <v-text-field
            v-model="newUser.username"
            label="Username"
            dense
            solo
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="newUser.password"
            label="Password"
            dense
            solo
            type="password"
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="newUser.current"
            label="Your Password"
            dense
            solo
            type="password"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row v-else-if="user.karyawan !== null">
        <v-col cols="6">
          <span>Username :</span>
          <span class="subtitle-1 text--primary d-block ml-3">{{
            user.karyawan.username
          }}</span>
        </v-col>
        <v-col cols="6">
          <span>Password :</span>
          <span class="subtitle-1 text--primary d-block ml-3"> ********* </span>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col> Does not have an account. Create one if she/he need it. </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      editing: false,
      newUser: {
        username: undefined,
        password: undefined,
        current: undefined,
      },
    }
  },
  computed: {
    ...mapState(['user', 'karyawan']),
  },
  methods: {
    async createUser() {
      if (this.newUser.current === undefined) return
      try {
        await this.$store.dispatch('user/register', {
          ...this.newUser,
          nik: this.karyawan.karyawan.id,
        })
        await this.$store.dispatch('user/fetchUser', this.$route.params.id)

        this.newUser.current = undefined
        this.editing = false
      } catch (err) {
        this.$alert('error', err)
      }
    },
  },
}
</script>
