<script setup>
    import { reactive } from 'vue';
    import { useBookStore } from '../stores/bookStore';
    import { fetchAllBooks } from '../services/databaseService';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
    import constants from '../helpers/constants';

    const bookStore = useBookStore();
</script>

<template>
  <div class="gridContainer p-4">
    <div class="py-3 font-bold">
        <ul class="gridHeader grid grid-cols-4">
            <li>Buchnummer <FontAwesomeIcon @click="bookStore.sortBooks(constants.ID)" :icon="faCaretDown"></FontAwesomeIcon></li>
            <li>Titel <FontAwesomeIcon @click="bookStore.sortBooks(constants.TITLE)" :icon="faCaretDown"></FontAwesomeIcon></li>
            <li>Autor <FontAwesomeIcon @click="bookStore.sortBooks(constants.AUTHOR)" :icon="faCaretDown"></FontAwesomeIcon></li>
            <li>Aktion</li>
        </ul>
    </div>
    <div v-for="book in bookStore.getAllBooks">
        <ul class="gridData grid grid-cols-4 py-2">
            <li>{{ book.Buchnummer }}</li>
            <li>{{ book.Titel }}</li>
            <li>{{ book.Autor }}</li>
            <li>Aktion</li>
        </ul>
        <hr />
    </div>
  </div>
</template>

<style scoped>

</style>