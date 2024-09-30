<template>
  <v-sheet class="mx-auto" height="90%" width="50%">
    <br>
    <h1>Categories</h1>
    <br>
    <v-divider></v-divider>
    <v-alert text="Click Create Category to Create Your First Category" variant="outlined" v-if="store.dbInitialized && (store.getDBCategories.length == 0)"></v-alert>
    
    <v-list v-else-if="store.dbInitialized">

      <v-list-item
        v-for="(item, index) in items"
        :key="item.key"
        @click="navigateToCategory(item.key)"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>

        <v-spacer></v-spacer>

        <v-list-item-action>
          <v-btn icon @click.stop="editCategory(item.key)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click.stop="deleteCategory(item.key)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>

        <v-divider></v-divider>
      </v-list-item>
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
import { useRoute, useRouter } from 'vue-router'; // Import useRoute to watch route changes
import { useStore } from '../../lib/store'; // Adjust the import path as needed

const store = useStore();
const route = useRoute(); // Get the current route
const router = useRouter();
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

// Navigate to the category page
const navigateToCategory = (categoryId) => {
  router.push(`/category-read/${categoryId}`);
  console.log(`Navigating to: ${categoryId}`);
};

// Edit category handler
const editCategory = (categoryId) => {
  router.push(`/category-edit/${categoryId}`);
};

// Delete category handler
const deleteCategory = (categoryId) => {
  console.log(`Delete category with ID: ${categoryId}`);
};

</script>