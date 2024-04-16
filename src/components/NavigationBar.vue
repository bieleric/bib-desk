<script setup>
    import { useNavigationStore } from '../stores/navigationStore';
    import constants from '../helpers/constants';

    const navigationStore = useNavigationStore();
</script>

<template>
    <div class="p-6 bg-indigo-900 text-slate-400 sticky top-0">
        <ul class="flex justify-around">
            <router-link to="/" @click="navigationStore.changeTab(constants.BOOKS)"><li :class="{ 'cursor-pointer': true, 'underline text-slate-200': navigationStore.getCurrentTab === constants.BOOKS }">Bücher</li></router-link>
            <router-link to="/customers" @click="navigationStore.changeTab(constants.CUSTOMERS)"><li :class="{ 'cursor-pointer': true, 'underline text-slate-200': navigationStore.getCurrentTab === constants.CUSTOMERS }">Kunden</li></router-link>
            <router-link to="/rental" @click="navigationStore.changeTab(constants.RENTAL)"><li :class="{ 'cursor-pointer': true, 'underline text-slate-200': navigationStore.getCurrentTab === constants.RENTAL }">Verleih</li></router-link>
        </ul>
    </div>
</template>

<style scoped>

</style>