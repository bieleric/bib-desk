<script setup>
    import { useNavigationStore } from '../stores/navigationStore';
    import constants from '../helpers/constants';

    const navigationStore = useNavigationStore();
</script>

<template>
    <div class="p-6 bg-indigo-900 text-slate-400">
        <ul class="flex justify-around">
            <li @click="navigationStore.changeTab(constants.BOOKS)" :class="{ 'cursor-pointer': true, 'underline text-slate-200': navigationStore.getCurrentTab === constants.BOOKS }">Bücher</li>
            <li @click="navigationStore.changeTab(constants.CUSTOMERS)" :class="{ 'cursor-pointer': true, 'underline text-slate-200': navigationStore.getCurrentTab === constants.CUSTOMERS }">Kunden</li>
            <li @click="navigationStore.changeTab(constants.RENTAL)" :class="{ 'cursor-pointer': true, 'underline text-slate-200': navigationStore.getCurrentTab === constants.RENTAL }">Verleih</li>
        </ul>
    </div>
</template>

<style scoped>

</style>