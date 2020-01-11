<template>
  <v-card class="mt-5" outlined>
    <v-toolbar v-if="toolbar" flat color="teal" dark>
      <v-toolbar-title
        v-text="`${odd ? '' : 'Data '}${data}`"
        class="text-capitalize"
      ></v-toolbar-title>
      <v-spacer></v-spacer>
      <slot name="action"></slot>
    </v-toolbar>
    <v-card-title v-else>
      <slot name="title"></slot>
      <v-spacer></v-spacer>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <slot></slot>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    data: {
      type: String,
      default: undefined
    },
    odd: {
      type: Boolean,
      default: false
    },
    toolbar: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    capitalize() {
      return this.data.charAt(0).toUpperCase() + this.data.slice(1)
    }
  }
}
</script>

<style scoped></style>
