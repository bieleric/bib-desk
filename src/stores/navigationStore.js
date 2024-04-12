import { defineStore } from 'pinia';
import constants from '../helpers/constants';

export const useNavigationStore = defineStore('navigationStore', {
  state: () => ({
    currentTab: constants.BOOKS
  }),
  getters: {
    getCurrentTab: (state) => state.currentTab
  },
  actions: {
    changeTab(value) {
      this.currentTab = value;
    }
  }
})