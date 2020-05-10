<template>
  <base-card :title="`Data ${title}`" toolbar>
    <template #action>
      <base-form
        :title="title"
        :data="data"
        :store="store"
        :action="action"
        @reset="$emit('reset')"
      >
        <slot></slot>
      </base-form>
    </template>
    <v-data-table :headers="headers" :items="items[state]" multi-sort>
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
        <v-icon @click="deleteData(item)" small>
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </base-card>
</template>

<script>
import { mapState } from 'vuex'
import baseCard from '@/components/base/base-card'
import baseForm from '@/components/base/base-form'

export default {
  components: {
    'base-card': baseCard,
    'base-form': baseForm
  },
  props: {
    header: {
      type: Array,
      default: undefined
    },
    title: {
      type: String,
      default: ''
    },
    store: {
      type: String,
      default: undefined
    },
    state: {
      type: String,
      default: undefined
    },
    action: {
      type: String,
      default: undefined
    },
    data: {
      type: Object,
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
    ...mapState({
      items(state) {
        return state[this.store]
      }
    })
  },
  methods: {
    edit(value) {
      this.$emit('edit', value)
    },
    async deleteData(item) {
      if (!confirm('Apakah anda yakin akan menghapus data tersebut?')) return
      try {
        await this.$store.dispatch(`${this.store}/delete${this.action}`, item)
        this.$store.dispatch('notification/addNotif', {
          type: 'success',
          text: 'Successfully Deleted'
        })
      } catch (err) {
        this.$store.dispatch('notification/addNotif', {
          type: 'error',
          text: err
        })
      }
    }
  }
}
</script>

<style scoped></style>
