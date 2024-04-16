<script setup>
import { onMounted } from 'vue';
import NavigationBar from './components/NavigationBar.vue';
import { useBookStore } from './stores/bookStore';
import { fetchAllBooks } from './services/databaseService';

const bookStore = useBookStore();

/* load data on initialization */
onMounted(async () => {
  const allBooks = await fetchAllBooks();
  bookStore.setupBookStore(allBooks);
});
</script>

<template>
  <NavigationBar />
  <router-view></router-view>
</template>

<style scoped>

</style>
