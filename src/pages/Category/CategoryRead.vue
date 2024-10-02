<template>
    <v-sheet class="mx-auto" height="90%" width="50%">
        <br>
        <h1>{{ item?.name || 'Category Name' }}</h1>
        <br>
        <v-divider></v-divider>

    </v-sheet>
</template>

<script setup>

import { ref, onMounted, watch } from 'vue';
import { useStore } from '../../lib/store'; // Adjust the import path as needed
import { useRoute, useRouter } from 'vue-router'; // Import useRoute to watch route changes

const store = useStore();
const route = useRoute();
const router = useRouter();
const item = ref(null);

const loadCategory = async () => {
    try {
        await store.loadCollectionData(1, [route.params.id]);
        item.value = store.responsiveDbCategories[0];
        console.log("Item is set to: ", item.value.name);
    }
    catch (error){
        console.error("Error during the category document", error);
    }
}

// Load data when the component is mounted
onMounted(() => {
  loadCategory();
});

// Watch for route changes and reload data if necessary
watch(route, () => {
    loadCategory();
});

</script>