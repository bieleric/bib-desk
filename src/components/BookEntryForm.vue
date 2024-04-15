<script setup>

</script>

<template>
    <div class="w-full max-w-lg mx-auto">
        <form class="bg-slate-100 shadow-md px-8 pt-6 pb-8 mb-4">
            <div class="text-center mb-3">Neuer Bucheintrag</div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="bookID">Buchnummer</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="bookID" type="text" placeholder="S0001">
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="title">Titel</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Harry Potter">
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="author">Autor</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="author" type="text" placeholder="J.K. Rowling">
            </div>
            <div>
                <button class="bg-indigo-400 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Speichern
                </button>
            </div>
        </form>
    </div>
</template>