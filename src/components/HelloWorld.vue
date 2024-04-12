<script setup>
  import { ref } from 'vue';
  import { fetchAllBooks } from '../services/databaseService';

  const allBooks = await fetchAllBooks();
  
</script>

<template>
  <div>
    <p v-for="book in allBooks" class="font-roboto">{{ book.Titel }}</p>
  </div>
</template>

<style scoped>

</style>
