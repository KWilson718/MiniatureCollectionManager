<template>
    <h1>This is the Category Read Page</h1>
    <br>
    <h3>The Current Selected Category is</h3>
</template>

<script setup>

import { onMounted, watch } from 'vue';
import { useStore } from '../../lib/store'; // Adjust the import path as needed
import { useRoute, useRouter } from 'vue-router'; // Import useRoute to watch route changes

const store = useStore();
const route = useRoute();
const router = useRouter();

const loadData = async () => {
  try {
    await store.loadData(); // Load data when needed
  } catch (error) {
    console.error('Error during store initialization or data loading:', error);
  }
};

const loadCategory = async () => {
    try {
        await store.loadCollectionData(1, [route.params.id]);
    }
    catch (error){
        console.error("Error during the category document", error);
    }
}

// Load data when the component is mounted
onMounted(() => {
  loadData();
  loadCategory();
  console.log("The Current Route Parameter is: ", route.params.id);
});

// Watch for route changes and reload data if necessary
watch(route, () => {
  loadData();
});

</script>