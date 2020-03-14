<template>
  <base-card :title="title">
    <template #action>
      <base-form
        :title="title"
        :namespace="statename"
        :item="stateitem"
        #default="{newdata}"
      >
        <slot :newdata="newdata"></slot>
      </base-form>
    </template>
    <v-data-table :headers="headers" :items="items[stateitem + 's']" multi-sort>
      <template #item.action="{ item }">
        <base-form
          :title="title"
          :edit="true"
          :namespace="statename"
          :item="stateitem"
          :data="item"
          #default="{newdata}"
        >
          <slot :newdata="newdata"></slot>
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
    list: {
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
      if (this.list === undefined) return this.title.toLowerCase()
      return this.list
    },
    statename() {
      if (this.namespace === undefined) return this.title.toLowerCase()
      return this.namespace
    },
    ...mapState({
      items(state) {
        return state[this.statename]
      }
    })
  },
  methods: {
    async deleteData(item) {
      if (!confirm('Apakah anda yakin akan menghapus data tersebut?')) return
      try {
        await this.$store.dispatch(
          `${this.statename}/delete${this.stateitem.charAt(0).toUpperCase() +
            this.stateitem.slice(1)}`,
          item
        )
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
