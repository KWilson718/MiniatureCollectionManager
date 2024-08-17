// Pinia Imports
import {defineStore} from 'pinia';

// RXDB Imports
import { isRxDatabase } from 'rxdb';

import dbDexie from './dbController.ts';

export const useStore = defineStore('param', {
    state: () => ({
        nav: '',
        db: {},
    }),
    getters: {
        // Should return true if the database has been loaded, if the database can be and is then loaded into the state. Returns false elsewise.
        async isDatabaseLoaded (){
            if(isRxDatabase(this.db)){
                return true;
            }
            else{
                if(isRxDatabase(dbDexie)){
                    this.db = dbDexie;
                    return true;
                }
                else{
                    console.log("Error Loading Database, currently set to the following");
                    console.log(JSON.stringify(dbDexie));
                    return false;
                }
            }
        }
    },
    actions: {
        
    }
});