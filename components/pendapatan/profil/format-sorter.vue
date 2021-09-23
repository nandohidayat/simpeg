<template>
  <draggable
    :value="value"
    :list="list"
    tag="div"
    group="personalia"
    @input="emitter"
  >
    <div v-for="el in realValue" :key="el.id">
      <v-sheet outlined height="40" class="d-flex align-center pl-6">
        <span style="width: 250px">[{{ el.type.toString() }}] {{ el.key }}</span
        >: {{ el.value ? el.value : '' }}
        <v-spacer></v-spacer>
        <v-btn icon color="teal" @click="editEmit(el)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon color="teal" @click="delEmit(el)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-sheet>
      <format-sorter
        class="ml-10"
        :list="el.elements"
        @del="delEmit"
        @edit="editEmit"
      />
    </div>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'FormatSorter',
  components: {
    draggable,
  },
  filters: {
    print(value) {
      return `[${value.type.toString()}] ${value.key} : ${
        value.value ? value.value : ''
      }`
    },
  },
  props: {
    value: {
      required: false,
      type: Array,
      default: undefined,
    },
    list: {
      required: false,
      type: Array,
      default: undefined,
    },
  },
  computed: {
    realValue() {
      return this.value ? this.value : this.list
    },
  },
  methods: {
    emitter(value) {
      this.$emit('input', value)
    },
    delEmit(value) {
      this.$emit('del', value)
    },
    editEmit(value) {
      this.$emit('edit', value)
    },
  },
}
</script>
