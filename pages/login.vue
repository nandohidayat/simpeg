<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-12" tile>
        <v-form @submit.prevent="login()">
          <v-toolbar color="teal" dark flat dense>
            <v-toolbar-title class="mx-auto">SIMPEG</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-text-field
              v-model="newUser.username"
              :error="error"
              label="Username"
              type="text"
              name="username"
            ></v-text-field>

            <v-text-field
              v-model="newUser.password"
              :error="error"
              label="Password"
              type="password"
              name="password"
            ></v-text-field>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="teal" dark small type="submit">Login</v-btn>
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
        password: undefined,
      },
      error: false,
    }
  },
  methods: {
    async login() {
      this.$nuxt.$loading.start()
      try {
        await this.$store.dispatch('user/login', this.newUser)
      } catch (e) {
        this.error = true
      }
    },
  },
  head() {
    return {
      title: 'Login',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Login',
        },
      ],
    }
  },
  layout: 'blank-center',
}
</script>
