import { defineStore } from 'pinia'
import constants from '../helpers/constants'

export const useBookStore = defineStore('bookStore', {
  state: () => ({
    books: [],
    filteredBooks: []
  }),
  getters: {
    getAllBooks: (state) => state.books,
    getFilteredBooks: (state) => state.filteredBooks
  },
  actions: {
    setupBookStore(books) {
        books.forEach(book => {
            this.books.push(book);
        });
        this.filteredBooks = this.books.slice(0);
    },
    addBook(value) {
      this.books.push(value);
      this.filteredBooks = this.books.slice(0);
    },
    sortBooks(category) {
      if(category === constants.ID) {
        this.filteredBooks.sort((a, b) => {
          let x = a.Buchnummer.toLowerCase();
          let y = b.Buchnummer.toLowerCase();
          if(x > y) { return 1; } 
          if(x < y) { return -1; }
          return 0;
        })
      }
      else if(category === constants.TITLE) {
        this.filteredBooks.sort((a, b) => {
          let x = a.Titel.toLowerCase();
          let y = b.Titel.toLowerCase();
          if(x > y) { return 1; } 
          if(x < y) { return -1; }
          return 0;
        })
      }
      else if(category === constants.AUTHOR) {
        this.filteredBooks.sort((a, b) => {
          let x = a.Autor.toLowerCase();
          let y = b.Autor.toLowerCase();
          if(x > y) { return 1; } 
          if(x < y) { return -1; }
          return 0;
        })
      }
    },
    filterBooks(value) {
      this.filteredBooks = this.books.filter((entry) => {
        return entry.Titel.toLowerCase().includes(value.toLowerCase()) || entry.Buchnummer.toLowerCase().includes(value.toLowerCase()) || entry.Autor.toLowerCase().includes(value.toLowerCase())
      });
    },
    resetFilteredBooks() {
      this.filteredBooks = this.books;
    }
  }
})