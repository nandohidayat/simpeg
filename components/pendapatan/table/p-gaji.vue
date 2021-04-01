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
        :field="c.dataIndex"
        :init-style="c.initStyle"
        :invisible="c.invisible"
        :label="c.title"
        :options="c.options"
        :readonly="c.readonly"
        :sticky="c.sticky"
        :type="c.type"
        :width="c.width"
        :to-text="c.toText"
        :to-value="c.toValue"
        :validate="c.validate"
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
          title: 'NIK',
          dataIndex: 'nik_pegawai',
          sticky: true,
          width: '70px',
          readonly: true,
        },
        {
          title: 'Nama',
          dataIndex: 'nm_pegawai',
          sticky: true,
          width: '170px',
          readonly: true,
        },
        {
          title: 'Bagian',
          dataIndex: 'nm_dept',
          width: '170px',
          initStyle: { 'white-space': 'pre' },
          readonly: true,
          toText: this.depToLis,
        },
        {
          title: 'Golongan',
          dataIndex: 'golongan',
          type: 'select',
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
        },
        {
          title: 'Ket. PTKP',
          dataIndex: 'ketptkp',
          type: 'select',
          options: ['K/0', 'K/1', 'K/2', 'K/3', 'K/4', 'K/5', 'TK/0'],
        },
        {
          title: 'PTKP (Rp)',
          dataIndex: 'ptkp',
          type: 'number',
          width: '120px',
          toText: this.numToCur,
          toValue: this.numToVal,
        },
        {
          title: 'Masa Kerja',
          dataIndex: 'masaker',
          validate: this.validMasaKerja,
        },
        {
          title: '01. Gaji Pokok (Rp)',
          dataIndex: 'pdpt1',
          type: 'number',
          width: '120px',
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePdpt1,
        },
        {
          title: '02. Tunj. Trans (%)',
          dataIndex: 'pdpt2p',
          type: 'number',
          width: '120px',
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePdpt2p,
        },
        {
          title: '02. Tunj. Trans (Rp)',
          dataIndex: 'pdpt2',
          type: 'number',
          width: '120px',
          readonly: true,
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePdpt2,
        },
        {
          title: '03. Tunj. HT (%)',
          dataIndex: 'pdpt3p',
          type: 'number',
          width: '120px',
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePdpt3p,
        },
        {
          title: '03. Tunj. HT (Rp)',
          dataIndex: 'pdpt3',
          type: 'number',
          width: '120px',
          readonly: true,
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePdpt3,
        },
        {
          title: '04. Tunj. Fungsional (Rp)',
          dataIndex: 'pdpt4',
          type: 'number',
          width: '120px',
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePdpt4,
        },
        {
          title: '05. Tunj. Jabatan (Rp)',
          dataIndex: 'pdpt5',
          type: 'number',
          width: '120px',
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePdpt5,
        },
        {
          title: '06. (Rp)',
          dataIndex: 'pdpt6',
          type: 'number',
          width: '120px',
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePdpt6,
        },
        {
          title: '07. (Rp)',
          dataIndex: 'pdpt7',
          type: 'number',
          width: '120px',
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePdpt7,
        },
        {
          title: '08. TPP (Rp)',
          dataIndex: 'pdpt8',
          type: 'number',
          width: '120px',
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePdpt8,
        },
        {
          title: '09. (Rp)',
          dataIndex: 'pdpt9',
          type: 'number',
          width: '120px',
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePdpt9,
        },
        {
          title: '10. (Rp)',
          dataIndex: 'pdpt10',
          type: 'number',
          width: '120px',
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePdpt10,
        },
        {
          title: '11. (Rp)',
          dataIndex: 'pdpt11',
          type: 'number',
          width: '120px',
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePdpt11,
        },
        {
          title: '12. Lain-lain (Rp)',
          dataIndex: 'pdpt12',
          type: 'number',
          width: '120px',
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePdpt12,
        },
        {
          title: 'Jum. Penerimaan (Rp)',
          dataIndex: 'jmlhgaji',
          type: 'number',
          width: '120px',
          readonly: true,
          toText: this.numToCur,
          toValue: this.numToVal,
        },
        {
          title: '01. PPH 21 (%)',
          dataIndex: 'pot1p',
          type: 'number',
          width: '120px',
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePot1p,
        },
        {
          title: '01. PPH 21 (Rp)',
          dataIndex: 'pot1',
          type: 'number',
          width: '120px',
          readonly: true,
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePot1,
        },
        {
          title: '02. (%)',
          dataIndex: 'pot2p',
          type: 'number',
          width: '120px',
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePot2p,
        },
        {
          title: '02. (Rp)',
          dataIndex: 'pot2',
          type: 'number',
          width: '120px',
          readonly: true,
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePot2,
        },
        {
          title: '03. Tab. HT (%)',
          dataIndex: 'pot3p',
          type: 'number',
          width: '120px',
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePot3p,
        },
        {
          title: '03. Tab. HT (Rp)',
          dataIndex: 'pot3',
          type: 'number',
          width: '120px',
          readonly: true,
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePot3,
        },
        {
          title: '04. Sosial (Rp)',
          dataIndex: 'pot4',
          type: 'number',
          width: '120px',
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePot4,
        },
        {
          title: '05. Obat-obatan (Rp)',
          dataIndex: 'pot5',
          type: 'number',
          width: '120px',
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePot5,
        },
        {
          title: '06. PPNI (Rp)',
          dataIndex: 'pot6',
          type: 'number',
          width: '120px',
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePot6,
        },
        {
          title: '07. BPJS Kesehatan (Rp)',
          dataIndex: 'pot7',
          type: 'number',
          width: '120px',
          readonly: true,
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePot7,
        },
        {
          title: '08. BPJS T. Kerja (Rp)',
          dataIndex: 'pot8',
          type: 'number',
          width: '120px',
          readonly: true,
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePot8,
        },
        {
          title: '09. IBI (Rp)',
          dataIndex: 'pot9',
          type: 'number',
          width: '120px',
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePot9,
        },
        {
          title: '10. Subsidi Pajak (Rp)',
          dataIndex: 'pot10',
          type: 'number',
          width: '120px',
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePot10,
        },
        {
          title: 'Jum. Pengeluaran (Rp)',
          dataIndex: 'jmlhpot',
          type: 'number',
          width: '120px',
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePengeluaran,
        },
        {
          title: 'Sebelum Zakat (Rp)',
          dataIndex: 'sebelumzakat',
          type: 'number',
          width: '120px',
          toText: this.numToCur,
          toValue: this.numToVal,
        },
        {
          title: '11. Zakat (2.5%) (Rp)',
          dataIndex: 'pot11',
          type: 'number',
          width: '120px',
          readonly: true,
          toText: this.numToCur,
          toValue: this.numToVal,
        },
        {
          title: 'Diterima Bersih (Rp)',
          dataIndex: 'diterima',
          type: 'number',
          width: '120px',
          readonly: true,
          toText: this.numToCur,
          toValue: this.numToVal,
        },
        {
          title: 'Penerimaan Lalu (Rp)',
          dataIndex: 'pjk1',
          type: 'number',
          width: '120px',
          invisible: true,
          toText: this.numToCur,
          toValue: this.numToVal,
        },
        {
          title: 'Premi/ Lbr/ Mkn/ Hdr (Rp)',
          dataIndex: 'jmlhpremi',
          type: 'number',
          width: '120px',
          invisible: true,
          toText: this.numToCur,
          toValue: this.numToVal,
        },
        {
          title: 'Gaji (Rp)',
          dataIndex: 'jmlhgaji',
          type: 'number',
          width: '120px',
          invisible: true,
          toText: this.numToCur,
          toValue: this.numToVal,
        },
        {
          title: 'Insentiv (Rp)',
          dataIndex: 'jmlhinsentive',
          type: 'number',
          width: '120px',
          invisible: true,
          toText: this.numToCur,
          toValue: this.numToVal,
        },
        {
          title: 'THR/ Gaji ke/ Jaspr (Rp)',
          dataIndex: 'jmlhgajike',
          type: 'number',
          width: '120px',
          invisible: true,
          toText: this.numToCur,
          toValue: this.numToVal,
        },
        {
          title: 'Makan (Rp)',
          dataIndex: 'premi3',
          type: 'number',
          width: '120px',
          invisible: true,
          toText: this.numToCur,
          toValue: this.numToVal,
        },
        {
          title: 'Penerimaan Netto (Rp)',
          dataIndex: 'pjk2',
          type: 'number',
          width: '120px',
          invisible: true,
          toText: this.numToCur,
          toValue: this.numToVal,
        },
        {
          title: 'Biaya THT (5%) (Rp)',
          dataIndex: 'pjk3',
          type: 'number',
          width: '120px',
          invisible: true,
          toText: this.numToCur,
          toValue: this.numToVal,
        },
        {
          title: 'Biaya Jabatan (5%) (Rp)',
          dataIndex: 'pjk4',
          type: 'number',
          width: '120px',
          invisible: true,
          toText: this.numToCur,
          toValue: this.numToVal,
        },
        {
          title: 'P. Tidak Kena Pajak (Rp)',
          dataIndex: 'ptkp',
          type: 'number',
          width: '120px',
          invisible: true,
          toText: this.numToCur,
          toValue: this.numToVal,
        },
        {
          title: 'P. Kena Pajak (Rp)',
          dataIndex: 'pjk5',
          type: 'number',
          width: '120px',
          invisible: true,
          toText: this.numToCur,
          toValue: this.numToVal,
        },
        {
          title: 'Pajak Terhutang (Rp)',
          dataIndex: 'pot1',
          type: 'number',
          width: '120px',
          invisible: true,
          toText: this.numToCur,
          toValue: this.numToVal,
        },
        {
          title: 'Pajak Sudah Dibayar (Rp)',
          dataIndex: 'pjk6',
          type: 'number',
          width: '120px',
          invisible: true,
          toText: this.numToCur,
          toValue: this.numToVal,
        },
        {
          title: 'Subsidi Pajak (Rp)',
          dataIndex: 'pot10',
          type: 'number',
          width: '120px',
          invisible: true,
          toText: this.numToCur,
          toValue: this.numToVal,
        },
        {
          title: 'Pajak Kurang Bayar (Rp)',
          dataIndex: 'pjk7',
          type: 'number',
          width: '120px',
          invisible: true,
          toText: this.numToCur,
          toValue: this.numToVal,
        },
      ],
      columnAll: ['NIK', 'Nama'],
      columnPajak: [
        'Penerimaan Lalu (Rp)',
        'Premi/ Lbr/ Mkn/ Hdr (Rp)',
        'Gaji (Rp)',
        'Insentiv (Rp)',
        'THR/ Gaji ke/ Jaspr (Rp)',
        'Makan (Rp)',
        'Penerimaan Netto (Rp)',
        'Biaya THT (5%) (Rp)',
        'Biaya Jabatan (5%) (Rp)',
        'P. Tidak Kena Pajak (Rp)',
        'P. Kena Pajak (Rp)',
        'Pajak Terhutang (Rp)',
        'Pajak Sudah Dibayar (Rp)',
        'Subsidi Pajak (Rp)',
        'Pajak Kurang Bayar (Rp)',
      ],
      editingKey: '',
    }
  },
  computed: {
    ...mapState(['pendapatan']),
  },
  methods: {
    onChangeTab(val) {
      this.$refs.pendapatan.fields.forEach((field) => {
        if (this.columnAll.includes(field.label)) return
        if (parseInt(val) === 1 && !this.columnPajak.includes(field.label))
          field.invisible = false
        else if (parseInt(val) === 2 && this.columnPajak.includes(field.label))
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

      row.pot1 = -(nVal * row.pot1p) / 100
      row.pot2 = -(nVal * row.pot2p) / 100
      row.pot3 = -(nVal * row.pot3p) / 100
      const bpjs = -((row.jmlhgaji - row.pdpt3) * 0.96) / 100
      row.pot7 = bpjs
      row.pot8 = bpjs

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
      row.pdpt2 = (row.pdpt1 * nVal) / 100

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

      const bpjs = -((row.jmlhgaji - row.pdpt3) * 0.96) / 100
      row.pot7 = bpjs
      row.pot8 = bpjs

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
      row.pdpt3 = (row.pdpt1 * nVal) / 100

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

      const bpjs = -((row.jmlhgaji - row.pdpt3) * 0.96) / 100
      row.pot7 = bpjs
      row.pot8 = bpjs

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

      const bpjs = -((row.jmlhgaji - row.pdpt3) * 0.96) / 100
      row.pot7 = bpjs
      row.pot8 = bpjs

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

      const bpjs = -((row.jmlhgaji - row.pdpt3) * 0.96) / 100
      row.pot7 = bpjs
      row.pot8 = bpjs

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

      const bpjs = -((row.jmlhgaji - row.pdpt3) * 0.96) / 100
      row.pot7 = bpjs
      row.pot8 = bpjs

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

      const bpjs = -((row.jmlhgaji - row.pdpt3) * 0.96) / 100
      row.pot7 = bpjs
      row.pot8 = bpjs

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

      const bpjs = -((row.jmlhgaji - row.pdpt3) * 0.96) / 100
      row.pot7 = bpjs
      row.pot8 = bpjs

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

      const bpjs = -((row.jmlhgaji - row.pdpt3) * 0.96) / 100
      row.pot7 = bpjs
      row.pot8 = bpjs

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

      const bpjs = -((row.jmlhgaji - row.pdpt3) * 0.96) / 100
      row.pot7 = bpjs
      row.pot8 = bpjs

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

      const bpjs = -((row.jmlhgaji - row.pdpt3) * 0.96) / 100
      row.pot7 = bpjs
      row.pot8 = bpjs

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

      const bpjs = -((row.jmlhgaji - row.pdpt3) * 0.96) / 100
      row.pot7 = bpjs
      row.pot8 = bpjs

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
    onChangePot1p(nVal, oVal, row) {
      row.pot1 = -(row.pdpt1 * nVal) / 100

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
      row.pot2 = -(row.pdpt1 * nVal) / 100

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
      row.pot3 = -(row.pdpt1 * nVal) / 100

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
    onChangePot10(nVal, oVal, row) {
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
        nVal

      row.sebelumzakat = row.jmlhgaji + row.jmlhpot
      row.pot11 = -(row.sebelumzakat * 2.5) / 100
      row.diterima = row.sebelumzakat + row.pot11
    },
  },
}
</script>
