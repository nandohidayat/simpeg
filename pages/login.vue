<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-12">
        <v-form @submit.prevent="login">
          <v-toolbar color="teal" dark flat dense>
            <v-toolbar-title class="mx-auto">Schedule Manager</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-text-field
              v-model="newUser.username"
              label="Username"
              type="text"
            ></v-text-field>

            <v-text-field
              v-model="newUser.password"
              label="Password"
              type="password"
            ></v-text-field>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="login" color="teal" dark small type="submit"
              >Login</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      newUser: {
        username: undefined,
        password: undefined
      }
    }
  },
  methods: {
    login() {}
  },
  layout: 'blank'
}
</script>
