<script setup>
    import { reactive } from 'vue';
    import { addNewBook, editBook, deleteBook } from '../services/databaseService';
    import { useBookStore } from '../stores/bookStore';
    import constants from '../helpers/constants';
    import ErrorAlert from './alerts/ErrorAlert.vue';
    import SuccessAlert from './alerts/SuccessAlert.vue';
    
    const bookStore = useBookStore();
    const pattern = /^[A-Z]\d{4}$/;

    let state = reactive({
        bookID: bookStore.getAction === constants.ACTIONS.EDIT ? bookStore.getBookToEdit.bookID : '',
        title: bookStore.getAction === constants.ACTIONS.EDIT ? bookStore.getBookToEdit.title : '',
        author: bookStore.getAction === constants.ACTIONS.EDIT ? bookStore.getBookToEdit.author : '',
        message: '',
        showErrorAlert: false,
        showSuccessAlert: false,
        changeButtonDisabled: false
    });

    const addNewBookWithChecks = () => {
        if(!(state.bookID && state.title && state.author)) {
            state.message = "Bitte füllen Sie alle Felder aus!"
            state.showSuccessAlert = false;
            state.showErrorAlert = true;
        }
        else if(bookStore.getAllBooks.find((book) => book.Buchnummer === state.bookID)) {
            state.message = "Diese Buchnummer existiert bereits!"
            state.showSuccessAlert = false;
            state.showErrorAlert = true;
        }
        else if(!pattern.test(state.bookID)) {
            state.message = "Das Eingabemuster der Buchnummer ist fehlerhaft!"
            state.showSuccessAlert = false;
            state.showErrorAlert = true;
        }
        else {
            addNewBook(state.bookID, state.title, state.author);
            state.message = "Das Buch '" + state.title + "' wurde erfolgreich hinzugefügt!"
            state.showSuccessAlert = true;
            state.showErrorAlert = false;
        }
    }

    const editBookWithChecks = () => {
        // remove the edited book from all books and search the new bookID in all other entries to prevent duplicates in bookIDs
        const allOtherBooks = bookStore.getAllBooks.filter(book => book.Buchnummer !== bookStore.getBookToEdit.bookID);

        if(allOtherBooks.find((book) => book.Buchnummer === state.bookID)) {
            state.message = "Diese Buchnummer existiert bereits!"
            state.showSuccessAlert = false;
            state.showErrorAlert = true;
        }
        else {
            editBook(bookStore.getBookToEdit.bookID, state.bookID, state.title, state.author);
            bookStore.setAction(constants.ACTIONS.EDIT, state.bookID, state.title, state.author);
            state.message = "Das Buch wurde erfolgreich geändert!"
            state.showSuccessAlert = true;
            state.showErrorAlert = false;
        }  
    }

    const deleteBookWithChecks = () => {
        if(!state.bookID) {
            state.message = "Bitte geben Sie die Buchnummer an!"
            state.showSuccessAlert = false;
            state.showErrorAlert = true;
        }
        else if(!bookStore.getAllBooks.find((book) => book.Buchnummer === state.bookID)) {
            state.message = "Kein Buch mit der Buchnummer '" + state.bookID + "' gefunden!"
            state.showSuccessAlert = false;
            state.showErrorAlert = true;
        }
        else {
            deleteBook(state.bookID);
            state.message = "Das Buch '" + state.title + "' wurde erfolgreich gelöscht!"
            state.changeButtonDisabled = true;
            state.showSuccessAlert = true;
            state.showErrorAlert = false;
        } 
    }
</script>

<template>
    <div class="w-full max-w-lg mx-auto">
        <form class="bg-slate-100 shadow-md px-8 pt-6 pb-8 mb-4">
            <div v-if="bookStore.getAction === constants.ACTIONS.ADD" class="text-center mb-3">Neuer Eintrag</div>
            <div v-else-if="bookStore.getAction === constants.ACTIONS.EDIT" class="text-center mb-3">Eintrag bearbeiten</div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="bookID">Buchnummer</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="bookID" type="text" placeholder="S0001" pattern="[A-Z]\d{4}" v-model="state.bookID" required :disabled="state.changeButtonDisabled">
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="title">Titel</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Harry Potter" v-model="state.title" required :disabled="state.changeButtonDisabled">
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="author">Autor</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="author" type="text" placeholder="J.K. Rowling" v-model="state.author" required :disabled="state.changeButtonDisabled">
            </div>
            <ErrorAlert v-if="state.showErrorAlert" :message="state.message" />
            <SuccessAlert v-if="state.showSuccessAlert" :message="state.message" />
            <div class="flex justify-between">
                <button v-if="bookStore.getAction === constants.ACTIONS.ADD" @click="addNewBookWithChecks()" class="bg-indigo-400 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Speichern
                </button>
                <button v-if="bookStore.getAction === constants.ACTIONS.EDIT" @click="editBookWithChecks()" :class="{ 'bg-indigo-400 hover:bg-indigo-500': !state.changeButtonDisabled, 'bg-gray-400': state.changeButtonDisabled, 'text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline': true }" type="button" :disabled="state.changeButtonDisabled">
                    Ändern
                </button>
                <button v-if="bookStore.getAction === constants.ACTIONS.EDIT" @click="deleteBookWithChecks()" class="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Löschen
                </button>
            </div>
        </form>
    </div>
</template>