<template>
  <div>
    <a-tabs
      v-if="tipe === 'personalia'"
      type="card"
      size="small"
      @change="onChangeTab"
    >
      <a-tab-pane key="1" tab="Pendapatan"> </a-tab-pane>
      <a-tab-pane key="2" tab="Pajak"> </a-tab-pane>
    </a-tabs>
    <a-tabs v-if="tipe === 'keuangan'" type="card" size="small">
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
      type: String,
      default: 'personalia',
    },
  },
  data() {
    return {
      columns: [
        {
          field: 'nik_pegawai',
          readonly: true,
          sticky: true,
          title: 'NIK',
          type: 'number',
          width: '70px',
        },
        {
          field: 'nm_pegawai',
          readonly: true,
          sticky: true,
          title: 'Nama',
          type: 'string',
          width: '170px',
        },
        {
          field: 'nm_dept',
          initStyle: { 'white-space': 'pre' },
          readonly: true,
          title: 'Bagian',
          toText: this.depToLis,
          type: 'string',
          width: '170px',
        },
        {
          field: 'ketptkp',
          options: ['K/0', 'K/1', 'K/2', 'K/3', 'K/4', 'K/5', 'TK/0'],
          title: 'Ket. PTKP',
          type: 'select',
        },
        {
          change: this.onChangePtkp,
          field: 'ptkp',
          title: 'PTKP (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          change: this.onChangeIndex1,
          field: 'index1',
          title: 'Basic Index ()',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          change: this.onChangeIndex2,
          field: 'index2',
          title: 'Competition Index ()',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          change: this.onChangeIndex3,
          field: 'index3',
          title: 'Position Index ()',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          change: this.onChangeIndex4,
          field: 'index4',
          title: 'Risk Index ()',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          change: this.onChangeIndex5,
          field: 'index5',
          title: 'Index Kinerja Unit ()',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          change: this.onChangeIndex6,
          field: 'index6',
          title: 'Emergency Index ()',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          change: this.onChangeIndex7,
          field: 'index7',
          title: 'Tanggung Jawab Medis ()',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          change: this.onChangeIndex8,
          field: 'index8',
          title: 'Beban Tugas ()',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          change: this.onChangeIndex9,
          field: 'index9',
          title: 'Tenaga Karir ()',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          field: 'index10',
          title: 'Jumlah Index',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          change: this.onChangeIndex11,
          field: 'index11',
          title: 'Status (%)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          change: this.onChangeIndex12,
          field: 'index12',
          title: 'Masa Kerja (%)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          field: 'jmlhindex',
          readonly: true,
          summary: 'sum',
          title: 'Total Index ()',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          change: this.onChangeIndex13,
          field: 'index13',
          title: 'Skor Rumah Sakit ()',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          change: this.onChangeIndex14,
          field: 'index14',
          title: 'PPH (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          field: 'bruto1',
          title: 'Premi Bruto (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          change: this.onChangeBruto2v1,
          field: 'bruto2v1',
          title: '1. Doa (Filled)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          change: this.onChangeBruto2v2,
          field: 'bruto2v2',
          title: '1. Doa (Minimum)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          field: 'bruto2p',
          title: '1. Doa (%)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          field: 'bruto2',
          title: '2. Doa (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          change: this.onChangeBruto3v,
          field: 'bruto3v',
          title: '2. Pelanggaran ()',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          field: 'bruto3p',
          title: '2. Pelanggaran (%)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          field: 'bruto3',
          title: '2. Pelanggaran (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          change: this.onChangeBruto4v,
          field: 'bruto4v',
          title: '3. SP ()',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          field: 'bruto4p',
          title: '3. SP (%)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          field: 'bruto4',
          title: '3. SP (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          change: this.onChangeBruto5,
          field: 'bruto5',
          title: '4. Tidak Upacara 17 Agt (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          field: 'premi1',
          title: '01. Premi Netto (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          field: 'premi2p',
          title: '02. Lembur (Jam)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          change: this.onChangePremi2,
          field: 'premi2',
          title: '02. Lembur (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          change: this.onChangePremi3v,
          field: 'premi3v',
          title: '03. Makan (Hari)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          field: 'premi3p',
          title: '03. Makan (Tarif)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          field: 'premi3',
          title: '03. Makan (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          field: 'premi4v1',
          title: '04. Hadir (No)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          change: this.onChangePremi4v2,
          field: 'premi4v2',
          title: '04. Hadir (Yes)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          field: 'premi4p',
          title: '04. Hadir (Tarif)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          field: 'premi4',
          title: '04. Hadir (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          title: 'Jumlah (Rp)',
          field: 'jmlhpremi',
          type: 'number',
          width: '120px',
          toText: this.numToCur,
          toValue: this.numToVal,
        },
        {
          title: 'Zakat (2.5%) (Rp)',
          field: 'premi5',
          type: 'number',
          width: '120px',
          readonly: true,
          toText: this.numToCur,
          toValue: this.numToVal,
        },
        {
          title: 'Diterima Bersih (Rp)',
          field: 'diterima',
          type: 'number',
          width: '120px',
          readonly: true,
          toText: this.numToCur,
          toValue: this.numToVal,
        },
        {
          field: 'pjk1',
          invisible: true,
          readonly: true,
          title: 'Penerimaan Lalu (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          field: 'pjk2',
          invisible: true,
          readonly: true,
          title: 'Premi/ Lbr/ Mkn/ Hdr (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          field: 'pjk3',
          invisible: true,
          readonly: true,
          title: 'Gaji (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          field: 'pjk4',
          invisible: true,
          readonly: true,
          title: 'Insentiv (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          field: 'pjk5',
          invisible: true,
          readonly: true,
          title: 'THR/ Gaji ke/ Jaspr (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          field: 'pjk6',
          invisible: true,
          readonly: true,
          title: 'Makan (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          field: 'pjk7',
          invisible: true,
          readonly: true,
          title: 'Penerimaan Netto (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          field: 'pjk8',
          invisible: true,
          readonly: true,
          title: 'Biaya THT (5%) (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          field: 'pjk9',
          invisible: true,
          readonly: true,
          title: 'Biaya Jabatan (5%) (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          field: 'pjk10',
          invisible: true,
          readonly: true,
          title: 'P. Tidak Kena Pajak (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          field: 'pjk11',
          invisible: true,
          readonly: true,
          title: 'P. Kena Pajak (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          field: 'pjk12',
          invisible: true,
          readonly: true,
          title: 'Pajak Terhutang (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          field: 'pjk13',
          invisible: true,
          readonly: true,
          title: 'Pajak Sudah Dibayar (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          field: 'pjk14',
          invisible: true,
          readonly: true,
          title: 'Subsidi Pajak (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          field: 'pjk15',
          invisible: true,
          readonly: true,
          toText: this.numToCur,
          toValue: this.numToVal,
          title: 'Pajak Kurang Bayar (Rp)',
          type: 'number',
          width: '120px',
        },
        {
          change: this.onChangeRemunerasi,
          field: 'remunerasi',
          invisible: true,
          title: 'Remunerasi (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          change: this.onChangePanti,
          field: 'panti',
          invisible: true,
          title: 'Panti Asuhan (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          change: this.onChangeKoperasi,
          field: 'koperasi',
          invisible: true,
          title: 'Koperasi (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          change: this.onChangeKantor,
          field: 'kantor',
          invisible: true,
          title: 'Rumah Sakit (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          change: this.onChangeLainlain,
          field: 'lainlain',
          invisible: true,
          title: 'Lain-lain (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          field: 'jmlhpotg',
          invisible: true,
          title: 'Jumlah Potongan (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          readonly: true,
          width: '120px',
        },
        {
          field: 'penyerahan',
          invisible: true,
          title: 'Diterima (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          readonly: true,
          width: '120px',
        },
      ],
      personalia: [
        'nik_pegawai',
        'nm_pegawai',
        'nm_dept',
        'ketptkp',
        'ptkp',
        'index1',
        'index2',
        'index3',
        'index4',
        'index5',
        'index6',
        'index7',
        'index8',
        'index9',
        'index10',
        'index11',
        'index12',
        'index13',
        'jmlhindex',
        'index14',
        'bruto1',
        'bruto2v1',
        'bruto2v2',
        'bruto2p',
        'bruto2',
        'bruto3v',
        'bruto3p',
        'bruto3',
        'bruto4v',
        'bruto4p',
        'bruto4',
        'bruto5',
        'premi1',
        'premi2p',
        'premi2',
        'premi3v',
        'premi3p',
        'premi3',
        'premi4v1',
        'premi4v2',
        'premi4p',
        'premi4',
        'jmlhpremi',
        'premi5',
        'diterima',
      ],
      pajak: [
        'nik_pegawai',
        'nm_pegawai',
        'pjk1',
        'pjk2',
        'pjk3',
        'pjk4',
        'pjk5',
        'pjk6',
        'pjk7',
        'pjk8',
        'pjk9',
        'pjk10',
        'pjk11',
        'pjk12',
        'pjk13',
        'pjk14',
        'pjk15',
      ],
      keuangan: [
        'nm_pegawai',
        'nik_pegawai',
        'diterima',
        'remunerasi',
        'panti',
        'koperasi',
        'kantor',
        'lainlain',
        'totalpotg',
        'penyerahan',
      ],
    }
  },
  computed: {
    ...mapState(['pendapatan']),
  },
  methods: {
    onChangeTab(val, tipe = this.tipe) {
      this.$refs.pendapatan.fields.forEach((field) => {
        if (tipe === 'personalia') {
          if (parseInt(val) === 1 && this.personalia.includes(field.name))
            field.invisible = false
          else if (parseInt(val) === 2 && this.pajak.includes(field.name))
            field.invisible = false
          else field.invisible = true
        }
        if (tipe === 'keuangan') {
          if (parseInt(val) === 1 && this.keuangan.includes(field.name))
            field.invisible = false
          else field.invisible = true
        }
      })
      this.$forceUpdate()
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
      row.pjk10 = -(nVal * moment(this.pendapatan.date).format('M'))
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
      row.jmlhpremi = row.premi1 + row.premi2 + row.premi3 + row.premi4
      row.premi5 = (row.jmlhpremi - row.premi3) * (2.5 / 100)
      row.diterima = row.jmlhpremi - row.premi5

      row.pjk2 = row.pjk2 - temp + row.jmlhpremi

      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.totalpotg =
        row.remunerasi + row.panti + row.koperasi + row.kantor + row.lainlain
      row.penyerahan = row.diterima + row.totalpotg
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
      row.jmlhpremi = row.premi1 + row.premi2 + row.premi3 + row.premi4
      row.premi5 = (row.jmlhpremi - row.premi3) * (2.5 / 100)
      row.diterima = row.jmlhpremi - row.premi5

      row.pjk2 = row.pjk2 - temp + row.jmlhpremi

      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.totalpotg =
        row.remunerasi + row.panti + row.koperasi + row.kantor + row.lainlain
      row.penyerahan = row.diterima + row.totalpotg
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
      row.jmlhpremi = row.premi1 + row.premi2 + row.premi3 + row.premi4
      row.premi5 = (row.jmlhpremi - row.premi3) * (2.5 / 100)
      row.diterima = row.jmlhpremi - row.premi5

      row.pjk2 = row.pjk2 - temp + row.jmlhpremi

      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.totalpotg =
        row.remunerasi + row.panti + row.koperasi + row.kantor + row.lainlain
      row.penyerahan = row.diterima + row.totalpotg
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
      row.jmlhpremi = row.premi1 + row.premi2 + row.premi3 + row.premi4
      row.premi5 = (row.jmlhpremi - row.premi3) * (2.5 / 100)
      row.diterima = row.jmlhpremi - row.premi5

      row.pjk2 = row.pjk2 - temp + row.jmlhpremi

      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.totalpotg =
        row.remunerasi + row.panti + row.koperasi + row.kantor + row.lainlain
      row.penyerahan = row.diterima + row.totalpotg
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
      row.jmlhpremi = row.premi1 + row.premi2 + row.premi3 + row.premi4
      row.premi5 = (row.jmlhpremi - row.premi3) * (2.5 / 100)
      row.diterima = row.jmlhpremi - row.premi5

      row.pjk2 = row.pjk2 - temp + row.jmlhpremi

      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.totalpotg =
        row.remunerasi + row.panti + row.koperasi + row.kantor + row.lainlain
      row.penyerahan = row.diterima + row.totalpotg
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
      row.jmlhpremi = row.premi1 + row.premi2 + row.premi3 + row.premi4
      row.premi5 = (row.jmlhpremi - row.premi3) * (2.5 / 100)
      row.diterima = row.jmlhpremi - row.premi5

      row.pjk2 = row.pjk2 - temp + row.jmlhpremi

      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.totalpotg =
        row.remunerasi + row.panti + row.koperasi + row.kantor + row.lainlain
      row.penyerahan = row.diterima + row.totalpotg
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
      row.jmlhpremi = row.premi1 + row.premi2 + row.premi3 + row.premi4
      row.premi5 = (row.jmlhpremi - row.premi3) * (2.5 / 100)
      row.diterima = row.jmlhpremi - row.premi5

      row.pjk2 = row.pjk2 - temp + row.jmlhpremi

      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.totalpotg =
        row.remunerasi + row.panti + row.koperasi + row.kantor + row.lainlain
      row.penyerahan = row.diterima + row.totalpotg
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
      row.jmlhpremi = row.premi1 + row.premi2 + row.premi3 + row.premi4
      row.premi5 = (row.jmlhpremi - row.premi3) * (2.5 / 100)
      row.diterima = row.jmlhpremi - row.premi5

      row.pjk2 = row.pjk2 - temp + row.jmlhpremi

      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.totalpotg =
        row.remunerasi + row.panti + row.koperasi + row.kantor + row.lainlain
      row.penyerahan = row.diterima + row.totalpotg
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
      row.jmlhpremi = row.premi1 + row.premi2 + row.premi3 + row.premi4
      row.premi5 = (row.jmlhpremi - row.premi3) * (2.5 / 100)
      row.diterima = row.jmlhpremi - row.premi5

      row.pjk2 = row.pjk2 - temp + row.jmlhpremi

      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.totalpotg =
        row.remunerasi + row.panti + row.koperasi + row.kantor + row.lainlain
      row.penyerahan = row.diterima + row.totalpotg
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
      row.jmlhpremi = row.premi1 + row.premi2 + row.premi3 + row.premi4
      row.premi5 = (row.jmlhpremi - row.premi3) * (2.5 / 100)
      row.diterima = row.jmlhpremi - row.premi5

      row.pjk2 = row.pjk2 - temp + row.jmlhpremi

      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.totalpotg =
        row.remunerasi + row.panti + row.koperasi + row.kantor + row.lainlain
      row.penyerahan = row.diterima + row.totalpotg
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
      row.jmlhpremi = row.premi1 + row.premi2 + row.premi3 + row.premi4
      row.premi5 = (row.jmlhpremi - row.premi3) * (2.5 / 100)
      row.diterima = row.jmlhpremi - row.premi5

      row.pjk2 = row.pjk2 - temp + row.jmlhpremi

      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.totalpotg =
        row.remunerasi + row.panti + row.koperasi + row.kantor + row.lainlain
      row.penyerahan = row.diterima + row.totalpotg
    },
    onChangeIndex13(nVal, oVal, row) {
      row.bruto1 = (row.jmlhindex / nVal) * row.index14
      row.bruto2 = -(row.bruto1 * (row.bruto2p / 100))
      row.bruto3 = -(row.bruto1 * (row.bruto3p / 100))
      row.bruto4 = -(row.bruto1 * (row.bruto4p / 100))

      row.premi1 =
        row.bruto1 + row.bruto2 + row.bruto3 + row.bruto4 + row.bruto5

      const temp = row.jmlhpremi
      row.jmlhpremi = row.premi1 + row.premi2 + row.premi3 + row.premi4
      row.premi5 = (row.jmlhpremi - row.premi3) * (2.5 / 100)
      row.diterima = row.jmlhpremi - row.premi5

      row.pjk2 = row.pjk2 - temp + row.jmlhpremi

      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.totalpotg =
        row.remunerasi + row.panti + row.koperasi + row.kantor + row.lainlain
      row.penyerahan = row.diterima + row.totalpotg
    },
    onChangeIndex14(nVal, oVal, row) {
      row.bruto1 = (row.jmlhindex / row.index13) * nVal
      row.bruto2 = -(row.bruto1 * (row.bruto2p / 100))
      row.bruto3 = -(row.bruto1 * (row.bruto3p / 100))
      row.bruto4 = -(row.bruto1 * (row.bruto4p / 100))

      row.premi1 =
        row.bruto1 + row.bruto2 + row.bruto3 + row.bruto4 + row.bruto5

      const temp = row.jmlhpremi
      row.jmlhpremi = row.premi1 + row.premi2 + row.premi3 + row.premi4
      row.premi5 = (row.jmlhpremi - row.premi3) * (2.5 / 100)
      row.diterima = row.jmlhpremi - row.premi5

      row.pjk2 = row.pjk2 - temp + row.jmlhpremi

      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.totalpotg =
        row.remunerasi + row.panti + row.koperasi + row.kantor + row.lainlain
      row.penyerahan = row.diterima + row.totalpotg
    },
    onChangeBruto2v1(nVal, oVal, row) {
      const p = nVal / row.bruto2v2
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
      row.jmlhpremi = row.premi1 + row.premi2 + row.premi3 + row.premi4
      row.premi5 = (row.jmlhpremi - row.premi3) * (2.5 / 100)
      row.diterima = row.jmlhpremi - row.premi5

      row.pjk2 = row.pjk2 - temp + row.jmlhpremi

      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.totalpotg =
        row.remunerasi + row.panti + row.koperasi + row.kantor + row.lainlain
      row.penyerahan = row.diterima + row.totalpotg
    },
    onChangeBruto2v2(nVal, oVal, row) {
      const p = row.bruto2v1 / nVal
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
      row.jmlhpremi = row.premi1 + row.premi2 + row.premi3 + row.premi4
      row.premi5 = (row.jmlhpremi - row.premi3) * (2.5 / 100)
      row.diterima = row.jmlhpremi - row.premi5

      row.pjk2 = row.pjk2 - temp + row.jmlhpremi

      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.totalpotg =
        row.remunerasi + row.panti + row.koperasi + row.kantor + row.lainlain
      row.penyerahan = row.diterima + row.totalpotg
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
      row.jmlhpremi = row.premi1 + row.premi2 + row.premi3 + row.premi4
      row.premi5 = (row.jmlhpremi - row.premi3) * (2.5 / 100)
      row.diterima = row.jmlhpremi - row.premi5

      row.pjk2 = row.pjk2 - temp + row.jmlhpremi

      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.totalpotg =
        row.remunerasi + row.panti + row.koperasi + row.kantor + row.lainlain
      row.penyerahan = row.diterima + row.totalpotg
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
      row.jmlhpremi = row.premi1 + row.premi2 + row.premi3 + row.premi4
      row.premi5 = (row.jmlhpremi - row.premi3) * (2.5 / 100)
      row.diterima = row.jmlhpremi - row.premi5

      row.pjk2 = row.pjk2 - temp + row.jmlhpremi

      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.totalpotg =
        row.remunerasi + row.panti + row.koperasi + row.kantor + row.lainlain
      row.penyerahan = row.diterima + row.totalpotg
    },
    onChangeBruto5(nVal, oVal, row) {
      row.premi1 =
        row.bruto1 + row.bruto2 + row.bruto3 + row.bruto4 + row.bruto5

      const temp = row.jmlhpremi
      row.jmlhpremi = row.premi1 + row.premi2 + row.premi3 + row.premi4
      row.premi5 = (row.jmlhpremi - row.premi3) * (2.5 / 100)
      row.diterima = row.jmlhpremi - row.premi5

      row.pjk2 = row.pjk2 - temp + row.jmlhpremi

      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.totalpotg =
        row.remunerasi + row.panti + row.koperasi + row.kantor + row.lainlain
      row.penyerahan = row.diterima + row.totalpotg
    },
    onChangePremi2(nVal, oVal, row) {
      const temp = row.jmlhpremi
      row.jmlhpremi = row.premi1 + nVal + row.premi3 + row.premi4
      row.premi5 = (row.jmlhpremi - row.premi3) * (2.5 / 100)
      row.diterima = row.jmlhpremi - row.premi5

      row.pjk2 = row.pjk2 - temp + row.jmlhpremi

      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.totalpotg =
        row.remunerasi + row.panti + row.koperasi + row.kantor + row.lainlain
      row.penyerahan = row.diterima + row.totalpotg
    },
    onChangePremi3v(nVal, oVal, row) {
      const temp = row.jmlhpremi
      const temp1 = row.premi3

      row.premi3 = nVal * row.premi3p

      row.jmlhpremi = row.premi1 + row.premi2 + row.premi3 + row.premi4
      row.premi5 = (row.jmlhpremi - row.premi3) * (2.5 / 100)
      row.diterima = row.jmlhpremi - row.premi5

      row.pjk2 = row.pjk2 - temp + row.jmlhpremi
      row.pjk6 = row.pjk6 + temp1 - row.premi3

      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.totalpotg =
        row.remunerasi + row.panti + row.koperasi + row.kantor + row.lainlain
      row.penyerahan = row.diterima + row.totalpotg
    },
    onChangePremi4v2(nVal, oVal, row) {
      const temp = row.jmlhpremi

      row.premi4 = nVal * row.premi4p

      row.jmlhpremi = row.premi1 + row.premi2 + row.premi3 + row.premi4
      row.premi5 = (row.jmlhpremi - row.premi3) * (2.5 / 100)
      row.diterima = row.jmlhpremi - row.premi5

      row.pjk2 = row.pjk2 - temp + row.jmlhpremi

      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.totalpotg =
        row.remunerasi + row.panti + row.koperasi + row.kantor + row.lainlain
      row.penyerahan = row.diterima + row.totalpotg
    },
    onChangeRemunerasi(nval, oval, row) {
      row.totalpotg =
        nval + row.panti + row.koperasi + row.kantor + row.lainlain
      row.penyerahan = row.diterima + row.totalpotg
    },
    onChangePanti(nval, oval, row) {
      row.totalpotg =
        row.remunerasi + nval + row.koperasi + row.kantor + row.lainlain
      row.penyerahan = row.diterima + row.totalpotg
    },
    onChangeKoperasi(nval, oval, row) {
      row.totalpotg =
        row.remunerasi + row.panti + nval + row.kantor + row.lainlain
      row.penyerahan = row.diterima + row.totalpotg
    },
    onChangeKantor(nval, oval, row) {
      row.totalpotg =
        row.remunerasi + row.panti + row.koperasi + nval + row.lainlain
      row.penyerahan = row.diterima + row.totalpotg
    },
    onChangeLainlain(nval, oval, row) {
      row.totalpotg =
        row.remunerasi + row.panti + row.koperasi + row.kantor + nval
      row.penyerahan = row.diterima + row.totalpotg
    },
  },
}
</script>
