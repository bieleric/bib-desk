<script setup>
    import { useRouter } from 'vue-router';
    import { useNavigationStore } from '../stores/navigationStore';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
    import BookForm from '../components/BookForm.vue';
    import CustomerForm from '../components/CustomerForm.vue';
    import RentalForm from '../components/RentalForm.vue';
    import constants from '../helpers/constants';


    const router = useRouter();
    const navigationStore = useNavigationStore();

    function goBack() {
        router.back();
    }
</script>

<template>
    <div class="headerContainer p-3">
        <button @click="goBack" class="col"><FontAwesomeIcon :icon="faChevronLeft"/> Zurück</button>
    </div>
    <div class="formContainer">
        <BookForm v-if="navigationStore.getCurrentTab === constants.BOOKS" />
        <CustomerForm v-if="navigationStore.getCurrentTab === constants.CUSTOMERS" />
        <RentalForm v-if="navigationStore.getCurrentTab === constants.RENTAL" />
    </div>
</template>

<style scoped>

</style>