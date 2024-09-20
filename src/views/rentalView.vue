<script setup>
    import { useRentalStore } from '../stores/rentalStore';
    import SearchBar from '../components/SearchBar.vue';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faCaretDown, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
    import constants from '../helpers/constants';

    const rentalStore = useRentalStore();
</script>

<template>
    <div class="headerContainer p-3 grid grid-cols-8 gap-2 bg-slate-100">
        <SearchBar class="col-span-6" />
        <router-link to="/rentalAction" @click="rentalStore.setAction(constants.ACTIONS.ADD)" class="col-span-2 bg-indigo-400 hover:bg-indigo-500 text-white font-bold py-4 text-center rounded">Buch verleihen</router-link>
    </div>
    <div class="p-4">
        <div class="py-3 font-bold">
            <ul class="gridHeader grid grid-cols-11 gap-2">
                <li class="col-span-3">Name <FontAwesomeIcon @click="rentalStore.sortRentals(constants.FIRSTNAME)" :icon="faCaretDown"></FontAwesomeIcon></li>
                <li class="col-span-3">Buch <FontAwesomeIcon @click="rentalStore.sortRentals(constants.TITLE)" :icon="faCaretDown"></FontAwesomeIcon></li>
                <li class="col-span-2">Ausleihe <FontAwesomeIcon @click="rentalStore.sortRentals(constants.RENTAL_DATE)" :icon="faCaretDown"></FontAwesomeIcon></li>
                <li class="col-span-2">Rückgabe <FontAwesomeIcon @click="rentalStore.sortRentals(constants.RETURN_DATE)" :icon="faCaretDown"></FontAwesomeIcon></li>
                <li class="col-span-1 text-center">Aktion</li>
            </ul>
        </div>
        <div class="gridContainer overflow-y-scroll">
            <div v-for="rental in rentalStore.getFilteredRentals">
                <ul class="gridData grid grid-cols-11 gap-2 py-2">
                    <li class="col-span-3">{{ rental.Vorname }} {{ rental.Name }}</li>
                    <li class="col-span-3">{{ rental.Titel }}</li>
                    <li class="col-span-2">{{ rental.Ausleihe }}</li>
                    <li class="col-span-2">{{ rental.Rueckgabe }}</li>
                    <li class="col-span-1 text-center">
                        <router-link to="/customerAction" @click="rentalStore.setAction(constants.ACTIONS.EDIT, rental.Buchnummer, rental.KunID, rental.Ausleihe, rental.Rueckgabe)"><FontAwesomeIcon class="mr-2 cursor-pointer" :icon="faPenToSquare"></FontAwesomeIcon></router-link>
                    </li>
                </ul>
                <hr />
            </div>
        </div>
    </div>
</template>

<style scoped>
    .gridContainer {
        height: calc(100vh - 150px);
    }
</style>