<template>
  <v-row align="center" justify="center">
    <v-col cols="11" sm="7">
      <v-sheet elevation="20">
        <v-row no-gutters>
          <v-col
            md="6"
            class="d-none d-md-flex align-center justify-center teal lighten-5"
          >
            <v-img src="/spp/roemani.png" contain width="400"></v-img>
          </v-col>
          <v-col cols="12" md="6" class="pt-12 pb-12 pl-8 pr-8">
            <h2 class="h2 font-weight-regular">Login</h2>
            <h4 class="h4 font-weight-light mt-2">
              Welcome back, please login to your account
            </h4>
            <v-text-field
              label="Username"
              name="username"
              type="text"
              outlined
              dense
              class="mt-10"
            ></v-text-field>
            <v-text-field
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
              <v-btn color="teal" dark depressed class="mt-10">Login</v-btn>
            </div>
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
      dialog: false,
    }
  },
  layout: 'blank-center',
  head() {
    return {
      title: 'Try',
    }
  },
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
