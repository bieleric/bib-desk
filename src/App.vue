<script setup>
import { onMounted } from 'vue';
import NavigationBar from './components/NavigationBar.vue';
import { useBookStore } from './stores/bookStore';
import { useCustomerStore } from './stores/customerStore';
import { fetchAllBooks, fetchAllCustomers } from './services/databaseService';

const bookStore = useBookStore();
const customerStore = useCustomerStore();

/* load data on initialization */
onMounted(async () => {
  const allBooks = await fetchAllBooks();
  bookStore.setupBookStore(allBooks);

  const allCustomers = await fetchAllCustomers();
  customerStore.setupCustomerStore(allCustomers);
});
</script>

<template id="app">
  <NavigationBar />
  <router-view></router-view>
</template>

<style scoped>
#app {
  height: 100vh;
  overflow: hidden;
}
</style>
