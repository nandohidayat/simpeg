<template>
  <base-card :data="data">
    <template #action>
      <base-form :data="data">
        <template #btn="{ on }">
          <v-btn v-on="on" icon>
            <v-icon>mdi-plus-circle</v-icon>
          </v-btn>
        </template>
        <template #form="{ newdata }">
          <slot v-bind:newdata="newdata" name="baseform"></slot>
        </template>
      </base-form>
    </template>
    <v-data-table :headers="headers()" :items="items">
      <template #item.action="{ item }">
        <base-form :value="item" :data="data">
          <template #btn="{ on }">
            <v-icon v-on="on" small class="mr-2">
              mdi-pencil
            </v-icon>
          </template>
          <template #form="{ newdata }">
            <slot v-bind:newdata="newdata" name="baseform"></slot>
          </template>
        </base-form>
        <v-icon
          @click="deleteData(item[`id_${data.replace(/ /g, '_')}`])"
          small
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </base-card>
</template>

<script>
import baseCard from '@/components/data/base-card'
import baseForm from '@/components/data/base-form'

export default {
  components: {
    'base-card': baseCard,
    'base-form': baseForm
  },
  props: {
    data: {
      type: String,
      default: undefined
    },
    items: {
      type: Array,
      default: undefined
    },
    header: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    async deleteData(id) {
      if (!confirm('Apakah anda yakin akan menghapus data tersebut?')) return
      try {
        await this.$store.dispatch(
          `${this.base()}/delete${
            !this.data.includes('pendapatan') ? this.capitalize() : 'Pendapatan'
          }`,
          id
        )
      } catch (err) {
        this.$store.dispatch('notification/addError', err)
      }
    },
    headers() {
      if (this.header.length === 0)
        this.header = [{ text: this.capitalize(), value: this.data }]
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
    capitalize() {
      return this.data.charAt(0).toUpperCase() + this.data.slice(1)
    },
    base() {
      return this.data.replace(/ /g, '')
    }
  }
}
</script>

<style lang="scss" scoped></style>
