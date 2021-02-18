<template>
  <a-table
    :columns="columns"
    :data-source="data"
    size="small"
    row-key="nik_pegawai"
    bordered
    :scroll="{ x: 1500, y: 400 }"
    :pagination="{ pageSize: 25 }"
  >
    <template slot="actionTitle">
      <a-icon type="form"></a-icon>
    </template>
    <template slot="action">
      <a href="javascript:;"><a-icon type="form"></a-icon></a>
    </template>
    <template slot="nm_dept" slot-scope="nm_dept">
      <div v-for="(d, i) in nm_dept" :key="i">- {{ d }}</div>
    </template>
  </a-table>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      columns: [
        {
          dataIndex: 'action',
          width: 35,
          fixed: 'left',
          slots: { title: 'actionTitle' },
          scopedSlots: { customRender: 'action' },
        },
        {
          title: 'NIK',
          dataIndex: 'nik_pegawai',
          width: 70,
          fixed: 'left',
          sorter: (a, b) =>
            a.nik_pegawai < b.nik_pegawai
              ? -1
              : +(a.nik_pegawai > b.nik_pegawai),
        },
        {
          title: 'Nama',
          dataIndex: 'nm_pegawai',
          width: 250,
          fixed: 'left',
          sorter: (a, b) =>
            a.nm_pegawai < b.nm_pegawai ? -1 : +(a.nm_pegawai > b.nm_pegawai),
        },
        {
          title: 'Bagian',
          dataIndex: 'nm_dept',
          scopedSlots: { customRender: 'nm_dept' },
          width: 250,
        },
        {
          title: 'Golongan',
          dataIndex: 'golongan',
          width: 150,
        },
        {
          title: 'Ket. PTKP',
          dataIndex: 'ketptkp',
          width: 150,
        },
        {
          title: 'PTKP',
          dataIndex: 'ptkp',
          width: 150,
        },
        {
          title: 'Masa Kerja',
          dataIndex: 'masaker',
          width: 150,
        },
        {
          title: '01. Gaji Pokok',
          dataIndex: 'pdpt1',
          width: 150,
        },
        {
          title: '02. Tunj. Trans (%)',
          dataIndex: 'pdpt2p',
          width: 150,
        },
        {
          title: '02. Tunj. Trans',
          dataIndex: 'pdpt2',
          width: 150,
        },
        {
          title: '03. Tunj. HT (%)',
          dataIndex: 'pdpt3p',
          width: 150,
        },
        {
          title: '03. Tunj. HT',
          dataIndex: 'pdpt3',
          width: 150,
        },
        {
          title: '04. Tunj. Fungsional',
          dataIndex: 'pdpt4',
          width: 150,
        },
        {
          title: '05. Tunj. Jabatan',
          dataIndex: 'pdpt5',
          width: 150,
        },
        {
          title: '06.',
          dataIndex: 'pdpt6',
          width: 150,
        },
        {
          title: '07.',
          dataIndex: 'pdpt7',
          width: 150,
        },
        {
          title: '08. TPP',
          dataIndex: 'pdpt8',
          width: 150,
        },
        {
          title: '09.',
          dataIndex: 'pdpt9',
          width: 150,
        },
        {
          title: '10.',
          dataIndex: 'pdpt10',
          width: 150,
        },
        {
          title: '11.',
          dataIndex: 'pdpt11',
          width: 150,
        },
        {
          title: '12. Lain-lain',
          dataIndex: 'pdpt12',
          width: 150,
        },
        {
          title: 'Jum. Penerimaan',
          dataIndex: 'penerimaan',
          width: 150,
        },
        {
          title: '01. PPH 21 (%)',
          dataIndex: 'pot1p',
          width: 150,
        },
        {
          title: '01. PPH 21',
          dataIndex: 'pot1',
          width: 150,
        },
        {
          title: '02. (%)',
          dataIndex: 'pot2p',
          width: 150,
        },
        {
          title: '02.',
          dataIndex: 'pot2',
          width: 150,
        },
        {
          title: '03. Tab. HT (%)',
          dataIndex: 'pot3p',
          width: 150,
        },
        {
          title: '03. Tab. HT',
          dataIndex: 'pot3',
          width: 150,
        },
        {
          title: '04. Sosial',
          dataIndex: 'pot4',
          width: 150,
        },
        {
          title: '05. Obat-obatan',
          dataIndex: 'pot5',
          width: 150,
        },
        {
          title: '06. PPNI',
          dataIndex: 'pot6',
          width: 150,
        },
        {
          title: '07. BPJS Kesehatan',
          dataIndex: 'pot7',
          width: 150,
        },
        {
          title: '08. BPJS T. Kerja',
          dataIndex: 'pot8',
          width: 150,
        },
        {
          title: '09. IBI',
          dataIndex: 'pot9',
          width: 150,
        },
        {
          title: '10. Subsidi Pajak',
          dataIndex: 'pot10',
          width: 150,
        },
        {
          title: '11. Zakat (2.5%)',
          dataIndex: 'pot11',
          width: 150,
        },
        {
          title: 'Jum. Pengeluaran',
          dataIndex: 'pengeluaran',
          width: 150,
        },
        {
          title: 'Diterima Bersih',
          dataIndex: 'diterima',
          width: 150,
        },
      ],
    }
  },
  computed: {
    ...mapState(['pendapatan']),
  },
  methods: {
    change(pagination, filters, sorter, data) {
      this.$emit('pagination', pagination)
    },
  },
}
</script>
