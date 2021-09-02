<template>
  <div>
    <absen-option></absen-option>
    <absen-table class="mt-5"></absen-table>
  </div>
</template>

<script>
import AbsenOption from '@/components/absen/absen-option'
import AbsenTable from '@/components/absen/absen-table'

export default {
  middleware({ store, redirect }) {
    if (!store.getters['user/hadAkses'](10)) {
      return redirect('/404')
    }
  },
  components: {
    AbsenOption,
    AbsenTable,
  },
  async fetch({ store }) {
    await store.dispatch('departemen/fetchDepartemens', {
      select: 1,
      schedule: 1,
      ant: 1,
    })
  },
  head() {
    return {
      title: 'Absen Karyawan',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Absen Karyawan',
        },
      ],
    }
  },
}
</script>
