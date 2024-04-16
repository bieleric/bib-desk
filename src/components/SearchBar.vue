<script setup>
    import { reactive } from 'vue';
    import { useBookStore } from '../stores/bookStore';

    const bookStore = useBookStore();

    const state = reactive({
        searchString: ''
    })
</script>

<template>
    <div>   
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only text-white">Suche</label>
        <div class="relative">
            <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded bg-gray-300 placeholder-gray-500" placeholder="Suche Buchnummer, Titel ..." v-model="state.searchString" required />
            <button @click="bookStore.resetFilteredBooks(); state.searchString=''" class="text-indigo-400 hover:text-slate-50 absolute end-2.5 bottom-2.5 hover:bg-indigo-500 border-2 border-indigo-400 font-medium rounded text-sm px-4 py-1 mr-3">X</button>
            <button @click="bookStore.filterBooks(state.searchString)" class="text-indigo-400 hover:text-slate-50 absolute end-16 bottom-2.5 hover:bg-indigo-500 border-2 border-indigo-400 font-medium rounded text-sm px-4 py-1 mr-3">Suchen</button>
        </div>
    </div>
</template>

<style scoped>
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration { display: none; }
</style>