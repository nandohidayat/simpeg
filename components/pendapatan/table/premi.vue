<template>
  <div>
    <a-tabs v-if="tipe === 0" type="card" size="small" @change="onChangeTab">
      <a-tab-pane key="0" tab="Pendapatan"> </a-tab-pane>
      <a-tab-pane key="2" tab="Pajak"> </a-tab-pane>
    </a-tabs>
    <a-tabs v-if="tipe === 1" type="card" size="small">
      <a-tab-pane key="1" tab="Potongan"> </a-tab-pane>
    </a-tabs>
    <vue-excel-editor
      ref="pendapatan"
      v-model="pendapatan.items"
      filter-row
      no-header-edit
    >
      <vue-excel-column
        v-for="c in columns"
        :key="c.field"
        :change="c.change"
        :field="c.field"
        :init-style="c.initStyle"
        :invisible="c.invisible"
        :label="c.title"
        :options="c.options"
        :readonly="c.readonly"
        :sticky="c.sticky"
        :summary="c.summary"
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
import moment from 'moment'

export default {
  props: {
    tipe: {
      type: Number,
      default: 0,
    },
    filter: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      columns: [
        {
          author: 0,
          field: 'nik_pegawai',
          readonly: true,
          section: [0, 1, 2],
          sticky: true,
          title: 'NIK',
          type: 'number',
          width: '70px',
        },
        {
          author: 0,
          field: 'nm_pegawai',
          readonly: true,
          section: [0, 1, 2],
          sticky: true,
          title: 'Nama',
          type: 'string',
          width: '170px',
        },
        {
          author: 0,
          field: 'nm_dept',
          initStyle: { 'white-space': 'pre' },
          readonly: true,
          section: [0, 1, 2],
          title: 'Bagian',
          toText: this.depToLis,
          type: 'string',
          width: '170px',
        },
        {
          author: 0,
          change: this.onChangePtkp,
          field: 'ptkp',
          section: [0],
          title: 'PTKP (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          change: this.onChangeIndex1,
          field: 'index1',
          section: [0],
          title: 'Basic Index ()',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          change: this.onChangeIndex2,
          field: 'index2',
          section: [0],
          title: 'Competition Index ()',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          change: this.onChangeIndex3,
          field: 'index3',
          section: [0],
          title: 'Position Index ()',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          change: this.onChangeIndex4,
          field: 'index4',
          section: [0],
          title: 'Risk Index ()',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          change: this.onChangeIndex5,
          field: 'index5',
          section: [0],
          title: 'Index Kinerja Unit ()',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          change: this.onChangeIndex6,
          field: 'index6',
          section: [0],
          title: 'Emergency Index ()',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          change: this.onChangeIndex7,
          field: 'index7',
          section: [0],
          title: 'Tanggung Jawab Medis ()',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          change: this.onChangeIndex8,
          field: 'index8',
          section: [0],
          title: 'Beban Tugas ()',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          change: this.onChangeIndex9,
          field: 'index9',
          section: [0],
          title: 'Tenaga Karir ()',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'index10',
          section: [0],
          title: 'Jumlah Index',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          change: this.onChangeIndex11,
          field: 'index11',
          section: [0],
          title: 'Status (%)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          change: this.onChangeIndex12,
          field: 'index12',
          section: [0],
          title: 'Masa Kerja (%)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'jmlhindex',
          readonly: true,
          section: [0],
          summary: 'sum',
          title: 'Total Index Individu ()',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          change: this.onChangeIndex13,
          field: 'index13',
          section: [0],
          title: 'Total Index Rumah Sakit ()',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          change: this.onChangeIndex14,
          field: 'index14',
          section: [0],
          title: 'PPH (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'bruto1',
          readonly: true,
          section: [0],
          title: 'Premi Bruto (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          change: this.onChangeBruto2v1,
          field: 'bruto2v1',
          section: [0],
          title: '1. Doa (Filled)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          change: this.onChangeBruto2v2,
          field: 'bruto2v2',
          section: [0],
          title: '1. Doa (Minimum)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'bruto2p',
          readonly: true,
          section: [0],
          title: '1. Doa (%)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'bruto2',
          readonly: true,
          section: [0],
          title: '2. Doa (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          change: this.onChangeBruto3v,
          field: 'bruto3v',
          section: [0],
          title: '2. Pelanggaran ()',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'bruto3p',
          readonly: true,
          section: [0],
          title: '2. Pelanggaran (%)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'bruto3',
          readonly: true,
          section: [0],
          title: '2. Pelanggaran (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          change: this.onChangeBruto4v,
          field: 'bruto4v',
          section: [0],
          title: '3. SP ()',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'bruto4p',
          readonly: true,
          title: '3. SP (%)',
          section: [0],
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'bruto4',
          readonly: true,
          section: [0],
          title: '3. SP (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          change: this.onChangeBruto5,
          field: 'bruto5',
          section: [0],
          title: '4. Tidak Upacara 17 Agt (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'premi1',
          readonly: true,
          section: [0],
          title: '01. Premi Netto (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'premi2p',
          section: [0],
          title: '02. Lembur (Jam)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          change: this.onChangePremi2,
          field: 'premi2',
          section: [0],
          title: '02. Lembur (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'premi3v',
          readonly: true,
          section: [0],
          title: '03. Makan (Hari)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'premi3p',
          readonly: true,
          section: [0],
          title: '03. Makan (Tarif)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'premi3',
          readonly: true,
          section: [0],
          title: '03. Makan (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          change: this.onChangePremi6v,
          field: 'premi6v',
          section: [0],
          title: '03. Makan Manual (Hari)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'premi6p',
          readonly: true,
          section: [0],
          title: '03. Makan Manual (Tarif)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'premi6',
          readonly: true,
          section: [0],
          title: '03. Makan Manual (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'premi4v1',
          readonly: true,
          section: [0],
          title: '04. Hadir (No)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'premi4v2',
          readonly: true,
          section: [0],
          title: '04. Hadir (Yes)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'premi4p',
          readonly: true,
          section: [0],
          title: '04. Hadir (Tarif)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'premi4',
          readonly: true,
          section: [0],
          title: '04. Hadir (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          change: this.onChangePremi7v,
          field: 'premi7v2',
          section: [0],
          title: '04. Hadir Manual (Yes)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'premi7p',
          readonly: true,
          section: [0],
          title: '04. Hadir Manual (Tarif)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'premi7',
          readonly: true,
          section: [0],
          title: '04. Hadir Manual (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          title: 'Jumlah (Rp)',
          field: 'jmlhpremi',
          section: [0],
          type: 'number',
          width: '120px',
          toText: this.numToCur,
          toValue: this.numToVal,
        },
        {
          author: 0,
          title: 'Zakat (2.5%) (Rp)',
          field: 'premi5',
          section: [0],
          type: 'number',
          width: '120px',
          readonly: true,
          toText: this.numToCur,
          toValue: this.numToVal,
        },
        {
          author: 0,
          title: 'Diterima Bersih (Rp)',
          field: 'diterima',
          section: [0, 1],
          type: 'number',
          width: '120px',
          readonly: true,
          toText: this.numToCur,
          toValue: this.numToVal,
        },
        {
          author: 0,
          field: 'pjk1',
          invisible: true,
          readonly: true,
          section: [2],
          title: 'Penerimaan Lalu (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'pjk2',
          invisible: true,
          readonly: true,
          section: [2],
          title: 'Premi/ Lbr/ Mkn/ Hdr (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'pjk3',
          invisible: true,
          readonly: true,
          section: [2],
          title: 'Gaji (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'pjk4',
          invisible: true,
          readonly: true,
          section: [2],
          title: 'Insentiv (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'pjk5',
          invisible: true,
          readonly: true,
          section: [2],
          title: 'THR/ Gaji ke/ Jaspr (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'pjk6',
          invisible: true,
          readonly: true,
          section: [2],
          title: 'Makan (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'pjk7',
          invisible: true,
          readonly: true,
          section: [2],
          title: 'Penerimaan Netto (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'pjk8',
          invisible: true,
          readonly: true,
          section: [2],
          title: 'Biaya THT (5%) (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'pjk9',
          invisible: true,
          readonly: true,
          section: [2],
          title: 'Biaya Jabatan (5%) (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'pjk10',
          invisible: true,
          readonly: true,
          section: [2],
          title: 'P. Tidak Kena Pajak (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'pjk11',
          invisible: true,
          readonly: true,
          section: [2],
          title: 'P. Kena Pajak (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'pjk12',
          invisible: true,
          readonly: true,
          section: [2],
          title: 'Pajak Terhutang (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'pjk13',
          invisible: true,
          readonly: true,
          section: [2],
          title: 'Pajak Sudah Dibayar (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'pjk14',
          invisible: true,
          readonly: true,
          section: [2],
          title: 'Subsidi Pajak (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'pjk15',
          invisible: true,
          readonly: true,
          section: [2],
          toText: this.numToCur,
          toValue: this.numToVal,
          title: 'Pajak Kurang Bayar (Rp)',
          type: 'number',
          width: '120px',
        },
        {
          author: 1,
          change: this.onChangeRemunerasi,
          field: 'remunerasi',
          invisible: true,
          section: [1],
          title: 'Remunerasi (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 1,
          change: this.onChangePanti,
          field: 'panti',
          invisible: true,
          section: [1],
          title: 'Panti Asuhan (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 1,
          change: this.onChangeKoperasi,
          field: 'koperasi',
          invisible: true,
          section: [1],
          title: 'Koperasi (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 1,
          change: this.onChangeKantor,
          field: 'kantor',
          invisible: true,
          section: [1],
          title: 'Rumah Sakit (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 1,
          change: this.onChangeLainlain,
          field: 'lainlain',
          invisible: true,
          section: [1],
          title: 'Lain-lain (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 1,
          field: 'jmlhpotg',
          invisible: true,
          section: [1],
          title: 'Jumlah Potongan (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          readonly: true,
          width: '120px',
        },
        {
          author: 1,
          field: 'penyerahan',
          invisible: true,
          section: [1],
          title: 'Diterima (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          readonly: true,
          width: '120px',
        },
      ],
    }
  },
  computed: {
    ...mapState(['pendapatan']),
  },
  watch: {
    filter(val) {
      this.$refs.pendapatan.fields.forEach((field) => {
        const find = this.columns.find((i) => i.field === field.name)
        field.invisible = !find.section.includes(parseInt(val))
      })
      this.$forceUpdate()
    },
  },
  created() {
    this.columns.forEach(
      (i) => (i.invisible = !i.section.includes(this.filter))
    )
  },
  methods: {
    onChangeTab(val) {
      this.$emit('update:filter', parseInt(val))
    },
    numToCur(val) {
      return parseFloat(val || 0)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    },
    numToVal(text) {
      return Number(text.replace(/[^0-9.-]+/g, ''))
    },
    depToLis(val) {
      return val.join('\n')
    },
    onChangePtkp(nVal, oVal, row) {
      row.pjk10 = -(nVal * parseInt(moment(this.pendapatan.date).format('M')))
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13
    },
    onChangeIndex1(nVal, oVal, row) {
      row.index10 =
        nVal +
        row.index2 +
        row.index3 +
        row.index4 +
        row.index5 +
        row.index6 +
        row.index7 +
        row.index8 +
        row.index9

      row.jmlhindex = row.index10 * (row.index11 / 100) * (row.index12 / 100)
      row.bruto1 = (row.jmlhindex / row.index13) * row.index14
      row.bruto2 = -(row.bruto1 * (row.bruto2p / 100))
      row.bruto3 = -(row.bruto1 * (row.bruto3p / 100))
      row.bruto4 = -(row.bruto1 * (row.bruto4p / 100))

      row.premi1 =
        row.bruto1 + row.bruto2 + row.bruto3 + row.bruto4 + row.bruto5

      const temp = row.jmlhpremi
      row.jmlhpremi =
        row.premi1 +
        row.premi2 +
        row.premi3 +
        row.premi4 +
        row.premi6 +
        row.premi7
      row.premi5 = (row.jmlhpremi - (row.premi3 + row.premi6)) * (2.5 / 100)
      row.diterima = row.jmlhpremi - row.premi5

      row.pjk2 = row.pjk2 - temp + row.jmlhpremi

      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.penyerahan = row.diterima + row.jmlhpotg
    },
    onChangeIndex2(nVal, oVal, row) {
      row.index10 =
        row.index1 +
        nVal +
        row.index3 +
        row.index4 +
        row.index5 +
        row.index6 +
        row.index7 +
        row.index8 +
        row.index9

      row.jmlhindex = row.index10 * (row.index11 / 100) * (row.index12 / 100)
      row.bruto1 = (row.jmlhindex / row.index13) * row.index14
      row.bruto2 = -(row.bruto1 * (row.bruto2p / 100))
      row.bruto3 = -(row.bruto1 * (row.bruto3p / 100))
      row.bruto4 = -(row.bruto1 * (row.bruto4p / 100))

      row.premi1 =
        row.bruto1 + row.bruto2 + row.bruto3 + row.bruto4 + row.bruto5

      const temp = row.jmlhpremi
      row.jmlhpremi =
        row.premi1 +
        row.premi2 +
        row.premi3 +
        row.premi4 +
        row.premi6 +
        row.premi7
      row.premi5 = (row.jmlhpremi - (row.premi3 + row.premi6)) * (2.5 / 100)
      row.diterima = row.jmlhpremi - row.premi5

      row.pjk2 = row.pjk2 - temp + row.jmlhpremi

      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.penyerahan = row.diterima + row.jmlhpotg
    },
    onChangeIndex3(nVal, oVal, row) {
      row.index10 =
        row.index1 +
        row.index2 +
        nVal +
        row.index4 +
        row.index5 +
        row.index6 +
        row.index7 +
        row.index8 +
        row.index9

      row.jmlhindex = row.index10 * (row.index11 / 100) * (row.index12 / 100)
      row.bruto1 = (row.jmlhindex / row.index13) * row.index14
      row.bruto2 = -(row.bruto1 * (row.bruto2p / 100))
      row.bruto3 = -(row.bruto1 * (row.bruto3p / 100))
      row.bruto4 = -(row.bruto1 * (row.bruto4p / 100))

      row.premi1 =
        row.bruto1 + row.bruto2 + row.bruto3 + row.bruto4 + row.bruto5

      const temp = row.jmlhpremi
      row.jmlhpremi =
        row.premi1 +
        row.premi2 +
        row.premi3 +
        row.premi4 +
        row.premi6 +
        row.premi7
      row.premi5 = (row.jmlhpremi - (row.premi3 + row.premi6)) * (2.5 / 100)
      row.diterima = row.jmlhpremi - row.premi5

      row.pjk2 = row.pjk2 - temp + row.jmlhpremi

      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.penyerahan = row.diterima + row.jmlhpotg
    },
    onChangeIndex4(nVal, oVal, row) {
      row.index10 =
        row.index1 +
        row.index2 +
        row.index3 +
        nVal +
        row.index5 +
        row.index6 +
        row.index7 +
        row.index8 +
        row.index9

      row.jmlhindex = row.index10 * (row.index11 / 100) * (row.index12 / 100)
      row.bruto1 = (row.jmlhindex / row.index13) * row.index14
      row.bruto2 = -(row.bruto1 * (row.bruto2p / 100))
      row.bruto3 = -(row.bruto1 * (row.bruto3p / 100))
      row.bruto4 = -(row.bruto1 * (row.bruto4p / 100))

      row.premi1 =
        row.bruto1 + row.bruto2 + row.bruto3 + row.bruto4 + row.bruto5

      const temp = row.jmlhpremi
      row.jmlhpremi =
        row.premi1 +
        row.premi2 +
        row.premi3 +
        row.premi4 +
        row.premi6 +
        row.premi7
      row.premi5 = (row.jmlhpremi - (row.premi3 + row.premi6)) * (2.5 / 100)
      row.diterima = row.jmlhpremi - row.premi5

      row.pjk2 = row.pjk2 - temp + row.jmlhpremi

      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.penyerahan = row.diterima + row.jmlhpotg
    },
    onChangeIndex5(nVal, oVal, row) {
      row.index10 =
        row.index1 +
        row.index2 +
        row.index3 +
        row.index4 +
        nVal +
        row.index6 +
        row.index7 +
        row.index8 +
        row.index9

      row.jmlhindex = row.index10 * (row.index11 / 100) * (row.index12 / 100)
      row.bruto1 = (row.jmlhindex / row.index13) * row.index14
      row.bruto2 = -(row.bruto1 * (row.bruto2p / 100))
      row.bruto3 = -(row.bruto1 * (row.bruto3p / 100))
      row.bruto4 = -(row.bruto1 * (row.bruto4p / 100))

      row.premi1 =
        row.bruto1 + row.bruto2 + row.bruto3 + row.bruto4 + row.bruto5

      const temp = row.jmlhpremi
      row.jmlhpremi =
        row.premi1 +
        row.premi2 +
        row.premi3 +
        row.premi4 +
        row.premi6 +
        row.premi7
      row.premi5 = (row.jmlhpremi - (row.premi3 + row.premi6)) * (2.5 / 100)
      row.diterima = row.jmlhpremi - row.premi5

      row.pjk2 = row.pjk2 - temp + row.jmlhpremi

      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.penyerahan = row.diterima + row.jmlhpotg
    },
    onChangeIndex6(nVal, oVal, row) {
      row.index10 =
        row.index1 +
        row.index2 +
        row.index3 +
        row.index4 +
        row.index5 +
        nVal +
        row.index7 +
        row.index8 +
        row.index9

      row.jmlhindex = row.index10 * (row.index11 / 100) * (row.index12 / 100)
      row.bruto1 = (row.jmlhindex / row.index13) * row.index14
      row.bruto2 = -(row.bruto1 * (row.bruto2p / 100))
      row.bruto3 = -(row.bruto1 * (row.bruto3p / 100))
      row.bruto4 = -(row.bruto1 * (row.bruto4p / 100))

      row.premi1 =
        row.bruto1 + row.bruto2 + row.bruto3 + row.bruto4 + row.bruto5

      const temp = row.jmlhpremi
      row.jmlhpremi =
        row.premi1 +
        row.premi2 +
        row.premi3 +
        row.premi4 +
        row.premi6 +
        row.premi7
      row.premi5 = (row.jmlhpremi - (row.premi3 + row.premi6)) * (2.5 / 100)
      row.diterima = row.jmlhpremi - row.premi5

      row.pjk2 = row.pjk2 - temp + row.jmlhpremi

      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.penyerahan = row.diterima + row.jmlhpotg
    },
    onChangeIndex7(nVal, oVal, row) {
      row.index10 =
        row.index1 +
        row.index2 +
        row.index3 +
        row.index4 +
        row.index5 +
        row.index6 +
        nVal +
        row.index8 +
        row.index9

      row.jmlhindex = row.index10 * (row.index11 / 100) * (row.index12 / 100)
      row.bruto1 = (row.jmlhindex / row.index13) * row.index14
      row.bruto2 = -(row.bruto1 * (row.bruto2p / 100))
      row.bruto3 = -(row.bruto1 * (row.bruto3p / 100))
      row.bruto4 = -(row.bruto1 * (row.bruto4p / 100))

      row.premi1 =
        row.bruto1 + row.bruto2 + row.bruto3 + row.bruto4 + row.bruto5

      const temp = row.jmlhpremi
      row.jmlhpremi =
        row.premi1 +
        row.premi2 +
        row.premi3 +
        row.premi4 +
        row.premi6 +
        row.premi7
      row.premi5 = (row.jmlhpremi - (row.premi3 + row.premi6)) * (2.5 / 100)
      row.diterima = row.jmlhpremi - row.premi5

      row.pjk2 = row.pjk2 - temp + row.jmlhpremi

      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.penyerahan = row.diterima + row.jmlhpotg
    },
    onChangeIndex8(nVal, oVal, row) {
      row.index10 =
        row.index1 +
        row.index2 +
        row.index3 +
        row.index4 +
        row.index5 +
        row.index6 +
        row.index7 +
        nVal +
        row.index9

      row.jmlhindex = row.index10 * (row.index11 / 100) * (row.index12 / 100)
      row.bruto1 = (row.jmlhindex / row.index13) * row.index14
      row.bruto2 = -(row.bruto1 * (row.bruto2p / 100))
      row.bruto3 = -(row.bruto1 * (row.bruto3p / 100))
      row.bruto4 = -(row.bruto1 * (row.bruto4p / 100))

      row.premi1 =
        row.bruto1 + row.bruto2 + row.bruto3 + row.bruto4 + row.bruto5

      const temp = row.jmlhpremi
      row.jmlhpremi =
        row.premi1 +
        row.premi2 +
        row.premi3 +
        row.premi4 +
        row.premi6 +
        row.premi7
      row.premi5 = (row.jmlhpremi - (row.premi3 + row.premi6)) * (2.5 / 100)
      row.diterima = row.jmlhpremi - row.premi5

      row.pjk2 = row.pjk2 - temp + row.jmlhpremi

      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.penyerahan = row.diterima + row.jmlhpotg
    },
    onChangeIndex9(nVal, oVal, row) {
      row.index10 =
        row.index1 +
        row.index2 +
        row.index3 +
        row.index4 +
        row.index5 +
        row.index6 +
        row.index7 +
        row.index8 +
        nVal

      row.jmlhindex = row.index10 * (row.index11 / 100) * (row.index12 / 100)
      row.bruto1 = (row.jmlhindex / row.index13) * row.index14
      row.bruto2 = -(row.bruto1 * (row.bruto2p / 100))
      row.bruto3 = -(row.bruto1 * (row.bruto3p / 100))
      row.bruto4 = -(row.bruto1 * (row.bruto4p / 100))

      row.premi1 =
        row.bruto1 + row.bruto2 + row.bruto3 + row.bruto4 + row.bruto5

      const temp = row.jmlhpremi
      row.jmlhpremi =
        row.premi1 +
        row.premi2 +
        row.premi3 +
        row.premi4 +
        row.premi6 +
        row.premi7
      row.premi5 = (row.jmlhpremi - (row.premi3 + row.premi6)) * (2.5 / 100)
      row.diterima = row.jmlhpremi - row.premi5

      row.pjk2 = row.pjk2 - temp + row.jmlhpremi

      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.penyerahan = row.diterima + row.jmlhpotg
    },
    onChangeIndex11(nVal, oVal, row) {
      row.jmlhindex = row.index10 * (nVal / 100) * (row.index12 / 100)
      row.bruto1 = (row.jmlhindex / row.index13) * row.index14
      row.bruto2 = -(row.bruto1 * (row.bruto2p / 100))
      row.bruto3 = -(row.bruto1 * (row.bruto3p / 100))
      row.bruto4 = -(row.bruto1 * (row.bruto4p / 100))

      row.premi1 =
        row.bruto1 + row.bruto2 + row.bruto3 + row.bruto4 + row.bruto5

      const temp = row.jmlhpremi
      row.jmlhpremi =
        row.premi1 +
        row.premi2 +
        row.premi3 +
        row.premi4 +
        row.premi6 +
        row.premi7
      row.premi5 = (row.jmlhpremi - (row.premi3 + row.premi6)) * (2.5 / 100)
      row.diterima = row.jmlhpremi - row.premi5

      row.pjk2 = row.pjk2 - temp + row.jmlhpremi

      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.penyerahan = row.diterima + row.jmlhpotg
    },
    onChangeIndex12(nVal, oVal, row) {
      row.jmlhindex = row.index10 * (row.index11 / 100) * (nVal / 100)
      row.bruto1 = (row.jmlhindex / row.index13) * row.index14
      row.bruto2 = -(row.bruto1 * (row.bruto2p / 100))
      row.bruto3 = -(row.bruto1 * (row.bruto3p / 100))
      row.bruto4 = -(row.bruto1 * (row.bruto4p / 100))

      row.premi1 =
        row.bruto1 + row.bruto2 + row.bruto3 + row.bruto4 + row.bruto5

      const temp = row.jmlhpremi
      row.jmlhpremi =
        row.premi1 +
        row.premi2 +
        row.premi3 +
        row.premi4 +
        row.premi6 +
        row.premi7
      row.premi5 = (row.jmlhpremi - (row.premi3 + row.premi6)) * (2.5 / 100)
      row.diterima = row.jmlhpremi - row.premi5

      row.pjk2 = row.pjk2 - temp + row.jmlhpremi

      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.penyerahan = row.diterima + row.jmlhpotg
    },
    onChangeIndex13(nVal, oVal, row) {
      row.bruto1 = (row.jmlhindex / nVal) * row.index14
      row.bruto2 = -(row.bruto1 * (row.bruto2p / 100))
      row.bruto3 = -(row.bruto1 * (row.bruto3p / 100))
      row.bruto4 = -(row.bruto1 * (row.bruto4p / 100))

      row.premi1 =
        row.bruto1 + row.bruto2 + row.bruto3 + row.bruto4 + row.bruto5

      const temp = row.jmlhpremi
      row.jmlhpremi =
        row.premi1 +
        row.premi2 +
        row.premi3 +
        row.premi4 +
        row.premi6 +
        row.premi7
      row.premi5 = (row.jmlhpremi - (row.premi3 + row.premi6)) * (2.5 / 100)
      row.diterima = row.jmlhpremi - row.premi5

      row.pjk2 = row.pjk2 - temp + row.jmlhpremi

      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.penyerahan = row.diterima + row.jmlhpotg
    },
    onChangeIndex14(nVal, oVal, row) {
      row.bruto1 = (row.jmlhindex / row.index13) * nVal
      row.bruto2 = -(row.bruto1 * (row.bruto2p / 100))
      row.bruto3 = -(row.bruto1 * (row.bruto3p / 100))
      row.bruto4 = -(row.bruto1 * (row.bruto4p / 100))

      row.premi1 =
        row.bruto1 + row.bruto2 + row.bruto3 + row.bruto4 + row.bruto5

      const temp = row.jmlhpremi
      row.jmlhpremi =
        row.premi1 +
        row.premi2 +
        row.premi3 +
        row.premi4 +
        row.premi6 +
        row.premi7
      row.premi5 = (row.jmlhpremi - (row.premi3 + row.premi6)) * (2.5 / 100)
      row.diterima = row.jmlhpremi - row.premi5

      row.pjk2 = row.pjk2 - temp + row.jmlhpremi

      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.penyerahan = row.diterima + row.jmlhpotg
    },
    onChangeBruto2v1(nVal, oVal, row) {
      const p = 1 - nVal / row.bruto2v2
      if (p >= 0.2 && p <= 0.35) {
        row.bruto2p = 5
      } else if (p >= 0.36 && p <= 0.5) {
        row.bruto2p = 10
      } else if (p >= 0.51 && p <= 1) {
        row.bruto2p = 15
      } else {
        row.bruto2p = 0
      }
      row.bruto2 = -(row.bruto1 * (p / 100))

      row.premi1 =
        row.bruto1 + row.bruto2 + row.bruto3 + row.bruto4 + row.bruto5

      const temp = row.jmlhpremi
      row.jmlhpremi =
        row.premi1 +
        row.premi2 +
        row.premi3 +
        row.premi4 +
        row.premi6 +
        row.premi7
      row.premi5 = (row.jmlhpremi - (row.premi3 + row.premi6)) * (2.5 / 100)
      row.diterima = row.jmlhpremi - row.premi5

      row.pjk2 = row.pjk2 - temp + row.jmlhpremi

      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.penyerahan = row.diterima + row.jmlhpotg
    },
    onChangeBruto2v2(nVal, oVal, row) {
      const p = 1 - row.bruto2v1 / nVal
      if (p >= 0.2 && p <= 0.35) {
        row.bruto2p = 5
      } else if (p >= 0.36 && p <= 0.5) {
        row.bruto2p = 10
      } else if (p >= 0.51 && p <= 1) {
        row.bruto2p = 15
      } else {
        row.bruto2p = 0
      }
      row.bruto2 = -(row.bruto1 * (p / 100))

      row.premi1 =
        row.bruto1 + row.bruto2 + row.bruto3 + row.bruto4 + row.bruto5

      const temp = row.jmlhpremi
      row.jmlhpremi =
        row.premi1 +
        row.premi2 +
        row.premi3 +
        row.premi4 +
        row.premi6 +
        row.premi7
      row.premi5 = (row.jmlhpremi - (row.premi3 + row.premi6)) * (2.5 / 100)
      row.diterima = row.jmlhpremi - row.premi5

      row.pjk2 = row.pjk2 - temp + row.jmlhpremi

      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.penyerahan = row.diterima + row.jmlhpotg
    },
    onChangeBruto3v(nVal, oVal, row) {
      switch (parseInt(nVal)) {
        case 1:
          row.bruto3p = 5
          break
        case 2:
          row.bruto3p = 10
          break
        case 3:
          row.bruto3p = 15
          break
        default:
          row.bruto3p = 0
          break
      }
      row.bruto3 = -(row.bruto1 * (row.bruto3p / 100))

      row.premi1 =
        row.bruto1 + row.bruto2 + row.bruto3 + row.bruto4 + row.bruto5

      const temp = row.jmlhpremi
      row.jmlhpremi =
        row.premi1 +
        row.premi2 +
        row.premi3 +
        row.premi4 +
        row.premi6 +
        row.premi7
      row.premi5 = (row.jmlhpremi - (row.premi3 + row.premi6)) * (2.5 / 100)
      row.diterima = row.jmlhpremi - row.premi5

      row.pjk2 = row.pjk2 - temp + row.jmlhpremi

      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.penyerahan = row.diterima + row.jmlhpotg
    },
    onChangeBruto4v(nVal, oVal, row) {
      switch (parseInt(nVal)) {
        case 1:
          row.bruto4p = 15
          break
        case 2:
          row.bruto4p = 25
          break
        default:
          row.bruto4p = 0
          break
      }
      row.bruto4 = -(row.bruto1 * (row.bruto4p / 100))

      row.premi1 =
        row.bruto1 + row.bruto2 + row.bruto3 + row.bruto4 + row.bruto5

      const temp = row.jmlhpremi
      row.jmlhpremi =
        row.premi1 +
        row.premi2 +
        row.premi3 +
        row.premi4 +
        row.premi6 +
        row.premi7
      row.premi5 = (row.jmlhpremi - (row.premi3 + row.premi6)) * (2.5 / 100)
      row.diterima = row.jmlhpremi - row.premi5

      row.pjk2 = row.pjk2 - temp + row.jmlhpremi

      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.penyerahan = row.diterima + row.jmlhpotg
    },
    onChangeBruto5(nVal, oVal, row) {
      row.premi1 = row.bruto1 + row.bruto2 + row.bruto3 + row.bruto4 + nVal

      const temp = row.jmlhpremi
      row.jmlhpremi =
        row.premi1 +
        row.premi2 +
        row.premi3 +
        row.premi4 +
        row.premi6 +
        row.premi7
      row.premi5 = (row.jmlhpremi - (row.premi3 + row.premi6)) * (2.5 / 100)
      row.diterima = row.jmlhpremi - row.premi5

      row.pjk2 = row.pjk2 - temp + row.jmlhpremi

      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.penyerahan = row.diterima + row.jmlhpotg
    },
    onChangePremi2(nVal, oVal, row) {
      const temp = row.jmlhpremi
      row.jmlhpremi =
        row.premi1 + nVal + row.premi3 + row.premi4 + row.premi6 + row.premi7
      row.premi5 = (row.jmlhpremi - (row.premi3 + row.premi6)) * (2.5 / 100)
      row.diterima = row.jmlhpremi - row.premi5

      row.pjk2 = row.pjk2 - temp + row.jmlhpremi

      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.penyerahan = row.diterima + row.jmlhpotg
    },
    onChangePremi6v(nval, oval, row) {
      const temp = row.jmlhpremi
      const temp1 = row.premi3 + row.premi6

      row.premi6 = nval * row.premi6p

      row.jmlhpremi =
        row.premi1 +
        row.premi2 +
        row.premi3 +
        row.premi4 +
        row.premi6 +
        row.premi7
      row.premi5 = (row.jmlhpremi - (row.premi3 + row.premi6)) * (2.5 / 100)
      row.diterima = row.jmlhpremi - row.premi5

      row.pjk2 = row.pjk2 - temp + row.jmlhpremi
      row.pjk6 = row.pjk6 + temp1 - (row.premi3 + row.premi6)
      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.penyerahan = row.diterima + row.jmlhpotg
    },
    onChangePremi7v(nval, oval, row) {
      row.premi7 = nval * row.premi7p

      const temp = row.jmlhpremi

      row.jmlhpremi =
        row.premi1 +
        row.premi2 +
        row.premi3 +
        row.premi4 +
        row.premi6 +
        row.premi7
      row.premi5 = (row.jmlhpremi - (row.premi3 + row.premi6)) * (2.5 / 100)
      row.diterima = row.jmlhpremi - row.premi5

      row.pjk2 = row.pjk2 - temp + row.jmlhpremi
      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.penyerahan = row.diterima + row.jmlhpotg
    },
    onChangeRemunerasi(nval, oval, row) {
      row.jmlhpotg = nval + row.panti + row.koperasi + row.kantor + row.lainlain
      row.penyerahan = row.diterima + row.jmlhpotg
    },
    onChangePanti(nval, oval, row) {
      row.jmlhpotg =
        row.remunerasi + nval + row.koperasi + row.kantor + row.lainlain
      row.penyerahan = row.diterima + row.jmlhpotg
    },
    onChangeKoperasi(nval, oval, row) {
      row.jmlhpotg =
        row.remunerasi + row.panti + nval + row.kantor + row.lainlain
      row.penyerahan = row.diterima + row.jmlhpotg
    },
    onChangeKantor(nval, oval, row) {
      row.jmlhpotg =
        row.remunerasi + row.panti + row.koperasi + nval + row.lainlain
      row.penyerahan = row.diterima + row.jmlhpotg
    },
    onChangeLainlain(nval, oval, row) {
      row.jmlhpotg =
        row.remunerasi + row.panti + row.koperasi + row.kantor + nval
      row.penyerahan = row.diterima + row.jmlhpotg
    },
  },
}
</script>
