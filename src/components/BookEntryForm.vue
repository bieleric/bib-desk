<script setup>
    import { reactive } from 'vue';
    import { addNewBook } from '../services/databaseService';
    import { useBookStore } from '../stores/bookStore';
    import ErrorAlert from './alerts/ErrorAlert.vue';
    import SuccessAlert from './alerts/SuccessAlert.vue';

    const bookStore = useBookStore();
    const pattern = /^[A-Z]\d{4}$/;

    let state = reactive({
        bookID: '',
        title: '',
        author: '',
        message: '',
        showErrorAlert: false,
        showSuccessAlert: false
    });

    const addNewBookWithChecks = () => {
        if(!(state.bookID && state.title && state.author)) {
            state.message = "Bitte füllen Sie alle Felder aus!"
            state.showErrorAlert = true;
        }
        else if(bookStore.getAllBooks.find((book) => book.Buchnummer === state.bookID)) {
            state.message = "Diese Buchnummer existiert bereits!"
            state.showErrorAlert = true;
        }
        else if(!pattern.test(state.bookID)) {
            state.message = "Das Eingabemuster der Buchnummer ist fehlerhaft!"
            state.showErrorAlert = true;
        }
        else {
            addNewBook(state.bookID, state.title, state.author).then((result) => {
            });
            state.message = "Das Buch '" + state.title + "' wurde erfolgreich hinzugefügt!"
            state.showSuccessAlert = true;
            state.showErrorAlert = false;
        }
    }
</script>

<template>
    <div class="w-full max-w-lg mx-auto">
        <form class="bg-slate-100 shadow-md px-8 pt-6 pb-8 mb-4">
            <div class="text-center mb-3">Neuer Bucheintrag</div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="bookID">Buchnummer</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="bookID" type="text" placeholder="S0001" pattern="[A-Z]\d{4}" v-model="state.bookID" required>
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="title">Titel</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Harry Potter" v-model="state.title" required>
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="author">Autor</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="author" type="text" placeholder="J.K. Rowling" v-model="state.author" required>
            </div>
            <ErrorAlert v-if="state.showErrorAlert" :message="state.message" />
            <SuccessAlert v-if="state.showSuccessAlert" :message="state.message" />
            <div>
                <button @click="addNewBookWithChecks()" class="bg-indigo-400 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Speichern
                </button>
            </div>
        </form>
    </div>
</template>