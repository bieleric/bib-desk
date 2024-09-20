<script setup>
    import { reactive, computed, watch } from 'vue';
    import { addNewRental, editRental, deleteRental } from '../services/databaseService';
    import constants from '../helpers/constants';
    import { getCurrentDateFormatted, getDateInTwoWeeksFormatted } from '../helpers/helpers';
    import ErrorAlert from './alerts/ErrorAlert.vue';
    import SuccessAlert from './alerts/SuccessAlert.vue';
    import { useRentalStore } from '../stores/rentalStore';
    import { useBookStore } from '../stores/bookStore';
    import { useCustomerStore } from '../stores/customerStore';
    
    const rentalStore = useRentalStore();
    const bookStore = useBookStore();
    const customerStore = useCustomerStore();
    const pattern = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d{2}$/;

    let state = reactive({
        selectedBookID: rentalStore.getAction === constants.ACTIONS.EDIT ? rentalStore.getRentalToEdit.Buchnummer : '',
        selectedCustomerID: rentalStore.getAction === constants.ACTIONS.EDIT ? rentalStore.getRentalToEdit.KunID : '',
        rental: rentalStore.getAction === constants.ACTIONS.EDIT ? rentalStore.getRentalToEdit.Ausleihe : getCurrentDateFormatted(),
        return: rentalStore.getAction === constants.ACTIONS.EDIT ? rentalStore.getRentalToEdit.Rueckgabe : getDateInTwoWeeksFormatted(),
        message: '',
        showErrorAlert: false,
        showSuccessAlert: false,
        changeButtonDisabled: false
    });

    const addNewRentalWithChecks = () => {
        if(!(state.selectedBookID && state.selectedCustomerID && state.rental && state.return)) {
            state.message = "Bitte füllen Sie alle Felder aus!"
            state.showSuccessAlert = false;
            state.showErrorAlert = true;
        }
        else if(!pattern.test(state.rental) || !pattern.test(state.return)) {
            state.message = "Geben Sie ein gültiges Datumsformat an! (TT.MM.JJJJ)"
            state.showSuccessAlert = false;
            state.showErrorAlert = true;
        }
        else {
            const selectedBook = bookStore.getBookByBookID(state.selectedBookID);
            const selectedCustomer = customerStore.getCustomerByCustomerID(state.selectedCustomerID);
            
            addNewRental(selectedCustomer.KunID, selectedCustomer.Vorname, selectedCustomer.Name, selectedBook.Buchnummer, selectedBook.Autor, selectedBook.Titel, state.rental, state.return);

            state.message = "Das Buch '" + selectedBook.Titel + "' wurde an '" + selectedCustomer.Vorname + ' ' + selectedCustomer.Name + "' verliehen!";
            state.showSuccessAlert = true;
            state.showErrorAlert = false;
        }
    }

    const editRentalWithChecks = () => {
        const allOtherRentals = rentalStore.getAllRentals.filter(rental => rental.KunID !== rentalStore.getRentalToEdit.KunID || rental.Buchnummer !== rentalStore.getRentalToEdit.Buchnummer);

        if(allOtherRentals.find((rental) => rental.KunID === state.selectedCustomerID && rental.Buchnummer === state.selectedBookID)) {
            state.message = "Diese Ausleihe existiert bereits!"
            state.showSuccessAlert = false;
            state.showErrorAlert = true;
        }
        else {
            const selectedBook = bookStore.getBookByBookID(state.selectedBookID);
            const selectedCustomer = customerStore.getCustomerByCustomerID(state.selectedCustomerID);

            editRental(rentalStore.getRentalToEdit.KunID, rentalStore.getRentalToEdit.Buchnummer, selectedBook, selectedCustomer, state.rental, state.return);
            rentalStore.setAction(constants.ACTIONS.EDIT, state.selectedBookID, state.selectedCustomerID, state.rental, state.return);
            state.message = "Die Daten der Ausleihe wurden erfolgreich geändert!"
            state.showSuccessAlert = true;
            state.showErrorAlert = false;
        }  
    }

    const deleteRentalWithChecks = () => {
        if(!rentalStore.getAllRentals.find((rental) => rental.KunID === state.selectedCustomerID && rental.Buchnummer === state.selectedBookID)) {
            state.message = "Keine Ausleihe für den Kunden und dem ausgewählten Buch gefunden";
            state.showSuccessAlert = false;
            state.showErrorAlert = true;
        }
        else {
            const selectedBook = bookStore.getBookByBookID(state.selectedBookID);
            const selectedCustomer = customerStore.getCustomerByCustomerID(state.selectedCustomerID);

            deleteRental(state.selectedCustomerID, state.selectedBookID);
            state.message = "Die Ausleihe für das Buch '" + selectedBook.Titel + "' für den Kunden '" + selectedCustomer.Vorname + " " + selectedCustomer.Name + "' wurde beendet!";
            state.changeButtonDisabled = true;
            state.showSuccessAlert = true;
            state.showErrorAlert = false;
        } 
    }
</script>

<template>
    <div class="w-full max-w-lg mx-auto">
        <form class="bg-slate-100 shadow-md px-8 pt-6 pb-8 mb-4">
            <div v-if="rentalStore.getAction === constants.ACTIONS.ADD" class="text-center mb-3">Buch verleihen</div>
            <div v-else-if="rentalStore.getAction === constants.ACTIONS.EDIT" class="text-center mb-3">Ausleihe bearbeiten</div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="bookID">Buch</label>
                <select
                    id="bookSelect"
                    v-model="state.selectedBookID"
                    class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    required
                >
                    <option disabled value=''>Bitte ein Buch auswählen</option>
                    <option v-for="book in bookStore.getAllBooks" :key="book.Buchnummer" :value="book.Buchnummer">
                        {{ book.Buchnummer + ' | '}} {{ book.Titel }}
                    </option>
                </select>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="bookID">Kunde</label>
                <select
                    id="customerSelect"
                    v-model="state.selectedCustomerID"
                    class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    required
                >
                    <option disabled value=''>Bitte einen Kunden auswählen</option>
                    <option v-for="customer in customerStore.getAllCustomers" :key="customer.KunID" :value="customer.KunID">
                        {{ customer.KunID + ' | '}} {{ customer.Vorname }} {{ customer.Name }} 
                    </option>
                </select>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="rental">Ausleihe</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="rental" type="text" placeholder="01.01.2024" pattern="^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d{2}$" v-model="state.rental" required :disabled="state.changeButtonDisabled">
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="return">Rückgabe</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="return" type="text" placeholder="15.01.2024" pattern="^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d{2}$" v-model="state.return" required :disabled="state.changeButtonDisabled">
            </div>
            <ErrorAlert v-if="state.showErrorAlert" :message="state.message" />
            <SuccessAlert v-if="state.showSuccessAlert" :message="state.message" />
            <div class="flex justify-between">
                <button v-if="rentalStore.getAction === constants.ACTIONS.ADD" @click="addNewRentalWithChecks()" class="bg-indigo-400 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Speichern
                </button>
                <button v-if="rentalStore.getAction === constants.ACTIONS.EDIT" @click="editRentalWithChecks()" :class="{ 'bg-indigo-400 hover:bg-indigo-500': !state.changeButtonDisabled, 'bg-gray-400': state.changeButtonDisabled, 'text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline': true }" type="button" :disabled="state.changeButtonDisabled">
                    Ändern
                </button>
                <button v-if="rentalStore.getAction === constants.ACTIONS.EDIT" @click="deleteRentalWithChecks()" class="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Löschen
                </button>
            </div>
        </form>
    </div>
</template>