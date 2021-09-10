<template>
  <div>
    <a-tabs type="card" size="small">
      <a-tab-pane key="1" tab="Potongan"> </a-tab-pane>
    </a-tabs>
    <vue-excel-editor
      ref="pendapatan"
      v-model="pendapatan.items"
      filter-row
      no-header-edit
    >
      <vue-excel-column
        v-for="(c, i) in columns"
        :key="i"
        :change="c.change"
        :field="c.field"
        :init-style="c.initStyle"
        :invisible="c.invisible"
        :label="c.title"
        :options="c.options"
        :readonly="c.readonly"
        :sticky="c.sticky"
        :to-text="c.toText"
        :to-value="c.toValue"
        :type="c.type"
        :validate="c.validate"
        :width="c.width"
      />
    </vue-excel-editor>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      columns: [
        {
          field: 'nik_pegawai',
          readonly: true,
          sticky: true,
          title: 'NIK',
          width: '70px',
        },
        {
          field: 'nm_pegawai',
          readonly: true,
          sticky: true,
          title: 'Nama',
          width: '170px',
        },
        {
          field: 'nm_dept',
          initStyle: { 'white-space': 'pre' },
          readonly: true,
          title: 'Bagian',
          toText: this.depToLis,
          width: '170px',
        },
      ],
    }
  },
  computed: {
    ...mapState(['pendapatan']),
  },
}
</script>
