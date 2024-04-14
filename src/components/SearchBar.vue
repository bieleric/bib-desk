<script setup>
    import { useBookStore } from '../stores/bookStore';

    const bookStore = useBookStore();
</script>

<template>
    <div>   
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only text-white">Suche</label>
        <div class="relative">
            <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded bg-gray-300 placeholder-gray-500" placeholder="Suche Buchnummer, Titel ..." v-model="searchString" required />
            <button @click="bookStore.resetFilteredBooks()" class="text-indigo-400 hover:text-slate-50 absolute end-2.5 bottom-2.5 hover:bg-indigo-500 border-2 border-indigo-400 font-medium rounded text-sm px-4 py-1 mr-3">X</button>
            <button @click="bookStore.filterBooks(searchString)" class="text-indigo-400 hover:text-slate-50 absolute end-16 bottom-2.5 hover:bg-indigo-500 border-2 border-indigo-400 font-medium rounded text-sm px-4 py-1 mr-3">Suchen</button>
        </div>
    </div>
</template>

<style scoped>

</style>