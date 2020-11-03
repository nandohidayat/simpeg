<template>
  <div></div>
</template>

<script>
export default {
  middleware({ store, redirect }) {
    if (!store.getters['user/hadMenu'](2)) {
      return redirect('/404')
    }
  },
  head() {
    return {
      title: 'Database',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Database',
        },
      ],
    }
  },
}
</script>
