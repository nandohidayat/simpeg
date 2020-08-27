<template>
  <base-form
    v-model="dialog"
    title="Schedule Access"
    store="scheduleaccess"
    action="Schedule"
    :data="newData"
    :edit="edit"
  >
    <v-row>
      <v-col cols="6">
        <v-autocomplete
          v-model="newData.dept"
          :items="departemen.departemens"
          :item-value="(obj) => obj.id_dept"
          :item-text="(obj) => obj.nm_dept"
          label="Department"
        ></v-autocomplete>
      </v-col>
      <v-col cols="6">
        <v-autocomplete
          v-model="newData.access"
          :items="departemen.departemens"
          :item-value="(obj) => obj.id_dept"
          :item-text="(obj) => obj.nm_dept"
          label="Assessor"
        >
        </v-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-checkbox
          v-model="newData.assessor"
          label="Assessor"
          color="teal"
        ></v-checkbox>
      </v-col>
    </v-row>
  </base-form>
</template>

<script>
import { mapState } from 'vuex'
import BaseForm from '@/components/base/base-form'

export default {
  components: {
    BaseForm,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    edit: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      newData: {
        id_schedule_access: undefined,
        dept: undefined,
        access: undefined,
        assessor: false,
      },
    }
  },
  computed: {
    ...mapState(['departemen']),
    dialog: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
  watch: {
    value(val) {
      if (val) {
        this.newData.id_schedule_access = this.data.id_schedule_access
        this.newData.dept = this.data.dept
        this.newData.access = this.data.access
        this.newData.assessor = this.data.assessor
      }
    },
  },
}
</script>
