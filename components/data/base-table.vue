<template>
  <v-card class="mt-5">
    <v-toolbar flat color="teal" dark>
      <v-toolbar-title v-text="`Data ${capitalize()}`"></v-toolbar-title>
      <v-spacer></v-spacer>
      <base-form :data="data">
        <template v-slot:btn="{ on }">
          <v-btn v-on="on" icon>
            <v-icon>mdi-plus-circle</v-icon>
          </v-btn>
        </template>
        <template v-slot:form="{ newdata }">
          <slot v-bind:newdata="newdata" name="baseform"></slot>
        </template>
      </base-form>
    </v-toolbar>
    <v-card-text>
      <v-data-table :headers="headers()" :items="items">
        <template v-slot:item.action="{ item }">
          <base-form :value="item" :data="data">
            <template v-slot:btn="{ on }">
              <v-icon v-on="on" small class="mr-2">
                mdi-pencil
              </v-icon>
            </template>
            <template v-slot:form="{ newdata }">
              <slot v-bind:newdata="newdata" name="baseform"></slot>
            </template>
          </base-form>
          <v-icon @click="deleteData(item[`id_${data}`])" small>
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import baseForm from '@/components/data/base-form'

export default {
  components: {
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
      default: undefined
    }
  },
  methods: {
    async deleteData(id) {
      if (!confirm('Apakah anda yakin akan menghapus data tersebut?')) return
      try {
        await this.$store.dispatch(
          `${this.data}/delete${this.capitalize()}`,
          id
        )
      } catch (err) {
        this.$store.dispatch('notification/addError', err)
      }
    },
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
    capitalize() {
      return this.data.charAt(0).toUpperCase() + this.data.slice(1)
    }
  }
}
</script>

<style lang="scss" scoped></style>
