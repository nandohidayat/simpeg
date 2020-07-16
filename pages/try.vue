<template>
  <div>
    <v-data-table :headers="headers" :items="items"></v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: 'First', value: 'first' },
        { text: 'Second', value: 'second' },
      ],
      items: [
        { first: 'Pertama 1', second: 'Kedua 1' },
        { first: 'Pertama 2', second: 'Kedua 2' },
      ],
    }
  },
  layout: 'blank',
  head() {
    return {
      title: 'Try',
    }
  },
}
</script>
