<template>
    <v-app-bar>
        <template v-slot:prepend>
            <v-btn :disabled="!item?.id" @click="editCategory(item?.id)">Edit Category</v-btn>
        </template>

        <v-app-bar-title>{{ item?.name || 'Category Name' }}</v-app-bar-title>

        <template v-slot:append>
            <v-btn :disabled="!item?.id" @click="createSubCategory(item?.id)">Create SubCategory</v-btn>
        </template>
    </v-app-bar>

    <v-sheet class="mx-auto" height="90%" width="50%">
        <br>
        <p>{{ item?.description || "No Description Provided" }}</p>
        <br>


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
const subItem = ref(null);

const loadCategory = async () => {
    try {
        await store.loadCollectionData(1, [route.params.id]);
        const category = store.responsiveDbCategories[0];
        if (category) {
            // Manually assign properties to ensure reactivity
            item.value = {
                ...category // Spread properties from the loaded category
            };
            subItem.value = item?.subcategories;
            console.log(item.value);
            console.log(subItem.value);
        }
        console.log("Item is set to: ", item.value);
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

// Edit category handler
const editCategory = (categoryId) => {
    if (categoryId) {
        router.push(`/category-edit/${categoryId}`);
    } 
    else {
        console.error("Invalid Category ID");
    }
};

const createSubCategory = (categoryId) => {
    if(categoryId) {
        router.push(`/subcategory-create/${categoryId}`);
    }
    else {
        console.error("Invalid Category ID");
    }
}
</script>