<template>
  <div>
    <v-row>
      <v-col cols="6">
        <v-autocomplete
          v-model="data.dept"
          :items="departemen.departemens"
          :item-value="(obj) => obj.id_dept"
          :item-text="(obj) => obj.nm_dept"
          label="Department"
        ></v-autocomplete>
      </v-col>
      <v-col cols="6">
        <v-autocomplete
          v-model="data.access"
          :items="departemen.departemens"
          :item-value="(obj) => obj.id_dept"
          :item-text="(obj) => obj.nm_dept"
          label="Assessor"
        >
        </v-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-checkbox
          v-model="data.assessor"
          label="Assessor"
          color="teal"
        ></v-checkbox>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    data: {
      type: Object,
      default: undefined
    }
  },
  computed: {
    ...mapState(['departemen'])
  }
}
</script>

<style scoped></style>
