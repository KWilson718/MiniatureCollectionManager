<template>
    <div>
        <v-form ref="form" v-model="valid">
            <v-text-field
                v-model="categoryName"
                :rules="rules.required"
                label="Category Name"
            ></v-text-field>

            <v-text-field
                v-model="categoryDesc"
                label="Category Description"
            ></v-text-field>

            <v-btn class="mt-2" :disabled="!valid" @click="submit">Submit</v-btn>
        </v-form>   
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { rules } from '../../assets/modules/rules.ts';

export default defineComponent({
    setup() {
        const valid = ref(false);
        const categoryName = ref('');
        const categoryDesc = ref('');

        const submit = () => {
            if (valid.value) {
                console.log('Form submitted:', { categoryName: categoryName.value, categoryDesc: categoryDesc.value });
            }
        };

        return {
            valid,
            categoryName,
            categoryDesc,
            submit,
            rules, // Making rules available in the template
        };
    },
});
</script>
