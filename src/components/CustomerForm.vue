<script setup>
    import { reactive, computed, watch } from 'vue';
    import { addNewCustomer, editCustomer, deleteCustomer } from '../services/databaseService';
    import constants from '../helpers/constants';
    import ErrorAlert from './alerts/ErrorAlert.vue';
    import SuccessAlert from './alerts/SuccessAlert.vue';
    import { useCustomerStore } from '../stores/customerStore';
    
    const customerStore = useCustomerStore();
    const pattern = /^\d{4}$/;

    const kunID = computed(() => {
        const latestCustomer = customerStore.getLatestCustomer;
        const idSuggestionNumber = parseInt(latestCustomer.KunID, 10) + 1;
        const idSuggestion = idSuggestionNumber.toString().padStart(4, '0');
        return customerStore.getAction === constants.ACTIONS.EDIT ? customerStore.getCustomerToEdit.kunID : idSuggestion;
    });

    let state = reactive({
        kunID: '',
        firstname: customerStore.getAction === constants.ACTIONS.EDIT ? customerStore.getCustomerToEdit.firstname : '',
        lastname: customerStore.getAction === constants.ACTIONS.EDIT ? customerStore.getCustomerToEdit.lastname : '',
        message: '',
        showErrorAlert: false,
        showSuccessAlert: false,
        changeButtonDisabled: false
    });

    watch(kunID, (newVal) => {
        state.kunID = newVal;
    }, { immediate: true });

    const addNewCustomerWithChecks = () => {
        if(!(state.kunID && state.firstname && state.lastname)) {
            state.message = "Bitte füllen Sie alle Felder aus!"
            state.showSuccessAlert = false;
            state.showErrorAlert = true;
        }
        else if(customerStore.getAllCustomers.find((customer) => customer.KunID === state.kunID)) {
            state.message = "Diese Kunden ID existiert bereits!"
            state.showSuccessAlert = false;
            state.showErrorAlert = true;
        }
        else if(!pattern.test(state.kunID)) {
            state.message = "Das Eingabemuster der Kunden ID ist fehlerhaft! (4 Ziffern)"
            state.showSuccessAlert = false;
            state.showErrorAlert = true;
        }
        else {
            addNewCustomer(state.kunID, state.firstname, state.lastname);
            state.message = "Der Kunde '" + state.firstname + ' ' + state.lastname + "' wurde erfolgreich hinzugefügt!"
            state.showSuccessAlert = true;
            state.showErrorAlert = false;
        }
    }

    const editCustomerWithChecks = () => {
        // remove the edited book from all books and search the new bookID in all other entries to prevent duplicates in bookIDs
        const allOtherCustomers = customerStore.getAllCustomers.filter(customer => customer.KunID !== customerStore.getCustomerToEdit.kunID);

        if(allOtherCustomers.find((customer) => customer.KunID === kunID)) {
            state.message = "Diese Kunden ID existiert bereits!"
            state.showSuccessAlert = false;
            state.showErrorAlert = true;
        }
        else {
            editCustomer(customerStore.getCustomerToEdit.kunID, state.kunID, state.lastname, state.firstname);
            customerStore.setAction(constants.ACTIONS.EDIT, state.kunID, state.lastname, state.firstname);
            state.message = "Die Daten des Kunden wurden erfolgreich geändert!"
            state.showSuccessAlert = true;
            state.showErrorAlert = false;
        }  
    }

    const deleteCustomerWithChecks = () => {
        if(!state.kunID) {
            state.message = "Bitte geben Sie die Kunden ID an!"
            state.showSuccessAlert = false;
            state.showErrorAlert = true;
        }
        else if(!customerStore.getAllCustomers.find((customer) => customer.KunID === state.kunID)) {
            state.message = "Kein Kunde mit der Kunden ID '" + state.kunID + "' gefunden!"
            state.showSuccessAlert = false;
            state.showErrorAlert = true;
        }
        else {
            deleteCustomer(state.kunID);
            state.message = "Der Kunde '" + state.firstname + ' ' + state.lastname + "' wurde erfolgreich gelöscht!"
            state.changeButtonDisabled = true;
            state.showSuccessAlert = true;
            state.showErrorAlert = false;
        } 
    }
</script>

<template>
    <div class="w-full max-w-lg mx-auto">
        <form class="bg-slate-100 shadow-md px-8 pt-6 pb-8 mb-4">
            <div v-if="customerStore.getAction === constants.ACTIONS.ADD" class="text-center mb-3">Neuer Kunde</div>
            <div v-else-if="customerStore.getAction === constants.ACTIONS.EDIT" class="text-center mb-3">Kunde bearbeiten</div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="bookID">Kunden ID</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="bookID" type="text" placeholder="0001" pattern="[A-Z]\d{4}" v-model="state.kunID" required :disabled="state.changeButtonDisabled">
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="title">Vorname</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Max" v-model="state.firstname" required :disabled="state.changeButtonDisabled">
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="author">Nachname</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="author" type="text" placeholder="Mustermann" v-model="state.lastname" required :disabled="state.changeButtonDisabled">
            </div>
            <ErrorAlert v-if="state.showErrorAlert" :message="state.message" />
            <SuccessAlert v-if="state.showSuccessAlert" :message="state.message" />
            <div class="flex justify-between">
                <button v-if="customerStore.getAction === constants.ACTIONS.ADD" @click="addNewCustomerWithChecks()" class="bg-indigo-400 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Speichern
                </button>
                <button v-if="customerStore.getAction === constants.ACTIONS.EDIT" @click="editCustomerWithChecks()" :class="{ 'bg-indigo-400 hover:bg-indigo-500': !state.changeButtonDisabled, 'bg-gray-400': state.changeButtonDisabled, 'text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline': true }" type="button" :disabled="state.changeButtonDisabled">
                    Ändern
                </button>
                <button v-if="customerStore.getAction === constants.ACTIONS.EDIT" @click="deleteCustomerWithChecks()" class="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Löschen
                </button>
            </div>
        </form>
    </div>
</template>