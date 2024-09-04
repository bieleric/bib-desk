import { defineStore } from 'pinia'
import constants from '../helpers/constants'

export const useCustomerStore = defineStore('customerStore', {
  state: () => ({
    customers: [],
    filteredCustomers: [],
    customerToEdit: {},
    action: null
  }),
  getters: {
    getAllCustomers: (state) => state.customers,
    getFilteredCustomers: (state) => state.filteredCustomers,
    getCustomerToEdit: (state) => state.customerToEdit,
    getLatestCustomer: (state) => state.filteredCustomers.at(-1),
    getAction: (state) => state.action
  },
  actions: {
    setupCustomerStore(customers) {
        customers.forEach(customer => {
            this.customers.push(customer);
        });
        this.filteredCustomers = this.customers.slice(0);
        this.sortCustomers(constants.ID)
    },
    addCustomer(value) {
      this.customers.push(value);
      this.filteredCustomers = this.customers.slice(0);
      this.sortCustomers(constants.ID)
    },
    editCustomer(value) {
      let customerToEdit = this.customers.find(customer => customer.KunID === value.oldKunID);
      if (customerToEdit) {
        customerToEdit.KunID = value.kunID;
        customerToEdit.Name = value.lastname;
        customerToEdit.Vorname = value.firstname;
      }
      this.filteredCustomers = this.customers.slice(0);
      this.sortCustomers(constants.ID)
    },
    deleteCustomer(kunID) {
      this.customers = this.customers.filter(customer => customer.KunID !== kunID);
      this.filteredCustomers = this.customers.slice(0);
      this.sortCustomers(constants.ID)
    },
    sortCustomers(category) {
      if(category === constants.ID) {
        this.filteredCustomers.sort((a, b) => {
          let x = a.KunID.toLowerCase();
          let y = b.KunID.toLowerCase();
          if(x > y) { return 1; } 
          if(x < y) { return -1; }
          return 0;
        })
      }
      else if(category === constants.FIRSTNAME) {
        this.filteredCustomers.sort((a, b) => {
          let x = a.Vorname.toLowerCase();
          let y = b.Vorname.toLowerCase();
          if(x > y) { return 1; } 
          if(x < y) { return -1; }
          return 0;
        })
      }
      else if(category === constants.LASTNAME) {
        this.filteredCustomers.sort((a, b) => {
          let x = a.Name.toLowerCase();
          let y = b.Name.toLowerCase();
          if(x > y) { return 1; } 
          if(x < y) { return -1; }
          return 0;
        })
      }
    },
    filterCustomers(value) {
      this.filteredCustomers = this.customers.filter((entry) => {
        return entry.Name.toLowerCase().includes(value.toLowerCase()) || entry.KunID.toLowerCase().includes(value.toLowerCase()) || entry.Vorname.toLowerCase().includes(value.toLowerCase())
      });
      this.sortCustomers(constants.ID)
    },
    resetFilteredCustomers() {
      this.filteredCustomers = this.customers;
      this.sortCustomers(constants.ID)
    },
    setAction(value, ...args) {
      this.action = value;

      if(args) {
        this.customerToEdit = {
          kunID: args[0],
          lastname: args[1],
          firstname: args[2]
        }
      }
    }
  }
})