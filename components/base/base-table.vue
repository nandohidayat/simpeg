<template>
  <v-data-table :headers="headers" :items="items[state]" multi-sort>
    <template #top>
      <v-toolbar flat color="white">
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <base-form
          :title="title"
          :data="data"
          :store="store"
          :action="action"
          @reset="$emit('reset')"
        >
          <slot></slot>
        </base-form>
      </v-toolbar>
    </template>
    <template #item.action="{ item }">
      <base-form
        :title="title"
        :store="store"
        :action="action"
        :data="data"
        :edit="item"
        @reset="$emit('reset')"
        @edit="edit"
      >
        <slot></slot>
      </base-form>
      <v-icon small @click="deleteData(item)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { mapState } from 'vuex'
import baseForm from '@/components/base/base-form'

export default {
  components: {
    'base-form': baseForm,
  },
  props: {
    header: {
      type: Array,
      default: undefined,
    },
    title: {
      type: String,
      default: '',
    },
    store: {
      type: String,
      default: undefined,
    },
    state: {
      type: String,
      default: undefined,
    },
    action: {
      type: String,
      default: undefined,
    },
    data: {
      type: Object,
      default: undefined,
    },
  },
  computed: {
    headers() {
      return [
        ...this.header,
        {
          text: 'Action',
          value: 'action',
          sortable: false,
          width: '100px',
        },
      ]
    },
    ...mapState({
      items(state) {
        return state[this.store]
      },
    }),
  },
  methods: {
    edit(value) {
      this.$emit('update:data', value)
    },
    async deleteData(item) {
      if (!confirm('Apakah anda yakin akan menghapus data tersebut?')) return
      try {
        await this.$store.dispatch(`${this.store}/delete${this.action}`, item)
        this.$alert('success', 'Successfully Deleted')
      } catch (err) {
        this.$alert('error', err)
      }
    },
  },
}
</script>
