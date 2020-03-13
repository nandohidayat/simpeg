<template>
  <v-card class="mt-3" outlined>
    <v-toolbar v-if="toolbar" flat color="teal" dark>
      <v-toolbar-title
        v-text="`Data ${title}`"
        class="text-capitalize"
      ></v-toolbar-title>
      <v-spacer></v-spacer>
      <slot name="action"></slot>
    </v-toolbar>
    <v-card-title v-else>
      <slot name="title"></slot>
    </v-card-title>
    <slot v-if="full"></slot>
    <v-card-text v-else>
      <slot></slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    toolbar: {
      type: Boolean,
      default: true
    },
    full: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  methods: {}
}
</script>

<style scoped></style>
