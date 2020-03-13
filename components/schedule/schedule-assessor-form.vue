<template>
  <div>
    <v-row>
      <v-col cols="6">
        <v-autocomplete
          v-model="newdata.dept"
          :items="departemen.departemens"
          :item-value="(obj) => obj.id_dept"
          :item-text="(obj) => obj.nm_dept"
          label="Department"
        ></v-autocomplete>
      </v-col>
      <v-col cols="6">
        <v-autocomplete
          :items="departemen.departemens"
          :item-value="(obj) => obj.id_dept"
          :item-text="(obj) => obj.nm_dept"
          v-model="newdata.assessor"
          label="Assessor"
        >
        </v-autocomplete>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    newdata: {
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
