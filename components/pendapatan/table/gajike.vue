<template>
  <div>
    <a-tabs v-if="tipe === 0" type="card" size="small" @change="onChangeTab">
      <a-tab-pane key="0" tab="Pendapatan"> </a-tab-pane>
      <a-tab-pane key="2" tab="Pajak"> </a-tab-pane>
    </a-tabs>
    <a-tabs v-if="tipe === 1" type="card" size="small" @change="onChangeTab">
      <a-tab-pane key="1" tab="Potongan"> </a-tab-pane>
      <a-tab-pane key="3" tab="Bank"> </a-tab-pane>
      <a-tab-pane key="4" tab="Rumah Sakit"> </a-tab-pane>
      <a-tab-pane key="5" tab="Organisasi"> </a-tab-pane>
      <a-tab-pane key="6" tab="Lain-lain"> </a-tab-pane>
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
          section: [0, 1, 2, 3, 4, 5, 6],
          sticky: true,
          title: 'NIK',
          type: 'number',
          width: '70px',
        },
        {
          author: 0,
          field: 'nm_pegawai',
          readonly: true,
          section: [0, 1, 2, 3, 4, 5, 6],
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
          section: [0, 1, 2, 3, 4, 5, 6],
          title: 'Bagian',
          toText: this.depToLis,
          type: 'string',
          width: '170px',
        },
        {
          author: 0,
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
          section: [0],
          title: 'Golongan',
          type: 'select',
        },
        {
          author: 0,
          field: 'ketptkp',
          options: ['K/0', 'K/1', 'K/2', 'K/3', 'K/4', 'K/5', 'TK/0'],
          section: [0],
          title: 'Ket. PTKP',
          type: 'select',
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
          field: 'masaker',
          section: [0],
          title: 'Masa Kerja',
          type: 'string',
          validate: this.validMasaKerja,
        },
        {
          author: 0,
          change: this.onChangePdpt1,
          field: 'pdpt1',
          section: [0],
          title: '01. Gaji Pokok (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          change: this.onChangePdpt2p,
          field: 'pdpt2p',
          section: [0],
          title: '02. Tunj. Trans (%)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'pdpt2',
          section: [0],
          readonly: true,
          title: '02. Tunj. Trans (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          change: this.onChangePdpt3p,
          field: 'pdpt3p',
          section: [0],
          title: '03. Tunj. HT (%)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'pdpt3',
          readonly: true,
          section: [0],
          title: '03. Tunj. HT (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          change: this.onChangePdpt4,
          field: 'pdpt4',
          section: [0],
          title: '04. Tunj. Fungsional (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          change: this.onChangePdpt5,
          field: 'pdpt5',
          section: [0],
          title: '05. Tunj. Jabatan (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          change: this.onChangePdpt6,
          field: 'pdpt6',
          section: [0],
          title: '06. (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          change: this.onChangePdpt7,
          section: [0],
          field: 'pdpt7',
          title: '07. (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          change: this.onChangePdpt8,
          field: 'pdpt8',
          section: [0],
          title: '08. TPP (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          change: this.onChangePdpt9,
          field: 'pdpt9',
          section: [0],
          title: '09. (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          change: this.onChangePdpt10,
          field: 'pdpt10',
          section: [0],
          title: '10. (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          change: this.onChangePdpt11,
          field: 'pdpt11',
          section: [0],
          title: '11. (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          change: this.onChangePdpt12,
          field: 'pdpt12',
          section: [0],
          title: '12. Lain-lain (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'jmlhgajike',
          readonly: true,
          section: [0],
          title: 'Jum. Penerimaan (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'pot1',
          readonly: true,
          section: [0],
          title: '01. PPH 21 (5%)(Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          change: this.onChangePot2p,
          field: 'pot2p',
          section: [0],
          title: '02. (%)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'pot2',
          readonly: true,
          section: [0],
          title: '02. (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          change: this.onChangePot3p,
          field: 'pot3p',
          section: [0],
          title: '03. Tab. HT (%)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'pot3',
          readonly: true,
          section: [0],
          title: '03. Tab. HT (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          change: this.onChangePot4,
          field: 'pot4',
          section: [0],
          title: '04. Sosial (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          change: this.onChangePot5,
          field: 'pot5',
          section: [0],
          title: '05. Obat-obatan (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          change: this.onChangePot6,
          field: 'pot6',
          section: [0],
          title: '06. PPNI (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          change: this.onChangePot7p,
          field: 'pot7p',
          section: [0],
          title: '07. BPJS Kesehatan (%)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'pot7',
          readonly: true,
          section: [0],
          title: '07. BPJS Kesehatan (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          change: this.onChangePot8p,
          field: 'pot8p',
          section: [0],
          title: '08. BPJS T. Kerja (%)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'pot8',
          readonly: true,
          section: [0],
          title: '08. BPJS T. Kerja (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          change: this.onChangePot9,
          field: 'pot9',
          section: [0],
          title: '09. IBI (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'pot10',
          readonly: true,
          section: [0],
          title: '10. Subsidi Pajak (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'jmlhpot',
          readonly: true,
          section: [0],
          title: 'Jum. Pengeluaran (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'sebelumzakat',
          section: [0],
          title: 'Sebelum Zakat (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'pot11',
          section: [0],
          title: '11. Zakat (2.5%) (Rp)',
          readonly: true,
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 0,
          field: 'diterima',
          readonly: true,
          section: [0],
          title: 'Diterima Bersih (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
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
          change: this.onChangeJmlhkoperasi,
          field: 'jmlhkoperasi',
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
          change: this.onChangeBank,
          field: 'bank1',
          invisible: true,
          section: [3],
          title: 'Bank BPD (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 1,
          change: this.onChangeBank,
          field: 'bank2',
          invisible: true,
          section: [3],
          title: 'Bank BPD Syariah (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 1,
          change: this.onChangeBank,
          field: 'bank3',
          invisible: true,
          section: [3],
          title: 'Bank BRI (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 1,
          change: this.onChangeBank,
          field: 'bank4',
          invisible: true,
          section: [3],
          title: 'Bank BRI Syariah (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 1,
          change: this.onChangeBank,
          field: 'bank5',
          invisible: true,
          section: [3],
          title: 'Bank Mandiri (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 1,
          change: this.onChangeBank,
          field: 'bank6',
          invisible: true,
          section: [3],
          title: 'Bank Mandiri Syariah (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 1,
          change: this.onChangeBank,
          field: 'bank7',
          invisible: true,
          section: [3],
          title: 'Bank BNI (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 1,
          change: this.onChangeBank,
          field: 'bank8',
          invisible: true,
          section: [3],
          title: 'Bank BNI Syariah (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 1,
          field: 'jmlhbank',
          invisible: true,
          readonly: true,
          section: [1, 3],
          title: 'Bank (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 1,
          change: this.onChangeKantor,
          field: 'kantor1',
          invisible: true,
          section: [4],
          title: 'Opname (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 1,
          change: this.onChangeKantor,
          field: 'kantor2',
          invisible: true,
          section: [4],
          title: 'Obat (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 1,
          change: this.onChangeKantor,
          field: 'kantor3',
          invisible: true,
          section: [4],
          title: 'Laborat (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 1,
          change: this.onChangeKantor,
          field: 'kantor4',
          invisible: true,
          section: [4],
          title: 'Radiologi (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 1,
          change: this.onChangeKantor,
          field: 'kantor5',
          invisible: true,
          section: [4],
          title: 'Poli (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 1,
          change: this.onChangeKantor,
          field: 'kantor6',
          invisible: true,
          section: [4],
          title: 'BKIA (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 1,
          change: this.onChangeKantor,
          field: 'kantor7',
          invisible: true,
          section: [4],
          title: 'Seragam (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 1,
          change: this.onChangeKantor,
          field: 'kantor8',
          invisible: true,
          section: [4],
          title: 'Check Up (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 1,
          field: 'jmlhkantor',
          invisible: true,
          readonly: true,
          section: [1, 4],
          title: 'Kantor (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 1,
          change: this.onChangeOrganisasi,
          field: 'organisasi1',
          invisible: true,
          section: [5],
          title: 'PPNI (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 1,
          change: this.onChangeOrganisasi,
          field: 'organisasi2',
          invisible: true,
          section: [5],
          title: 'IBI (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 1,
          change: this.onChangeOrganisasi,
          field: 'organisasi3',
          invisible: true,
          section: [5],
          title: 'IDI (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 1,
          change: this.onChangeOrganisasi,
          field: 'organisasi4',
          invisible: true,
          section: [5],
          title: 'AISYIYAH (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 1,
          change: this.onChangeOrganisasi,
          field: 'organisasi5',
          invisible: true,
          section: [5],
          title: 'MASJID (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 1,
          field: 'jmlhorganisasi',
          invisible: true,
          readonly: true,
          section: [1, 5],
          title: 'Organisasi (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 1,
          change: this.onChangeLainlain,
          field: 'lainlain1',
          invisible: true,
          section: [6],
          title: 'Beasiswa (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 1,
          change: this.onChangeLainlain,
          field: 'lainlain2',
          invisible: true,
          section: [6],
          title: 'Arisan (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 1,
          change: this.onChangeLainlain,
          field: 'lainlain3',
          invisible: true,
          section: [6],
          title: 'BTCLS (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 1,
          change: this.onChangeLainlain,
          field: 'lainlain4',
          invisible: true,
          section: [6],
          title: 'Imun Servik (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 1,
          change: this.onChangeLainlain,
          field: 'lainlain5',
          invisible: true,
          section: [6],
          title: 'Thibun (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 1,
          change: this.onChangeLainlain,
          field: 'lainlain6',
          invisible: true,
          section: [6],
          title: 'Kecantikan (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 1,
          change: this.onChangeLainlain,
          field: 'lainlain7',
          invisible: true,
          section: [6],
          title: 'Wilya (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 1,
          change: this.onChangeLainlain,
          field: 'lainlain8',
          invisible: true,
          section: [6],
          title: 'Sosial (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 1,
          field: 'jmlhlainlain',
          invisible: true,
          readonly: true,
          section: [1, 6],
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
          readonly: true,
          section: [1],
          title: 'Jumlah Potongan (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
          width: '120px',
        },
        {
          author: 1,
          field: 'penyerahan',
          invisible: true,
          readonly: true,
          section: [1],
          title: 'Penyerahan Gaji (Rp)',
          toText: this.numToCur,
          toValue: this.numToVal,
          type: 'number',
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
    validMasaKerja(content, oldContent, record, field) {
      if (content === '') return ''
      if (!/^[0-9]{2}:[0-9]{2}$/.test(content)) return 'Invalid Format (XX:XX)'
      return '' // return empty string if there is no error
    },
    onChangePtkp(nVal, oVal, row) {
      row.pjk10 = -(nVal * moment(this.pendapatan.date).format('M'))
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.pot1 = -row.pjk15
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

      row.sebelumzakat = row.jmlhgajike + row.jmlhpot
      row.pot11 = -(row.sebelumzakat * 2.5) / 100
      row.diterima = row.sebelumzakat + row.pot11

      row.penyerahan = row.diterima + row.jmlhpotg
    },
    onChangePdpt1(nVal, oVal, row) {
      row.pdpt2 = (nVal * row.pdpt2p) / 100
      row.pdpt3 = (nVal * row.pdpt3p) / 100

      const temp = row.jmlhgajike

      row.jmlhgajike =
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

      row.pjk5 = row.pjk5 - temp + row.jmlhgajike
      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk8 = -(row.pjk3 * 0.05)
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.pot1 = -row.pjk15
      row.pot2 = -(nVal * row.pot2p) / 100
      row.pot3 = -(nVal * row.pot3p) / 100
      row.pot7 = -((row.jmlhgajike - row.pdpt3) * row.pot7p) / 100
      row.pot8 = -((row.jmlhgajike - row.pdpt3) * row.pot8p) / 100
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

      row.sebelumzakat = row.jmlhgajike + row.jmlhpot
      row.pot11 = -(row.sebelumzakat * 2.5) / 100
      row.diterima = row.sebelumzakat + row.pot11

      row.penyerahan = row.diterima + row.jmlhpotg
    },
    onChangePdpt2p(nVal, oVal, row) {
      row.pdpt2 = (nVal * row.pdpt1) / 100

      const temp = row.jmlhgajike

      row.jmlhgajike =
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

      row.pjk5 = row.pjk5 - temp + row.jmlhgajike
      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk8 = -(row.pjk3 * 0.05)
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.pot1 = -row.pjk15
      row.pot7 = -((row.jmlhgajike - row.pdpt3) * row.pot7p) / 100
      row.pot8 = -((row.jmlhgajike - row.pdpt3) * row.pot8p) / 100
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

      row.sebelumzakat = row.jmlhgajike + row.jmlhpot
      row.pot11 = -(row.sebelumzakat * 2.5) / 100
      row.diterima = row.sebelumzakat + row.pot11

      row.penyerahan = row.diterima + row.jmlhpotg
    },
    onChangePdpt3p(nVal, oVal, row) {
      row.pdpt3 = (nVal * row.pdpt1) / 100

      const temp = row.jmlhgajike

      row.jmlhgajike =
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

      row.pjk5 = row.pjk5 - temp + row.jmlhgajike
      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk8 = -(row.pjk3 * 0.05)
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.pot1 = -row.pjk15
      row.pot7 = -((row.jmlhgajike - row.pdpt3) * row.pot7p) / 100
      row.pot8 = -((row.jmlhgajike - row.pdpt3) * row.pot8p) / 100
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

      row.sebelumzakat = row.jmlhgajike + row.jmlhpot
      row.pot11 = -(row.sebelumzakat * 2.5) / 100
      row.diterima = row.sebelumzakat + row.pot11

      row.penyerahan = row.diterima + row.jmlhpotg
    },
    onChangePdpt4(nVal, oVal, row) {
      const temp = row.jmlhgajike

      row.jmlhgajike =
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

      row.pjk5 = row.pjk5 - temp + row.jmlhgajike
      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk8 = -(row.pjk3 * 0.05)
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.pot1 = -row.pjk15
      row.pot7 = -((row.jmlhgajike - row.pdpt3) * row.pot7p) / 100
      row.pot8 = -((row.jmlhgajike - row.pdpt3) * row.pot8p) / 100
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

      row.sebelumzakat = row.jmlhgajike + row.jmlhpot
      row.pot11 = -(row.sebelumzakat * 2.5) / 100
      row.diterima = row.sebelumzakat + row.pot11

      row.penyerahan = row.diterima + row.jmlhpotg
    },
    onChangePdpt5(nVal, oVal, row) {
      const temp = row.jmlhgajike

      row.jmlhgajike =
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

      row.pjk5 = row.pjk5 - temp + row.jmlhgajike
      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk8 = -(row.pjk3 * 0.05)
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.pot1 = -row.pjk15
      row.pot7 = -((row.jmlhgajike - row.pdpt3) * row.pot7p) / 100
      row.pot8 = -((row.jmlhgajike - row.pdpt3) * row.pot8p) / 100
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

      row.sebelumzakat = row.jmlhgajike + row.jmlhpot
      row.pot11 = -(row.sebelumzakat * 2.5) / 100
      row.diterima = row.sebelumzakat + row.pot11

      row.penyerahan = row.diterima + row.jmlhpotg
    },
    onChangePdpt6(nVal, oVal, row) {
      const temp = row.jmlhgajike

      row.jmlhgajike =
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

      row.pjk5 = row.pjk5 - temp + row.jmlhgajike
      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk8 = -(row.pjk3 * 0.05)
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.pot1 = -row.pjk15
      row.pot7 = -((row.jmlhgajike - row.pdpt3) * row.pot7p) / 100
      row.pot8 = -((row.jmlhgajike - row.pdpt3) * row.pot8p) / 100
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

      row.sebelumzakat = row.jmlhgajike + row.jmlhpot
      row.pot11 = -(row.sebelumzakat * 2.5) / 100
      row.diterima = row.sebelumzakat + row.pot11

      row.penyerahan = row.diterima + row.jmlhpotg
    },
    onChangePdpt7(nVal, oVal, row) {
      const temp = row.jmlhgajike

      row.jmlhgajike =
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

      row.pjk5 = row.pjk5 - temp + row.jmlhgajike
      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk8 = -(row.pjk3 * 0.05)
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.pot1 = -row.pjk15
      row.pot7 = -((row.jmlhgajike - row.pdpt3) * row.pot7p) / 100
      row.pot8 = -((row.jmlhgajike - row.pdpt3) * row.pot8p) / 100
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

      row.sebelumzakat = row.jmlhgajike + row.jmlhpot
      row.pot11 = -(row.sebelumzakat * 2.5) / 100
      row.diterima = row.sebelumzakat + row.pot11

      row.penyerahan = row.diterima + row.jmlhpotg
    },
    onChangePdpt8(nVal, oVal, row) {
      const temp = row.jmlhgajike

      row.jmlhgajike =
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

      row.pjk5 = row.pjk5 - temp + row.jmlhgajike
      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk8 = -(row.pjk3 * 0.05)
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.pot1 = -row.pjk15
      row.pot7 = -((row.jmlhgajike - row.pdpt3) * row.pot7p) / 100
      row.pot8 = -((row.jmlhgajike - row.pdpt3) * row.pot8p) / 100
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

      row.sebelumzakat = row.jmlhgajike + row.jmlhpot
      row.pot11 = -(row.sebelumzakat * 2.5) / 100
      row.diterima = row.sebelumzakat + row.pot11

      row.penyerahan = row.diterima + row.jmlhpotg
    },
    onChangePdpt9(nVal, oVal, row) {
      const temp = row.jmlhgajike

      row.jmlhgajike =
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

      row.pjk5 = row.pjk5 - temp + row.jmlhgajike
      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk8 = -(row.pjk3 * 0.05)
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.pot1 = -row.pjk15
      row.pot7 = -((row.jmlhgajike - row.pdpt3) * row.pot7p) / 100
      row.pot8 = -((row.jmlhgajike - row.pdpt3) * row.pot8p) / 100
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

      row.sebelumzakat = row.jmlhgajike + row.jmlhpot
      row.pot11 = -(row.sebelumzakat * 2.5) / 100
      row.diterima = row.sebelumzakat + row.pot11

      row.penyerahan = row.diterima + row.jmlhpotg
    },
    onChangePdpt10(nVal, oVal, row) {
      const temp = row.jmlhgajike

      row.jmlhgajike =
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

      row.pjk5 = row.pjk5 - temp + row.jmlhgajike
      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk8 = -(row.pjk3 * 0.05)
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.pot1 = -row.pjk15
      row.pot7 = -((row.jmlhgajike - row.pdpt3) * row.pot7p) / 100
      row.pot8 = -((row.jmlhgajike - row.pdpt3) * row.pot8p) / 100
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

      row.sebelumzakat = row.jmlhgajike + row.jmlhpot
      row.pot11 = -(row.sebelumzakat * 2.5) / 100
      row.diterima = row.sebelumzakat + row.pot11

      row.penyerahan = row.diterima + row.jmlhpotg
    },
    onChangePdpt11(nVal, oVal, row) {
      const temp = row.jmlhgajike

      row.jmlhgajike =
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

      row.pjk5 = row.pjk5 - temp + row.jmlhgajike
      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk8 = -(row.pjk3 * 0.05)
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.pot1 = -row.pjk15
      row.pot7 = -((row.jmlhgajike - row.pdpt3) * row.pot7p) / 100
      row.pot8 = -((row.jmlhgajike - row.pdpt3) * row.pot8p) / 100
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

      row.sebelumzakat = row.jmlhgajike + row.jmlhpot
      row.pot11 = -(row.sebelumzakat * 2.5) / 100
      row.diterima = row.sebelumzakat + row.pot11

      row.penyerahan = row.diterima + row.jmlhpotg
    },
    onChangePdpt12(nVal, oVal, row) {
      const temp = row.jmlhgajike

      row.jmlhgajike =
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

      row.pjk5 = row.pjk5 - temp + row.jmlhgajike
      row.pjk7 = row.pjk1 + row.pjk2 + row.pjk3 + row.pjk4 + row.pjk5 + row.pjk6
      row.pjk8 = -(row.pjk3 * 0.05)
      row.pjk9 = -(row.pjk7 * 0.05)
      row.pjk11 = Math.max(0, row.pjk7 + row.pjk8 + row.pjk9 + row.pjk10)
      row.pjk12 = row.pjk11 * 0.05
      row.pjk14 = -row.pjk12
      row.pjk15 = row.pjk12 + row.pjk13

      row.pot1 = -row.pjk15
      row.pot7 = -((row.jmlhgajike - row.pdpt3) * row.pot7p) / 100
      row.pot8 = -((row.jmlhgajike - row.pdpt3) * row.pot8p) / 100
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

      row.sebelumzakat = row.jmlhgajike + row.jmlhpot
      row.pot11 = -(row.sebelumzakat * 2.5) / 100
      row.diterima = row.sebelumzakat + row.pot11

      row.penyerahan = row.diterima + row.jmlhpotg
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

      row.sebelumzakat = row.jmlhgajike + row.jmlhpot
      row.pot11 = -(row.sebelumzakat * 2.5) / 100
      row.diterima = row.sebelumzakat + row.pot11

      row.penyerahan = row.diterima + row.jmlhpotg
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

      row.sebelumzakat = row.jmlhgajike + row.jmlhpot
      row.pot11 = -(row.sebelumzakat * 2.5) / 100
      row.diterima = row.sebelumzakat + row.pot11

      row.penyerahan = row.diterima + row.jmlhpotg
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

      row.sebelumzakat = row.jmlhgajike + row.jmlhpot
      row.pot11 = -(row.sebelumzakat * 2.5) / 100
      row.diterima = row.sebelumzakat + row.pot11

      row.penyerahan = row.diterima + row.jmlhpotg
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

      row.sebelumzakat = row.jmlhgajike + row.jmlhpot
      row.pot11 = -(row.sebelumzakat * 2.5) / 100
      row.diterima = row.sebelumzakat + row.pot11

      row.penyerahan = row.diterima + row.jmlhpotg
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

      row.sebelumzakat = row.jmlhgajike + row.jmlhpot
      row.pot11 = -(row.sebelumzakat * 2.5) / 100
      row.diterima = row.sebelumzakat + row.pot11

      row.penyerahan = row.diterima + row.jmlhpotg
    },
    onChangePot7p(nVal, oVal, row) {
      row.pot7 = -((row.jmlhgajike - row.pdpt3) * nVal) / 100

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

      row.sebelumzakat = row.jmlhgajike + row.jmlhpot
      row.pot11 = -(row.sebelumzakat * 2.5) / 100
      row.diterima = row.sebelumzakat + row.pot11

      row.penyerahan = row.diterima + row.jmlhpotg
    },
    onChangePot8p(nVal, oVal, row) {
      row.pot8 = -((row.jmlhgajike - row.pdpt3) * nVal) / 100

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

      row.sebelumzakat = row.jmlhgajike + row.jmlhpot
      row.pot11 = -(row.sebelumzakat * 2.5) / 100
      row.diterima = row.sebelumzakat + row.pot11

      row.penyerahan = row.diterima + row.jmlhpotg
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

      row.sebelumzakat = row.jmlhgajike + row.jmlhpot
      row.pot11 = -(row.sebelumzakat * 2.5) / 100
      row.diterima = row.sebelumzakat + row.pot11

      row.penyerahan = row.diterima + row.jmlhpotg
    },
    onChangeJmlhkoperasi(nval, oval, row) {
      row.jmlhpotg = row.jmlhpotg - oval + nval
      row.penyerahan = row.diterima + row.jmlhpotg
    },
    onChangeBank(nval, oval, row) {
      row.jmlhbank = row.jmlhbank - oval + nval
      row.jmlhpotg =
        row.jmlhbank +
        row.jmlhkoperasi +
        row.jmlhkantor +
        row.jmlhorganisasi +
        row.jmlhlainlain
      row.penyerahan = row.diterima + row.jmlhpotg
    },
    onChangeKantor(nval, oval, row) {
      row.jmlhkantor = row.jmlhkantor - oval + nval
      row.jmlhpotg =
        row.jmlhbank +
        row.jmlhkoperasi +
        row.jmlhkantor +
        row.jmlhorganisasi +
        row.jmlhlainlain
      row.penyerahan = row.diterima + row.jmlhpotg
    },
    onChangeOrganisasi(nval, oval, row) {
      row.jmlhorganisasi = row.jmlhorganisasi - oval + nval
      row.jmlhpotg =
        row.jmlhbank +
        row.jmlhkoperasi +
        row.jmlhkantor +
        row.jmlhorganisasi +
        row.jmlhlainlain
      row.penyerahan = row.diterima + row.jmlhpotg
    },
    onChangeLainlain(nval, oval, row) {
      row.jmlhlainlain = row.jmlhlainlain - oval + nval
      row.jmlhpotg =
        row.jmlhbank +
        row.jmlhkoperasi +
        row.jmlhkantor +
        row.jmlhorganisasi +
        row.jmlhlainlain
      row.penyerahan = row.diterima + row.jmlhpotg
    },
  },
}
</script>
