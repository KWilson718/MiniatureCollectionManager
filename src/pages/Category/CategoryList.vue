<template>
    <v-sheet class="mx-auto" height="90%" width="50%">
      <br>
      <h1>Categories</h1>
      <br>
      <v-divider></v-divider>
      <v-alert text="Click Create Category to Create Your First Category" variant="outlined" v-if="store.dbInitialized && (store.getDBCategories.length == 0)"></v-alert>
      <v-list v-else-if="store.dbInitialized" :items="items">
      </v-list>
      <v-alert text="Loading Database..." variant="outlined" v-else></v-alert>
      <br>
      <v-btn variant="outlined" to="/category-create">
        Create Category
      </v-btn>
    </v-sheet>
  </template>
  
  <script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router'; // Import useRoute to watch route changes
import { useStore } from '../../lib/store'; // Adjust the import path as needed

const store = useStore();
const route = useRoute(); // Get the current route
const items = ref([]); // This will hold the formatted items for v-list

const loadData = async () => {
  try {
    await store.loadData(); // Load data when needed
    items.value = await store.generateItemsArray(0); // Fetch and store items
  } catch (error) {
    console.error('Error during store initialization or data loading:', error);
  }
};

// Load data when the component is mounted
onMounted(() => {
  loadData();
});

// Watch for route changes and reload data if necessary
watch(route, () => {
  loadData();
});
</script>