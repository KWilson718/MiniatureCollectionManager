<template>
    <v-sheet class="mx-auto" height="50%" width="50%">
      <br>
      <br>  
      <div v-if="store.dbInitialized">
        <h2>Categories</h2>
        <ul>
          <li v-for="category in store.getDBCategories" :key="category.id">
            {{ category.name }}
          </li>
        </ul>
      </div>
  
      <div v-else>
        <p>Loading data...</p>
      </div>
      <br>
      <br>
      <v-btn variant="outlined" to="/category-create">
        Create Category
      </v-btn>
    </v-sheet>
  </template>
  
  <script setup>
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router'; // Import useRoute to watch route changes
import { useStore } from '../../lib/store'; // Adjust the import path as needed

const store = useStore();
const route = useRoute(); // Get the current route

const loadData = async () => {
  try {
    await store.loadData(); // Load data when needed
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
  