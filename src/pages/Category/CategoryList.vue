<template>
  <v-sheet class="mx-auto" height="90%" width="50%">
    <br>
    <h1>Categories</h1>
    <br>
    <v-divider></v-divider>
    
    <v-alert text="Click Create Category to Create Your First Category" variant="outlined" v-if="store.dbInitialized && (store.getDBCategories.length == 0)"></v-alert>

    <!-- Scrollable container for the list -->
    <div class="scrollable-list" v-else-if="store.dbInitialized">
      <v-list>

        <v-list-item
          v-for="(item, index) in items"
          :key="item.key"
          @click="navigateToCategory(item.key)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>

          <v-spacer></v-spacer>

          <p>{{ item?.description || "No Description Provided" }}</p>

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
    </div>

    <v-alert text="Loading Database..." variant="outlined" v-else></v-alert>
    <br>
    <v-btn variant="outlined" to="/category-create">
      Create Category
    </v-btn>
  </v-sheet>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '../../lib/store';

const store = useStore();
const route = useRoute();
const router = useRouter();
const items = ref([]);

const loadData = async () => {
  try {
    await store.loadData();
    items.value = await store.generateItemsArray(0);
  } catch (error) {
    console.error('Error during store initialization or data loading:', error);
  }
};

onMounted(() => {
  loadData();
});

watch(route, () => {
  loadData();
});

const navigateToCategory = (categoryId) => {
  router.push(`/category-read/${categoryId}`);
};

const editCategory = (categoryId) => {
  router.push(`/category-edit/${categoryId}`);
};

const deleteCategory = async (categoryId) => {
  await store.deleteCategory(categoryId);
  
  // Remove the deleted category from the items array without reloading the whole data
  items.value = items.value.filter(item => item.key !== categoryId);
};

</script>

<style scoped>
/* Scrollable container styling */
.scrollable-list {
  max-height: 60vh; /* Adjust this value as needed */
  overflow-y: auto;
}
</style>
