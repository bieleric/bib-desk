<script setup>
    import { reactive, computed } from 'vue';
    import { useNavigationStore } from '../stores/navigationStore';
    import { useBookStore } from '../stores/bookStore';
    import { useCustomerStore } from '../stores/customerStore';
    import { useRentalStore } from '../stores/rentalStore';
    import constants from '../helpers/constants';

    const navigationStore = useNavigationStore();
    const bookStore = useBookStore();
    const customerStore = useCustomerStore();
    const rentalStore = useRentalStore();

    const state = reactive({
        searchString: '',
    });

    const placeholder = computed(() => {
        if(navigationStore.getCurrentTab === constants.BOOKS) {
            return 'Suche Buchnummer, Titel ...';
        }
        else if(navigationStore.getCurrentTab === constants.CUSTOMERS) {
            return 'Suche Kunden ID, Name ...';
        }
        else if(navigationStore.getCurrentTab === constants.RENTAL) {
            return 'Suche Name, Buchtitel ...';
        }

        return 'Suche ...';
    });

    const resetFilter = () => {
        if(navigationStore.getCurrentTab === constants.BOOKS) {
            bookStore.resetFilteredBooks(); 
            state.searchString = '';
        }
        else if(navigationStore.getCurrentTab === constants.CUSTOMERS) {
            customerStore.resetFilteredCustomers(); 
            state.searchString = '';
        }
        else if(navigationStore.getCurrentTab === constants.RENTAL) {
            rentalStore.resetFilteredRentals(); 
            state.searchString = '';
        }
    }

    const filter = () => {
        if(navigationStore.getCurrentTab === constants.BOOKS) {
            bookStore.filterBooks(state.searchString);
        }
        else if(navigationStore.getCurrentTab === constants.CUSTOMERS) {
            customerStore.filterCustomers(state.searchString);
        }
        else if(navigationStore.getCurrentTab === constants.RENTAL) {
            rentalStore.filterRentals(state.searchString);
        }
    }

</script>

<template>
    <div>   
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only text-white">Suche</label>
        <div class="relative">
            <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded bg-gray-300 placeholder-gray-500" :placeholder="placeholder" v-model="state.searchString" required />
            <button @click="resetFilter" class="text-indigo-400 hover:text-slate-50 absolute end-2.5 bottom-2.5 hover:bg-indigo-500 border-2 border-indigo-400 font-medium rounded text-sm px-4 py-1 mr-3">X</button>
            <button @click="filter" class="text-indigo-400 hover:text-slate-50 absolute end-16 bottom-2.5 hover:bg-indigo-500 border-2 border-indigo-400 font-medium rounded text-sm px-4 py-1 mr-3">Suchen</button>
        </div>
    </div>
</template>

<style scoped>
    input[type="search"]::-webkit-search-decoration,
    input[type="search"]::-webkit-search-cancel-button,
    input[type="search"]::-webkit-search-results-button,
    input[type="search"]::-webkit-search-results-decoration { display: none; }
</style>