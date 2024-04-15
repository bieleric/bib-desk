<script setup>
    import { useBookStore } from '../stores/bookStore';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
    import BookEntryForm from '../components/BookEntryForm.vue';
    
    const bookStore = useBookStore();

</script>

<template>
    <div class="headerContainer p-3">
        <router-link to="/" class="col"><button><FontAwesomeIcon :icon="faChevronLeft"/> Zurück</button></router-link>
    </div>
    <div class="formContainer">
        <BookEntryForm />
    </div>
</template>

<style scoped>

</style>