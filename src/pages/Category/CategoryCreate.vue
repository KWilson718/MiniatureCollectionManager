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

                <v-btn class="mt-4" :disabled="!valid" @click="submit">Submit</v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import formMixins from '../../assets/mixins/formMixins.ts';

export default defineComponent({
    mixins: [formMixins],
    data() {
        return {
            valid: false,
            categoryName: '',
            categoryDesc: '',
        };
    },
    methods: {
        submit() {
            if (this.valid) {
                console.log('Form submitted:', { categoryName: this.categoryName, categoryDesc: this.categoryDesc });
            }
        },
    },
});
</script>

<style scoped>
.formCard {
    width:50vw;
    height: 50vh;
    padding-left: 3rem;
    padding-right: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.form-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.form {
    width: 100%;
    width: 100%;
}
</style>
