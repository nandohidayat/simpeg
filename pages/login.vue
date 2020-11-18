<template>
  <v-row align="center" justify="center">
    <v-col cols="11" sm="7">
      <v-sheet elevation="20">
        <v-row no-gutters>
          <v-col
            md="6"
            class="d-none d-md-flex align-center justify-center teal lighten-5"
          >
            <v-img src="/simpeg/roemani.png" contain width="400"></v-img>
          </v-col>
          <v-col cols="12" md="6" class="pt-12 pb-12 pl-8 pr-8">
            <h2 class="h2 font-weight-regular">Login</h2>
            <h4 class="h4 font-weight-light mt-2">
              Welcome back, please login to your account
            </h4>
            <form @submit.prevent="login()">
              <v-text-field
                v-model="newUser.username"
                :error="error"
                label="Username"
                name="username"
                type="text"
                outlined
                dense
                class="mt-10"
              ></v-text-field>
              <v-text-field
                v-model="newUser.password"
                :error="error"
                label="Password"
                type="password"
                name="password"
                outlined
                dense
              ></v-text-field>
              <div class="text-right">
                <a class="teal--text d-block" @click="dialog = true">
                  Forgot Password?
                </a>
                <v-btn color="teal" dark depressed class="mt-10" type="submit"
                  >Login</v-btn
                >
              </div>
            </form>
          </v-col>
        </v-row>
      </v-sheet>
    </v-col>
    <v-dialog v-model="dialog" max-width="250">
      <v-card>
        <v-card-title>Terjadi kendala?</v-card-title>
        <v-card-text>
          Silahkan hubungi SIM di <span class="font-weight-bold">2051</span>
        </v-card-text>
      </v-card>
    </v-dialog>
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
      dialog: false,
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
