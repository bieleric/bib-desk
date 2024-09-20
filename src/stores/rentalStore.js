import { defineStore } from 'pinia'
import constants from '../helpers/constants'
import { stringToDate } from '../helpers/helpers';
import { useCustomerStore } from './customerStore';
import { useBookStore } from './bookStore';

export const useRentalStore = defineStore('rentalStore', {
  state: () => ({
    rentals: [],
    filteredRentals: [],
    rentalToEdit: {},
    action: null
  }),
  getters: {
    getAllRentals: (state) => state.rentals,
    getFilteredRentals: (state) => state.filteredRentals,
    getRentalToEdit: (state) => state.rentalToEdit,
    getLatestRental: (state) => state.filteredRentals.at(-1),
    getAction: (state) => state.action
  },
  actions: {
    setupRentalStore(rentals) {
        rentals.forEach(rental => {
            this.rentals.push(rental);
        });
        this.filteredRentals = this.rentals.slice(0);
        this.sortRentals(constants.RETURN_DATE)
    },
    addRental(value) {
      this.rentals.push(value);
      this.filteredRentals = this.rentals.slice(0);
      this.sortRentals(constants.RETURN_DATE)
    },
    editRental(value) {
      let rentalToEdit = this.rentals.find(rental => rental.KunID === value.oldKunID && rental.Buchnummer === value.oldBookID);

      if (rentalToEdit) {
        rentalToEdit.KunID = value.selectedCustomer.KunID;
        rentalToEdit.Vorname = value.selectedCustomer.Vorname;
        rentalToEdit.Name = value.selectedCustomer.Name;
        rentalToEdit.Buchnummer = value.selectedBook.Buchnummer;
        rentalToEdit.Autor = value.selectedBook.Autor;
        rentalToEdit.Titel = value.selectedBook.Titel;
        rentalToEdit.Ausleihe = value.rentalDate;
        rentalToEdit.Rueckgabe = value.returnDate;
      }
      this.filteredRentals = this.rentals.slice(0);
      this.sortRentals(constants.RETURN_DATE)
    },
    deleteRental(kunID, bookID) {
      this.rentals = this.rentals.filter(rental => rental.KunID !== kunID || rental.Buchnummer !== bookID);
      this.filteredRentals = this.rentals.slice(0);
      this.sortRentals(constants.RETURN_DATE)
    },
    sortRentals(category) {
      if(category === constants.RENTAL_DATE) {
        this.filteredRentals.sort((a, b) => {
          let x = stringToDate(a.Ausleihe);
          let y = stringToDate(b.Ausleihe);
          if(x > y) { return 1; } 
          if(x < y) { return -1; }
          return 0;
        })
      }
      else if(category === constants.RETURN_DATE) {
        this.filteredRentals.sort((a, b) => {
          let x = stringToDate(a.Rueckgabe);
          let y = stringToDate(b.Rueckgabe);
          if(x > y) { return 1; } 
          if(x < y) { return -1; }
          return 0;
        })
      }
      else if(category === constants.FIRSTNAME) {
        this.filteredRentals.sort((a, b) => {
          let x = a.Vorname.toLowerCase();
          let y = b.Vorname.toLowerCase();
          if(x > y) { return 1; } 
          if(x < y) { return -1; }
          return 0;
        })
      }
      else if(category === constants.TITLE) {
        this.filteredRentals.sort((a, b) => {
          let x = a.Titel.toLowerCase();
          let y = b.Titel.toLowerCase();
          if(x > y) { return 1; } 
          if(x < y) { return -1; }
          return 0;
        })
      }
    },
    filterRentals(value) {
      this.filteredRentals = this.rentals.filter((entry) => {
        return entry.Vorname.toLowerCase().includes(value.toLowerCase()) || entry.Titel.toLowerCase().includes(value.toLowerCase()) || entry.Ausleihe.toLowerCase().includes(value.toLowerCase()) || entry.Rueckgabe.toLowerCase().includes(value.toLowerCase())
      });
      this.sortRentals(constants.RETURN_DATE);
    },
    resetFilteredRentals() {
      this.filteredRentals = this.rentals;
      this.sortRentals(constants.RETURN_DATE);
    },
    setAction(value, ...args) {
      this.action = value;

      if(args) {
        this.rentalToEdit = {
          Buchnummer: args[0],
          KunID: args[1],
          Ausleihe: args[2],
          Rueckgabe: args[3]
        }
      }
    }
  }
})