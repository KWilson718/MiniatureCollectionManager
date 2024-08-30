<template>
    <v-app-bar :elevation="2">
        <template v-slot:prepend>
            <v-breadcrumbs :items="items">
                <template v-slot:prepend>
                    <v-btn icon :to="'/'">
                        <img style="width: 3rem; height: 3rem" src="/logo.png" alt="Logo">
                    </v-btn>
                    <div style="padding-right: 1rem;"></div>
                </template>
            </v-breadcrumbs>
        </template>
        <template v-slot:append>
            <v-app-bar-title style="margin-right: 1rem;">Miniature Collection Manager</v-app-bar-title>
        </template>
    </v-app-bar>
    <v-app-bar :elevation="2">
        <template v-slot="append">
            <v-app-bar-title>{{ pageTitle }}</v-app-bar-title>
        </template>
    </v-app-bar>
</template>

<script lang="ts">
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';

    export default {
        setup() {
            const route = useRoute();
            const pageTitle = computed(() => route.name || 'Loading...');

            return {pageTitle};
        },
        data: () => ({
            items: [
            {
                title: 'Category List',
                disabled: false,
                to: '/',
            },
            {
                title: 'Category Read',
                disabled: false,
                to: '/category-read',
            },
            {
                title: 'SubCategory Read',
                disabled: false,
                to: '/subcategory-read',
            },
            {
                title: 'Group Read',
                disabled: false,
                to: '/group-read',
            },
            {
                title: 'Item',
                disabled: false,
                to: '/item-read',
            },
            ],
        }),
    }
</script>