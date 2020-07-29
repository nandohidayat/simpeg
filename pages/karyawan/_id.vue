<template>
  <div>
    <v-card class="px-3">
      <v-card-title>
        Account
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="2">
            <v-avatar tile size="150" color="teal">
              <v-icon class="white--text" size="80">mdi-account-circle</v-icon>
            </v-avatar>
          </v-col>
          <v-col cols="5">
            <v-row no-gutters>
              <v-col cols="4" class="body-1 font-weight-medium">
                <p>
                  Username
                </p>
                <p>Name</p>
                <p>Email</p>
              </v-col>
              <v-col cols="8" class="body-1 font-weight-regular">
                <p>
                  nando
                </p>
                <p>Muhammad Nando Hidayat</p>
                <p>mnandohidayat@gmail.com</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="5">
            <v-row no-gutters>
              <v-col cols="4" class="body-1 font-weight-medium">
                <p>
                  Departemen
                </p>
              </v-col>
              <v-col cols="8" class="body-1 font-weight-regular">
                <p>
                  Instalasi Sistem Informasi Manajemen (SIM)
                </p>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="4" class="body-1 font-weight-medium">
                <p>
                  Sub Departemen
                </p>
              </v-col>
              <v-col cols="8" class="body-1 font-weight-regular">
                <p>
                  Instalasi Sistem Informasi Manajemen (SIM)
                </p>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="4" class="body-1 font-weight-medium">
                <p>
                  Status
                </p>
              </v-col>
              <v-col cols="8" class="body-1 font-weight-regular">
                <p>
                  Active
                </p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-btn color="teal" dark depressed
          ><v-icon left>mdi-pencil</v-icon> Edit</v-btn
        >
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Detail Karyawan',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Detail Karyawan',
        },
      ],
    }
  },
}
</script>
