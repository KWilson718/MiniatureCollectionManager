import { defineStore } from 'pinia';
import { Category, Group, checkInitialization, getCategories, getGroups } from './dbController';

interface State {
  dbInit: boolean;
  dbCategories: Array<Partial<Category>>; // Simplified type, not directly using RxDocument
  dbGroups: Array<Partial<Group>>;        // Simplified type, not directly using RxDocument
}

export const useStore = defineStore('collectionStore', {
  state: (): State => ({
    dbInit: false,
    dbCategories: [],
    dbGroups: [],
  }),

  getters: {
    dbInitialized: (state): boolean => state.dbInit,
    getDBCategories: (state): Array<Partial<Category>> => state.dbCategories,
    getDBGroups: (state): Array<Partial<Group>> => state.dbGroups,
  },

  actions: {
    async initializeDatabase() {
      this.dbInit = await checkInitialization();
    },

    async loadData() {
      const categories = await getCategories();
      const groups = await getGroups();

      // Map RxDocuments to plain objects or simplified types
      this.dbCategories = categories.map(cat => cat.toJSON());
      this.dbGroups = groups.map(group => group.toJSON());
    }
  },
});
