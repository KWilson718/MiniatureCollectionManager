<template>
    <h1>This is the Category Read Page</h1>
    <br>
    <h3>The Current Selected Category is</h3>
</template>

<script>

import { onMounted, watch } from 'vue';
import { useStore } from '../../lib/store'; // Adjust the import path as needed

const store = useStore();

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

// import dbController from '../../lib/dbController';

// export default {
//     computed: {
//         async categoryID() {
//             return await dbController.getCategory(this.$router.params.id);
//         }
//     }
// }

</script>