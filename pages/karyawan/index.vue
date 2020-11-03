<template>
  <div></div>
</template>

<script>
export default {
  middleware({ store, redirect }) {
    if (!store.getters['user/hadMenu'](1)) {
      return redirect('/404')
    }
  },
  head() {
    return {
      title: 'Karyawan',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Karyawan',
        },
      ],
    }
  },
}
</script>
