<template>
  <v-card-text class="pa-0">
    <vue-excel-editor v-model="pendapatan.items" filter-row>
      <vue-excel-column
        v-for="(c, i) in columns"
        :key="i"
        :change="c.change"
        :field="c.dataIndex"
        :init-style="c.initStyle"
        :label="c.title"
        :options="c.options"
        :readonly="c.readonly"
        :sticky="c.sticky"
        :type="c.type"
        :width="c.width"
        :to-text="c.toText"
        :to-value="c.toValue"
      />
    </vue-excel-editor>
  </v-card-text>
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
          toText: this.numToDig,
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
          dataIndex: 'penerimaan',
          type: 'number',
          width: '120px',
          readonly: true,
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePenerimaan,
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
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePot7,
        },
        {
          title: '08. BPJS T. Kerja (Rp)',
          dataIndex: 'pot8',
          type: 'number',
          width: '120px',
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
          dataIndex: 'pengeluaran',
          type: 'number',
          width: '120px',
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePengeluaran,
        },
        {
          title: '11. Zakat (2.5%) (Rp)',
          dataIndex: 'pot11',
          type: 'number',
          width: '120px',
          readonly: true,
          toText: this.numToCur,
          toValue: this.numToVal,
          change: this.onChangePot11,
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
      ],
      editingKey: '',
    }
  },
  computed: {
    ...mapState(['pendapatan']),
  },
  methods: {
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
    onChangePdpt1(nVal, oVal, row) {
      row.pdpt2 = (nVal * row.pdpt2p) / 100
      row.pdpt3 = (nVal * row.pdpt3p) / 100

      row.penerimaan =
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

      row.pengeluaran =
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

      row.pot11 = -((row.penerimaan + row.pengeluaran) * 2.5) / 100
      row.diterima = row.penerimaan + row.pengeluaran + row.pot11
    },
    onChangePdpt2p(nVal, oVal, row) {
      row.pdpt2 = (row.pdpt1 * nVal) / 100

      row.penerimaan =
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

      row.pot11 = -((row.penerimaan + row.pengeluaran) * 2.5) / 100
      row.diterima = row.penerimaan + row.pengeluaran + row.pot11
    },
    onChangePdpt3p(nVal, oVal, row) {
      row.pdpt3 = (row.pdpt1 * nVal) / 100

      row.penerimaan =
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

      row.pot11 = -((row.penerimaan + row.pengeluaran) * 2.5) / 100
      row.diterima = row.penerimaan + row.pengeluaran + row.pot11
    },
    onChangePdpt4(nVal, oVal, row) {
      row.penerimaan =
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

      row.pot11 = -((row.penerimaan + row.pengeluaran) * 2.5) / 100
      row.diterima = row.penerimaan + row.pengeluaran + row.pot11
    },
    onChangePdpt5(nVal, oVal, row) {
      row.penerimaan =
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

      row.pot11 = -((row.penerimaan + row.pengeluaran) * 2.5) / 100
      row.diterima = row.penerimaan + row.pengeluaran + row.pot11
    },
    onChangePdpt6(nVal, oVal, row) {
      row.penerimaan =
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

      row.pot11 = -((row.penerimaan + row.pengeluaran) * 2.5) / 100
      row.diterima = row.penerimaan + row.pengeluaran + row.pot11
    },
    onChangePdpt7(nVal, oVal, row) {
      row.penerimaan =
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

      row.pot11 = -((row.penerimaan + row.pengeluaran) * 2.5) / 100
      row.diterima = row.penerimaan + row.pengeluaran + row.pot11
    },
    onChangePdpt8(nVal, oVal, row) {
      row.penerimaan =
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

      row.pot11 = -((row.penerimaan + row.pengeluaran) * 2.5) / 100
      row.diterima = row.penerimaan + row.pengeluaran + row.pot11
    },
    onChangePdpt9(nVal, oVal, row) {
      row.penerimaan =
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

      row.pot11 = -((row.penerimaan + row.pengeluaran) * 2.5) / 100
      row.diterima = row.penerimaan + row.pengeluaran + row.pot11
    },
    onChangePdpt10(nVal, oVal, row) {
      row.penerimaan =
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

      row.pot11 = -((row.penerimaan + row.pengeluaran) * 2.5) / 100
      row.diterima = row.penerimaan + row.pengeluaran + row.pot11
    },
    onChangePdpt11(nVal, oVal, row) {
      row.penerimaan =
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

      row.pot11 = -((row.penerimaan + row.pengeluaran) * 2.5) / 100
      row.diterima = row.penerimaan + row.pengeluaran + row.pot11
    },
    onChangePdpt12(nVal, oVal, row) {
      row.penerimaan =
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

      row.pot11 = -((row.penerimaan + row.pengeluaran) * 2.5) / 100
      row.diterima = row.penerimaan + row.pengeluaran + row.pot11
    },
    onChangePot1p(nVal, oVal, row) {
      row.pot1 = -(row.pdpt1 * nVal) / 100

      row.pengeluaran =
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

      row.pot11 = -((row.penerimaan + row.pengeluaran) * 2.5) / 100
      row.diterima = row.penerimaan + row.pengeluaran + row.pot11
    },
    onChangePot2p(nVal, oVal, row) {
      row.pot2 = -(row.pdpt1 * nVal) / 100

      row.pengeluaran =
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

      row.pot11 = -((row.penerimaan + row.pengeluaran) * 2.5) / 100
      row.diterima = row.penerimaan + row.pengeluaran + row.pot11
    },
    onChangePot3p(nVal, oVal, row) {
      row.pot3 = -(row.pdpt1 * nVal) / 100

      row.pengeluaran =
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

      row.pot11 = -((row.penerimaan + row.pengeluaran) * 2.5) / 100
      row.diterima = row.penerimaan + row.pengeluaran + row.pot11
    },
    onChangePot4(nVal, oVal, row) {
      row.pengeluaran =
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

      row.pot11 = -((row.penerimaan + row.pengeluaran) * 2.5) / 100
      row.diterima = row.penerimaan + row.pengeluaran + row.pot11
    },
    onChangePot5(nVal, oVal, row) {
      row.pengeluaran =
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

      row.pot11 = -((row.penerimaan + row.pengeluaran) * 2.5) / 100
      row.diterima = row.penerimaan + row.pengeluaran + row.pot11
    },
    onChangePot6(nVal, oVal, row) {
      row.pengeluaran =
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

      row.pot11 = -((row.penerimaan + row.pengeluaran) * 2.5) / 100
      row.diterima = row.penerimaan + row.pengeluaran + row.pot11
    },
    onChangePot7(nVal, oVal, row) {
      row.pengeluaran =
        row.pot1 +
        row.pot2 +
        row.pot3 +
        row.pot4 +
        row.pot5 +
        row.pot6 +
        nVal +
        row.pot8 +
        row.pot9 +
        row.pot10

      row.pot11 = -((row.penerimaan + row.pengeluaran) * 2.5) / 100
      row.diterima = row.penerimaan + row.pengeluaran + row.pot11
    },
    onChangePot8(nVal, oVal, row) {
      row.pengeluaran =
        row.pot1 +
        row.pot2 +
        row.pot3 +
        row.pot4 +
        row.pot5 +
        row.pot6 +
        row.pot7 +
        nVal +
        row.pot9 +
        row.pot10

      row.pot11 = -((row.penerimaan + row.pengeluaran) * 2.5) / 100
      row.diterima = row.penerimaan + row.pengeluaran + row.pot11
    },
    onChangePot9(nVal, oVal, row) {
      row.pengeluaran =
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

      row.pot11 = -((row.penerimaan + row.pengeluaran) * 2.5) / 100
      row.diterima = row.penerimaan + row.pengeluaran + row.pot11
    },
    onChangePot10(nVal, oVal, row) {
      row.pengeluaran =
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

      row.pot11 = -((row.penerimaan + row.pengeluaran) * 2.5) / 100
      row.diterima = row.penerimaan + row.pengeluaran + row.pot11
    },
  },
}
</script>
