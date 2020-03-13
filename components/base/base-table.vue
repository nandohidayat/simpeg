<template>
  <base-card :title="title">
    <v-data-table
      :headers="headers"
      :items="statename[stateitem]"
    ></v-data-table>
  </base-card>
</template>

<script>
import { mapState } from 'vuex'
import baseCard from '@/components/base/base-card'

export default {
  components: {
    'base-card': baseCard
  },
  props: {
    header: {
      type: Array,
      default() {
        return []
      }
    },
    title: {
      type: String,
      default: ''
    },
    namespace: {
      type: String,
      default: undefined
    },
    items: {
      type: String,
      default: undefined
    }
  },
  computed: {
    headers() {
      return [
        ...this.header,
        {
          text: 'Action',
          value: 'action',
          sortable: false,
          width: '100px'
        }
      ]
    },
    stateitem() {
      if (this.items === undefined) return this.title.toLowerCase()
      return this.items
    },
    ...mapState({
      statename(state) {
        if (this.namespace === undefined) return state[this.title.toLowerCase()]
        return state[this.namespace]
      }
    })
  },
  methods: {}
}
</script>

<style scoped></style>
