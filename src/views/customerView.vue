<script setup>
    import { useCustomerStore } from '../stores/customerStore';
    import SearchBar from '../components/SearchBar.vue';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faCaretDown, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
    import constants from '../helpers/constants';

    const customerStore = useCustomerStore();
</script>

<template>
    <div class="headerContainer p-3 grid grid-cols-8 gap-2 bg-slate-100">
        <SearchBar class="col-span-6" />
        <router-link to="/customerAction" @click="customerStore.setAction(constants.ACTIONS.ADD)" class="col-span-2 bg-indigo-400 hover:bg-indigo-500 text-white font-bold py-4 text-center rounded">Neuer Kunde</router-link>
    </div>
    <div class="p-4">
        <div class="py-3 font-bold">
            <ul class="gridHeader grid grid-cols-8 gap-2">
                <li class="col-span-2">Kunden ID <FontAwesomeIcon @click="customerStore.sortCustomers(constants.ID)" :icon="faCaretDown"></FontAwesomeIcon></li>
                <li class="col-span-3">Vorname <FontAwesomeIcon @click="customerStore.sortCustomers(constants.FIRSTNAME)" :icon="faCaretDown"></FontAwesomeIcon></li>
                <li class="col-span-2">Nachname <FontAwesomeIcon @click="customerStore.sortCustomers(constants.LASTNAME)" :icon="faCaretDown"></FontAwesomeIcon></li>
                <li class="col-span-1 text-center">Aktion</li>
            </ul>
        </div>
        <div class="gridContainer overflow-y-scroll">
            <div v-for="customer in customerStore.getFilteredCustomers">
                <ul class="gridData grid grid-cols-8 gap-2 py-2">
                    <li class="col-span-2">{{ customer.KunID }}</li>
                    <li class="col-span-3">{{ customer.Vorname }}</li>
                    <li class="col-span-2">{{ customer.Name }}</li>
                    <li class="col-span-1 text-center">
                        <router-link to="/customerAction" @click="customerStore.setAction(constants.ACTIONS.EDIT, customer.KunID, customer.Name, customer.Vorname)"><FontAwesomeIcon class="mr-2 cursor-pointer" :icon="faPenToSquare"></FontAwesomeIcon></router-link>
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