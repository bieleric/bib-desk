import { defineStore } from 'pinia'
import constants from '../helpers/constants'

export const useBookStore = defineStore('bookStore', {
  state: () => ({
    books: [],
  }),
  getters: {
    getAllBooks: (state) => state.books
  },
  actions: {
    setupBookStore(books) {
        books.forEach(book => {
            this.books.push(book);
        });
    },
    addBook(value) {
      this.books.push(value);
    },
    sortBooks(category) {
      if(category === constants.ID) {
        this.books.sort((a, b) => {
          let x = a.Buchnummer.toLowerCase();
          let y = b.Buchnummer.toLowerCase();
          if(x > y) { return 1; } 
          if(x < y) { return -1; }
          return 0;
        })
      }
      else if(category === constants.TITLE) {
        this.books.sort((a, b) => {
          let x = a.Titel.toLowerCase();
          let y = b.Titel.toLowerCase();
          if(x > y) { return 1; } 
          if(x < y) { return -1; }
          return 0;
        })
      }
      else if(category === constants.AUTHOR) {
        this.books.sort((a, b) => {
          let x = a.Autor.toLowerCase();
          let y = b.Autor.toLowerCase();
          if(x > y) { return 1; } 
          if(x < y) { return -1; }
          return 0;
        })
      }
    }
  }
})