<script setup>
    import { useBookStore } from '../stores/bookStore';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
    import BookForm from '../components/BookForm.vue';
    
    const bookStore = useBookStore();

</script>

<template>
    <div class="headerContainer p-3">
        <router-link to="/" class="col"><button><FontAwesomeIcon :icon="faChevronLeft"/> Zurück</button></router-link>
    </div>
    <div class="formContainer">
        <BookForm />
    </div>
</template>

<style scoped>

</style>