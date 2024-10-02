import { defineStore } from 'pinia';
import { Category, Group, checkInitialization, getCategories, getCategory, getGroups } from './dbController';
import { generateItemsArray } from '../modules/generateItemsArray.ts';


interface State {
  dbInit: boolean;
  dbCategories: Array<Partial<Category>>; // Simplified type, not directly using RxDocument
  dbGroups: Array<Partial<Group>>;        // Simplified type, not directly using RxDocument
  responsiveDbCategories: Array<Partial<Category>>; // Will be used to Dynamically Load Data
  responsiveDbGroups: Array<Partial<Group>>; // Will be used to Dynamically Load Data
}

export const useStore = defineStore('collectionStore', {
  state: (): State => ({
    dbInit: false,
    dbCategories: [],
    dbGroups: [],
    responsiveDbCategories: [],
    responsiveDbGroups: [],
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
      try{
        await this.initializeDatabase();
        const categories = await getCategories();
        const groups = await getGroups();
        console.log("Categories Are: ", categories);
        console.log("Groups Are: ", groups);

        // Map RxDocuments to plain objects or simplified types
        this.dbCategories = categories.map(cat => cat.toJSON());
        this.dbGroups = groups.map(group => group.toJSON());
      }
      catch(error) {
        console.error('Error during data loading:', error);
      }
    },

    async loadCollectionData(type: number, IDs: Array<string> = []) {
      try{
        await this.initializeDatabase();
        let categories;
        // let groups; // Held for future use

        switch (type) {
          case 0:
            categories = await getCategories();
            console.log("Categories Are: ", categories);
            this.responsiveDbCategories = categories.map(cat => cat.toJSON());
            break;
          case 1:
            categories = await getCategory(IDs[0]);
            this.responsiveDbCategories = [categories.toJSON()];
            console.log("Category Grabbed: ", categories);
            break;
          default:
            console.error("Dynamic Data Loader Failed, Type Set to: ", type);
        }
      }
      catch (error){
        console.error("Error during dynamic data loading: ", error);
      }
    },

    async generateItemsArray(type: number) {
      try{
        if(!this.dbInit){
          this.loadData();
        }

        switch(type){
          case 0:
            return await generateItemsArray(this.dbCategories);          
        }
      }
      catch(error){
        console.error("Error Generating Items:", error);
      }
    }
  },
});
