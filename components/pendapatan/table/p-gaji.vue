<template>
  <div>
    <a-tabs type="card" size="small" @change="onChangeTab">
      <a-tab-pane key="1" tab="Pendapatan"> </a-tab-pane>
      <a-tab-pane key="2" tab="Pajak"> </a-tab-pane>
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
        {
          field: 'golongan',
          options: [
            'IA',
            'IB',
            'IC',
            'IIA',
            'IIB',
            'IIC',
            'IID',
            'IIIA',
            'IIIB',
            'IIIC',
            'IIID',
            'IVA',
          ],
          title: 'Golongan',
          type: 'select',
        },
        {
          field: 'ketptkp',
          options: ['K/0', 'K/1', 'K/2', 'K/3', 'K/4', 'K/5', 'TK/0'],
          title: 'Ket. PTKP',
          type: 'select',
        },
        {
          field: 'ptkp',
          title: 'PTKP (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          field: 'masaker',
          title: 'Masa Kerja',
          validate: this.validMasaKerja,
        },
        {
          change: this.onChangePdpt1,
          field: 'pdpt1',
          title: '01. Gaji Pokok (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          title: '02. Tunj. Trans (%)',
          field: 'pdpt2p',
          type: 'number',
          width: '120px',
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePdpt2p,
        },
        {
          title: '02. Tunj. Trans (Rp)',
          field: 'pdpt2',
          type: 'number',
          width: '120px',
          readonly: true,
          toText: this.numToCur,
          toValue: this.numToVal,
        },
        {
          title: '03. Tunj. HT (%)',
          field: 'pdpt3p',
          type: 'number',
          width: '120px',
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePdpt3p,
        },
        {
          title: '03. Tunj. HT (Rp)',
          field: 'pdpt3',
          type: 'number',
          width: '120px',
          readonly: true,
          toText: this.numToCur,
          toValue: this.numToVal,
        },
        {
          title: '04. Tunj. Fungsional (Rp)',
          field: 'pdpt4',
          type: 'number',
          width: '120px',
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePdpt4,
        },
        {
          title: '05. Tunj. Jabatan (Rp)',
          field: 'pdpt5',
          type: 'number',
          width: '120px',
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePdpt5,
        },
        {
          title: '06. (Rp)',
          field: 'pdpt6',
          type: 'number',
          width: '120px',
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePdpt6,
        },
        {
          title: '07. (Rp)',
          field: 'pdpt7',
          type: 'number',
          width: '120px',
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePdpt7,
        },
        {
          title: '08. TPP (Rp)',
          field: 'pdpt8',
          type: 'number',
          width: '120px',
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePdpt8,
        },
        {
          title: '09. (Rp)',
          field: 'pdpt9',
          type: 'number',
          width: '120px',
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePdpt9,
        },
        {
          title: '10. (Rp)',
          field: 'pdpt10',
          type: 'number',
          width: '120px',
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePdpt10,
        },
        {
          title: '11. (Rp)',
          field: 'pdpt11',
          type: 'number',
          width: '120px',
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePdpt11,
        },
        {
          title: '12. Lain-lain (Rp)',
          field: 'pdpt12',
          type: 'number',
          width: '120px',
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePdpt12,
        },
        {
          title: 'Jum. Penerimaan (Rp)',
          field: 'jmlhgaji',
          type: 'number',
          width: '120px',
          readonly: true,
          toText: this.numToCur,
          toValue: this.numToVal,
        },
        {
          title: '01. PPH 21 (5%)(Rp)',
          field: 'pot1',
          type: 'number',
          width: '120px',
          readonly: true,
          toText: this.numToCur,
          toValue: this.numToVal,
        },
        {
          title: '02. (%)',
          field: 'pot2p',
          type: 'number',
          width: '120px',
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePot2p,
        },
        {
          title: '02. (Rp)',
          field: 'pot2',
          type: 'number',
          width: '120px',
          readonly: true,
          toText: this.numToCur,
          toValue: this.numToVal,
        },
        {
          title: '03. Tab. HT (%)',
          field: 'pot3p',
          type: 'number',
          width: '120px',
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePot3p,
        },
        {
          title: '03. Tab. HT (Rp)',
          field: 'pot3',
          type: 'number',
          width: '120px',
          readonly: true,
          toText: this.numToCur,
          toValue: this.numToVal,
        },
        {
          title: '04. Sosial (Rp)',
          field: 'pot4',
          type: 'number',
          width: '120px',
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePot4,
        },
        {
          title: '05. Obat-obatan (Rp)',
          field: 'pot5',
          type: 'number',
          width: '120px',
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePot5,
        },
        {
          title: '06. PPNI (Rp)',
          field: 'pot6',
          type: 'number',
          width: '120px',
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePot6,
        },
        {
          title: '07. BPJS Kesehatan (Rp)',
          field: 'pot7',
          type: 'number',
          width: '120px',
          readonly: true,
          toText: this.numToCur,
          toValue: this.numToVal,
        },
        {
          title: '08. BPJS T. Kerja (Rp)',
          field: 'pot8',
          type: 'number',
          width: '120px',
          readonly: true,
          toText: this.numToCur,
          toValue: this.numToVal,
        },
        {
          title: '09. IBI (Rp)',
          field: 'pot9',
          type: 'number',
          width: '120px',
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePot9,
        },
        {
          field: 'pot10',
          readonly: true,
          title: '10. Subsidi Pajak (Rp)',
          type: 'number',
          toText: this.numToCur,
          toValue: this.numToVal,
          width: '120px',
        },
        {
          field: 'jmlhpot',
          readonly: true,
          title: 'Jum. Pengeluaran (Rp)',
          type: 'number',
          toText: this.numToCur,
          toValue: this.numToVal,
          width: '120px',
        },
        {
          title: 'Sebelum Zakat (Rp)',
          field: 'sebelumzakat',
          type: 'number',
          width: '120px',
          toText: this.numToCur,
          toValue: this.numToVal,
        },
        {
          title: '11. Zakat (2.5%) (Rp)',
          field: 'pot11',
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
      ],
      columnAll: ['NIK', 'Nama'],
    }
  },
  computed: {
    ...mapState(['pendapatan']),
  },
  methods: {
    onChangeTab(val) {
      this.$refs.pendapatan.fields.forEach((field) => {
        if (this.columnAll.includes(field.label)) return
        if (parseInt(val) === 1 && !field.name.includes('pjk'))
          field.invisible = false
        else if (parseInt(val) === 2 && field.name.includes('pjk'))
          field.invisible = false
        else field.invisible = true
      })

      this.$forceUpdate()
    },
    numToCur(val) {
      return parseFloat(val || 0)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    },
    numToDig(val) {
      if (val) {
        return val.replace(/^(..)(..)$/, '$1:$2')
      }
      return '00:00'
    },
    numToVal(text) {
      return Number(text.replace(/[^0-9.-]+/g, ''))
    },
    depToLis(val) {
      return val.join('\n')
    },
    validMasaKerja(content, oldContent, record, field) {
      if (content === '') return ''
      if (!/^[0-9]{2}:[0-9]{2}$/.test(content)) return 'Invalid Format (XX:XX)'
      return '' // return empty string if there is no error
    },
    onChangePdpt1(nVal, oVal, row) {
      row.pdpt2 = (nVal * row.pdpt2p) / 100
      row.pdpt3 = (nVal * row.pdpt3p) / 100

      const temp = row.jmlhgaji

      row.jmlhgaji =
        nVal +
        row.pdpt2 +
        row.pdpt3 +
        row.pdpt4 +
        row.pdpt5 +
        row.pdpt6 +
        row.pdpt7 +
        row.pdpt8 +
        row.pdpt9 +
        row.pdpt10 +
        row.pdpt11 +
        row.pdpt12

      row.pjk3 = row.pjk3 - temp + row.jmlhgaji
      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk8 = -(row.pjk3 * 0.05)
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.pot1 = -row.pjk15
      row.pot2 = -(nVal * row.pot2p) / 100
      row.pot3 = -(nVal * row.pot3p) / 100
      const bpjs = -((row.jmlhgaji - row.pdpt3) * 0.96) / 100
      row.pot7 = bpjs
      row.pot8 = bpjs
      row.pot10 = row.pjk15

      row.jmlhpot =
        row.pot1 +
        row.pot2 +
        row.pot3 +
        row.pot4 +
        row.pot5 +
        row.pot6 +
        row.pot7 +
        row.pot8 +
        row.pot9 +
        row.pot10

      row.sebelumzakat = row.jmlhgaji + row.jmlhpot
      row.pot11 = -(row.sebelumzakat * 2.5) / 100
      row.diterima = row.sebelumzakat + row.pot11
    },
    onChangePdpt2p(nVal, oVal, row) {
      row.pdpt2 = (nVal * row.pdpt1) / 100

      const temp = row.jmlhgaji

      row.jmlhgaji =
        row.pdpt1 +
        row.pdpt2 +
        row.pdpt3 +
        row.pdpt4 +
        row.pdpt5 +
        row.pdpt6 +
        row.pdpt7 +
        row.pdpt8 +
        row.pdpt9 +
        row.pdpt10 +
        row.pdpt11 +
        row.pdpt12

      row.pjk3 = row.pjk3 - temp + row.jmlhgaji
      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk8 = -(row.pjk3 * 0.05)
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.pot1 = -row.pjk15
      const bpjs = -((row.jmlhgaji - row.pdpt3) * 0.96) / 100
      row.pot7 = bpjs
      row.pot8 = bpjs
      row.pot10 = row.pjk15

      row.jmlhpot =
        row.pot1 +
        row.pot2 +
        row.pot3 +
        row.pot4 +
        row.pot5 +
        row.pot6 +
        row.pot7 +
        row.pot8 +
        row.pot9 +
        row.pot10

      row.sebelumzakat = row.jmlhgaji + row.jmlhpot
      row.pot11 = -(row.sebelumzakat * 2.5) / 100
      row.diterima = row.sebelumzakat + row.pot11
    },
    onChangePdpt3p(nVal, oVal, row) {
      row.pdpt3 = (nVal * row.pdpt1) / 100

      const temp = row.jmlhgaji

      row.jmlhgaji =
        row.pdpt1 +
        row.pdpt2 +
        row.pdpt3 +
        row.pdpt4 +
        row.pdpt5 +
        row.pdpt6 +
        row.pdpt7 +
        row.pdpt8 +
        row.pdpt9 +
        row.pdpt10 +
        row.pdpt11 +
        row.pdpt12

      row.pjk3 = row.pjk3 - temp + row.jmlhgaji
      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk8 = -(row.pjk3 * 0.05)
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.pot1 = -row.pjk15
      const bpjs = -((row.jmlhgaji - row.pdpt3) * 0.96) / 100
      row.pot7 = bpjs
      row.pot8 = bpjs
      row.pot10 = row.pjk15

      row.jmlhpot =
        row.pot1 +
        row.pot2 +
        row.pot3 +
        row.pot4 +
        row.pot5 +
        row.pot6 +
        row.pot7 +
        row.pot8 +
        row.pot9 +
        row.pot10

      row.sebelumzakat = row.jmlhgaji + row.jmlhpot
      row.pot11 = -(row.sebelumzakat * 2.5) / 100
      row.diterima = row.sebelumzakat + row.pot11
    },
    onChangePdpt4(nVal, oVal, row) {
      const temp = row.jmlhgaji

      row.jmlhgaji =
        row.pdpt1 +
        row.pdpt2 +
        row.pdpt3 +
        nVal +
        row.pdpt5 +
        row.pdpt6 +
        row.pdpt7 +
        row.pdpt8 +
        row.pdpt9 +
        row.pdpt10 +
        row.pdpt11 +
        row.pdpt12

      row.pjk3 = row.pjk3 - temp + row.jmlhgaji
      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk8 = -(row.pjk3 * 0.05)
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.pot1 = -row.pjk15
      const bpjs = -((row.jmlhgaji - row.pdpt3) * 0.96) / 100
      row.pot7 = bpjs
      row.pot8 = bpjs
      row.pot10 = row.pjk15

      row.jmlhpot =
        row.pot1 +
        row.pot2 +
        row.pot3 +
        row.pot4 +
        row.pot5 +
        row.pot6 +
        row.pot7 +
        row.pot8 +
        row.pot9 +
        row.pot10

      row.sebelumzakat = row.jmlhgaji + row.jmlhpot
      row.pot11 = -(row.sebelumzakat * 2.5) / 100
      row.diterima = row.sebelumzakat + row.pot11
    },
    onChangePdpt5(nVal, oVal, row) {
      const temp = row.jmlhgaji

      row.jmlhgaji =
        row.pdpt1 +
        row.pdpt2 +
        row.pdpt3 +
        row.pdpt4 +
        nVal +
        row.pdpt6 +
        row.pdpt7 +
        row.pdpt8 +
        row.pdpt9 +
        row.pdpt10 +
        row.pdpt11 +
        row.pdpt12

      row.pjk3 = row.pjk3 - temp + row.jmlhgaji
      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk8 = -(row.pjk3 * 0.05)
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.pot1 = -row.pjk15
      const bpjs = -((row.jmlhgaji - row.pdpt3) * 0.96) / 100
      row.pot7 = bpjs
      row.pot8 = bpjs
      row.pot10 = row.pjk15

      row.jmlhpot =
        row.pot1 +
        row.pot2 +
        row.pot3 +
        row.pot4 +
        row.pot5 +
        row.pot6 +
        row.pot7 +
        row.pot8 +
        row.pot9 +
        row.pot10

      row.sebelumzakat = row.jmlhgaji + row.jmlhpot
      row.pot11 = -(row.sebelumzakat * 2.5) / 100
      row.diterima = row.sebelumzakat + row.pot11
    },
    onChangePdpt6(nVal, oVal, row) {
      const temp = row.jmlhgaji

      row.jmlhgaji =
        row.pdpt1 +
        row.pdpt2 +
        row.pdpt3 +
        row.pdpt4 +
        row.pdpt5 +
        nVal +
        row.pdpt7 +
        row.pdpt8 +
        row.pdpt9 +
        row.pdpt10 +
        row.pdpt11 +
        row.pdpt12

      row.pjk3 = row.pjk3 - temp + row.jmlhgaji
      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk8 = -(row.pjk3 * 0.05)
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.pot1 = -row.pjk15
      const bpjs = -((row.jmlhgaji - row.pdpt3) * 0.96) / 100
      row.pot7 = bpjs
      row.pot8 = bpjs
      row.pot10 = row.pjk15

      row.jmlhpot =
        row.pot1 +
        row.pot2 +
        row.pot3 +
        row.pot4 +
        row.pot5 +
        row.pot6 +
        row.pot7 +
        row.pot8 +
        row.pot9 +
        row.pot10

      row.sebelumzakat = row.jmlhgaji + row.jmlhpot
      row.pot11 = -(row.sebelumzakat * 2.5) / 100
      row.diterima = row.sebelumzakat + row.pot11
    },
    onChangePdpt7(nVal, oVal, row) {
      const temp = row.jmlhgaji

      row.jmlhgaji =
        row.pdpt1 +
        row.pdpt2 +
        row.pdpt3 +
        row.pdpt4 +
        row.pdpt5 +
        row.pdpt6 +
        nVal +
        row.pdpt8 +
        row.pdpt9 +
        row.pdpt10 +
        row.pdpt11 +
        row.pdpt12

      row.pjk3 = row.pjk3 - temp + row.jmlhgaji
      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk8 = -(row.pjk3 * 0.05)
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.pot1 = -row.pjk15
      const bpjs = -((row.jmlhgaji - row.pdpt3) * 0.96) / 100
      row.pot7 = bpjs
      row.pot8 = bpjs
      row.pot10 = row.pjk15

      row.jmlhpot =
        row.pot1 +
        row.pot2 +
        row.pot3 +
        row.pot4 +
        row.pot5 +
        row.pot6 +
        row.pot7 +
        row.pot8 +
        row.pot9 +
        row.pot10

      row.sebelumzakat = row.jmlhgaji + row.jmlhpot
      row.pot11 = -(row.sebelumzakat * 2.5) / 100
      row.diterima = row.sebelumzakat + row.pot11
    },
    onChangePdpt8(nVal, oVal, row) {
      const temp = row.jmlhgaji

      row.jmlhgaji =
        row.pdpt1 +
        row.pdpt2 +
        row.pdpt3 +
        row.pdpt4 +
        row.pdpt5 +
        row.pdpt6 +
        row.pdpt7 +
        nVal +
        row.pdpt9 +
        row.pdpt10 +
        row.pdpt11 +
        row.pdpt12

      row.pjk3 = row.pjk3 - temp + row.jmlhgaji
      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk8 = -(row.pjk3 * 0.05)
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.pot1 = -row.pjk15
      const bpjs = -((row.jmlhgaji - row.pdpt3) * 0.96) / 100
      row.pot7 = bpjs
      row.pot8 = bpjs
      row.pot10 = row.pjk15

      row.jmlhpot =
        row.pot1 +
        row.pot2 +
        row.pot3 +
        row.pot4 +
        row.pot5 +
        row.pot6 +
        row.pot7 +
        row.pot8 +
        row.pot9 +
        row.pot10

      row.sebelumzakat = row.jmlhgaji + row.jmlhpot
      row.pot11 = -(row.sebelumzakat * 2.5) / 100
      row.diterima = row.sebelumzakat + row.pot11
    },
    onChangePdpt9(nVal, oVal, row) {
      const temp = row.jmlhgaji

      row.jmlhgaji =
        row.pdpt1 +
        row.pdpt2 +
        row.pdpt3 +
        row.pdpt4 +
        row.pdpt5 +
        row.pdpt6 +
        row.pdpt7 +
        row.pdpt8 +
        nVal +
        row.pdpt10 +
        row.pdpt11 +
        row.pdpt12

      row.pjk3 = row.pjk3 - temp + row.jmlhgaji
      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk8 = -(row.pjk3 * 0.05)
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.pot1 = -row.pjk15
      const bpjs = -((row.jmlhgaji - row.pdpt3) * 0.96) / 100
      row.pot7 = bpjs
      row.pot8 = bpjs
      row.pot10 = row.pjk15

      row.jmlhpot =
        row.pot1 +
        row.pot2 +
        row.pot3 +
        row.pot4 +
        row.pot5 +
        row.pot6 +
        row.pot7 +
        row.pot8 +
        row.pot9 +
        row.pot10

      row.sebelumzakat = row.jmlhgaji + row.jmlhpot
      row.pot11 = -(row.sebelumzakat * 2.5) / 100
      row.diterima = row.sebelumzakat + row.pot11
    },
    onChangePdpt10(nVal, oVal, row) {
      const temp = row.jmlhgaji

      row.jmlhgaji =
        row.pdpt1 +
        row.pdpt2 +
        row.pdpt3 +
        row.pdpt4 +
        row.pdpt5 +
        row.pdpt6 +
        row.pdpt7 +
        row.pdpt8 +
        row.pdpt9 +
        nVal +
        row.pdpt11 +
        row.pdpt12

      row.pjk3 = row.pjk3 - temp + row.jmlhgaji
      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk8 = -(row.pjk3 * 0.05)
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.pot1 = -row.pjk15
      const bpjs = -((row.jmlhgaji - row.pdpt3) * 0.96) / 100
      row.pot7 = bpjs
      row.pot8 = bpjs
      row.pot10 = row.pjk15

      row.jmlhpot =
        row.pot1 +
        row.pot2 +
        row.pot3 +
        row.pot4 +
        row.pot5 +
        row.pot6 +
        row.pot7 +
        row.pot8 +
        row.pot9 +
        row.pot10

      row.sebelumzakat = row.jmlhgaji + row.jmlhpot
      row.pot11 = -(row.sebelumzakat * 2.5) / 100
      row.diterima = row.sebelumzakat + row.pot11
    },
    onChangePdpt11(nVal, oVal, row) {
      const temp = row.jmlhgaji

      row.jmlhgaji =
        row.pdpt1 +
        row.pdpt2 +
        row.pdpt3 +
        row.pdpt4 +
        row.pdpt5 +
        row.pdpt6 +
        row.pdpt7 +
        row.pdpt8 +
        row.pdpt9 +
        row.pdpt10 +
        nVal +
        row.pdpt12

      row.pjk3 = row.pjk3 - temp + row.jmlhgaji
      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk8 = -(row.pjk3 * 0.05)
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.pot1 = -row.pjk15
      const bpjs = -((row.jmlhgaji - row.pdpt3) * 0.96) / 100
      row.pot7 = bpjs
      row.pot8 = bpjs
      row.pot10 = row.pjk15

      row.jmlhpot =
        row.pot1 +
        row.pot2 +
        row.pot3 +
        row.pot4 +
        row.pot5 +
        row.pot6 +
        row.pot7 +
        row.pot8 +
        row.pot9 +
        row.pot10

      row.sebelumzakat = row.jmlhgaji + row.jmlhpot
      row.pot11 = -(row.sebelumzakat * 2.5) / 100
      row.diterima = row.sebelumzakat + row.pot11
    },
    onChangePdpt12(nVal, oVal, row) {
      const temp = row.jmlhgaji

      row.jmlhgaji =
        row.pdpt1 +
        row.pdpt2 +
        row.pdpt3 +
        row.pdpt4 +
        row.pdpt5 +
        row.pdpt6 +
        row.pdpt7 +
        row.pdpt8 +
        row.pdpt9 +
        row.pdpt10 +
        row.pdpt11 +
        nVal

      row.pjk3 = row.pjk3 - temp + row.jmlhgaji
      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk8 = -(row.pjk3 * 0.05)
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.pot1 = -row.pjk15
      const bpjs = -((row.jmlhgaji - row.pdpt3) * 0.96) / 100
      row.pot7 = bpjs
      row.pot8 = bpjs
      row.pot10 = row.pjk15

      row.jmlhpot =
        row.pot1 +
        row.pot2 +
        row.pot3 +
        row.pot4 +
        row.pot5 +
        row.pot6 +
        row.pot7 +
        row.pot8 +
        row.pot9 +
        row.pot10

      row.sebelumzakat = row.jmlhgaji + row.jmlhpot
      row.pot11 = -(row.sebelumzakat * 2.5) / 100
      row.diterima = row.sebelumzakat + row.pot11
    },
    onChangePot2p(nVal, oVal, row) {
      row.pot2 = -((nVal * row.pdpt1) / 100)

      row.jmlhpot =
        row.pot1 +
        row.pot2 +
        row.pot3 +
        row.pot4 +
        row.pot5 +
        row.pot6 +
        row.pot7 +
        row.pot8 +
        row.pot9 +
        row.pot10

      row.sebelumzakat = row.jmlhgaji + row.jmlhpot
      row.pot11 = -(row.sebelumzakat * 2.5) / 100
      row.diterima = row.sebelumzakat + row.pot11
    },
    onChangePot3p(nVal, oVal, row) {
      row.pot3 = -((nVal * row.pdpt1) / 100)

      row.jmlhpot =
        row.pot1 +
        row.pot2 +
        row.pot3 +
        row.pot4 +
        row.pot5 +
        row.pot6 +
        row.pot7 +
        row.pot8 +
        row.pot9 +
        row.pot10

      row.sebelumzakat = row.jmlhgaji + row.jmlhpot
      row.pot11 = -(row.sebelumzakat * 2.5) / 100
      row.diterima = row.sebelumzakat + row.pot11
    },
    onChangePot4(nVal, oVal, row) {
      row.jmlhpot =
        row.pot1 +
        row.pot2 +
        row.pot3 +
        nVal +
        row.pot5 +
        row.pot6 +
        row.pot7 +
        row.pot8 +
        row.pot9 +
        row.pot10

      row.sebelumzakat = row.jmlhgaji + row.jmlhpot
      row.pot11 = -(row.sebelumzakat * 2.5) / 100
      row.diterima = row.sebelumzakat + row.pot11
    },
    onChangePot5(nVal, oVal, row) {
      row.jmlhpot =
        row.pot1 +
        row.pot2 +
        row.pot3 +
        row.pot4 +
        nVal +
        row.pot6 +
        row.pot7 +
        row.pot8 +
        row.pot9 +
        row.pot10

      row.sebelumzakat = row.jmlhgaji + row.jmlhpot
      row.pot11 = -(row.sebelumzakat * 2.5) / 100
      row.diterima = row.sebelumzakat + row.pot11
    },
    onChangePot6(nVal, oVal, row) {
      row.jmlhpot =
        row.pot1 +
        row.pot2 +
        row.pot3 +
        row.pot4 +
        row.pot5 +
        nVal +
        row.pot7 +
        row.pot8 +
        row.pot9 +
        row.pot10

      row.sebelumzakat = row.jmlhgaji + row.jmlhpot
      row.pot11 = -(row.sebelumzakat * 2.5) / 100
      row.diterima = row.sebelumzakat + row.pot11
    },
    onChangePot9(nVal, oVal, row) {
      row.jmlhpot =
        row.pot1 +
        row.pot2 +
        row.pot3 +
        row.pot4 +
        row.pot5 +
        row.pot6 +
        row.pot7 +
        row.pot8 +
        nVal +
        row.pot10

      row.sebelumzakat = row.jmlhgaji + row.jmlhpot
      row.pot11 = -(row.sebelumzakat * 2.5) / 100
      row.diterima = row.sebelumzakat + row.pot11
    },
  },
}
</script>
