<template>
  <div>
    <v-card outlined>
      <v-card-text>
        <v-row>
          <v-col cols="3">
            <v-autocomplete outlined dense hide-details></v-autocomplete>
          </v-col>
          <v-col cols="3">
            <v-text-field outlined dense hide-details></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-autocomplete outlined dense hide-details></v-autocomplete>
          </v-col>
          <v-col cols="3">
            <v-row no-gutters>
              <v-col cols="8" class="pr-2">
                <v-btn block color="teal" dark
                  ><v-icon left>mdi-email-send</v-icon> kirim email</v-btn
                >
              </v-col>
              <v-col cols="4" class="pl-2">
                <v-btn block color="teal" dark
                  ><v-icon>mdi-refresh</v-icon></v-btn
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {}
</script>
