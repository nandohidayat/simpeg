<template>
  <v-row>
    <v-col>
      <v-text-field
        v-model="newdata['departemen']"
        label="Departemen"
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    newdata: {
      type: Object,
      default: undefined,
    },
  },
}
</script>
