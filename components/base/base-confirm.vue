<template>
  <v-dialog
    :value="value"
    max-width="300"
    @click:outside="$emit('input', false)"
  >
    <v-card>
      <v-card-title class="grey lighten-5">Confirm</v-card-title>
      <v-card-text class="subtitle-1 pt-4">
        {{ text }}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="teal" dark depressed @click="$emit('confirm')"
          >Confirm</v-btn
        >
        <v-btn depressed @click="$emit('input', false)">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'Are you sure?',
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
