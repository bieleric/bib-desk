<script setup>
import { onMounted } from 'vue';
import NavigationBar from './components/NavigationBar.vue';
import BookView from './views/bookView.vue';
import constants from './helpers/constants';
import { useNavigationStore } from './stores/navigationStore';
import { useBookStore } from './stores/bookStore';
import { fetchAllBooks } from './services/databaseService';

const navigationStore = useNavigationStore();
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
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
