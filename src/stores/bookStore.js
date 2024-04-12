import { defineStore } from 'pinia'

export const useBookStore = defineStore('bookStore', {
  state: () => ({
    books: []
  }),
  getters: {
    getAllBooks: (state) => state.userActive
  },
  actions: {
    addBook(value) {
      this.books.push(value);
    }
  }
})