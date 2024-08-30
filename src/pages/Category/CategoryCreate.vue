<template>
    <v-card class="formCard">
        <v-card-title class="headline">
            Create a Category
        </v-card-title>
        <v-card-subtitle class="subheading">
            Enter The Category Information Below
        </v-card-subtitle>
        <v-card-text class="form-content">
            <v-form ref="form" v-model="valid" class="form">
                <v-text-field
                    v-model="categoryName"
                    :rules="rules.required"
                    label="Category Name"
                    class="my-2"
                ></v-text-field>

                <v-text-field
                    v-model="categoryDesc"
                    label="Category Description"
                    class="my-2"
                ></v-text-field>

                <v-btn class="mt-4" :disabled="!valid" @click="handleSubmit">Submit</v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { createCatSubmit } from '../../composables/formAssistants.ts';
import { rules } from '../../modules/rules.ts';

export default defineComponent({
    setup() {
        const valid = ref(false);
        const categoryName = ref('');
        const categoryDesc = ref('');

        const { submit } = createCatSubmit();

        const handleSubmit = () => {
            if (valid.value) {
                submit({
                    categoryName: categoryName.value,
                    categoryDesc: categoryDesc.value
                });
            }
        };

        return {
            valid,
            categoryName,
            categoryDesc,
            handleSubmit,
            rules,
        };
    },
});
</script>

<style scoped>
.formCard {
    width: 50vw;
    height: 50vh;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.form-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    flex: 1;
}

.form {
    width: 100%;
    flex: 1;
}
</style>
