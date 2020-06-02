<template>
  <div>
    <v-btn
      :id="id"
      :ripple="false"
      v-on="on"
      height="35"
      width="200"
      depressed
      small
      tile
      color="white"
    >
      <span
        class="d-inline-block text-truncate text-left"
        style="width: 180px;"
      >
        {{ value }}
      </span>
    </v-btn>

    <v-menu
      :activator="`#${id}`"
      v-model="menu"
      :transition="false"
      open-on-hover
      offset-x
      max-width="58"
    >
      <v-list dense>
        <v-list-item @click="() => {}" dense>
          <v-icon>mdi-arrow-up-circle-outline</v-icon>
        </v-list-item>
        <v-list-item @click="() => {}" dense>
          <v-icon>mdi-plus-circle-outline</v-icon>
        </v-list-item>
        <v-list-item @click="() => {}" dense>
          <v-icon>mdi-arrow-down-circle-outline</v-icon>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: undefined
    },
    value: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      menu: false
    }
  }
}
</script>

<style scoped></style>
