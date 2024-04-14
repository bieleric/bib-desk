<script setup>
    import { useBookStore } from '../stores/bookStore';
    import SearchBar from '../components/SearchBar.vue';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faCaretDown, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
    import constants from '../helpers/constants';

    const bookStore = useBookStore();
</script>

<template>
    <div class="headerContainer mt-4 p-3 grid grid-cols-8 gap-2">
        <SearchBar class="col-span-6" />
        <button class="col-span-2 bg-indigo-400 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded">Neuer Eintrag</button>
    </div>
    <div class="gridContainer p-4">
        <div class="py-3 font-bold">
            <ul class="gridHeader grid grid-cols-8 gap-2">
                <li class="col-span-2">Buchnummer <FontAwesomeIcon @click="bookStore.sortBooks(constants.ID)" :icon="faCaretDown"></FontAwesomeIcon></li>
                <li class="col-span-3">Titel <FontAwesomeIcon @click="bookStore.sortBooks(constants.TITLE)" :icon="faCaretDown"></FontAwesomeIcon></li>
                <li class="col-span-2">Autor <FontAwesomeIcon @click="bookStore.sortBooks(constants.AUTHOR)" :icon="faCaretDown"></FontAwesomeIcon></li>
                <li class="col-span-1 text-center">Aktion</li>
            </ul>
        </div>
        <div v-for="book in bookStore.getFilteredBooks">
            <ul class="gridData grid grid-cols-8 gap-2 py-2">
                <li class="col-span-2">{{ book.Buchnummer }}</li>
                <li class="col-span-3">{{ book.Titel }}</li>
                <li class="col-span-2">{{ book.Autor }}</li>
                <li class="col-span-1 text-center">
                    <FontAwesomeIcon :icon="faPenToSquare"></FontAwesomeIcon> <FontAwesomeIcon :icon="faTrashCan"></FontAwesomeIcon>
                </li>
            </ul>
            <hr />
        </div>
    </div>
</template>

<style scoped>

</style>