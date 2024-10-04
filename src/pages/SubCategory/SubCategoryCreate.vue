<template>
    <v-card class="formCard">
        <v-card-title class="headline">
            Create a SubCategory
        </v-card-title>
        <v-card-subtitle class="subheading">
            Enter The SubCategory Information Below
        </v-card-subtitle>
        <v-card-text class="form-content">
            <v-form ref="form" v-model="valid" class="form">
                <v-text-field
                    v-model="categoryName"
                    :rules="rules.required"
                    label="SubCategory Name"
                    class="my-2"
                ></v-text-field>

                <v-text-field
                    v-model="categoryDesc"
                    label="SubCategory Description"
                    class="my-2"
                ></v-text-field>

                <v-btn class="mt-4" :disabled="!valid" @click="handleSubmit">Submit</v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { defineComponent, ref } from 'vue';
import { createCatSubmit } from '../../composables/formAssistants';
import { rules } from '../../modules/rules';
import { getPreviousRoute } from '../../lib/router';
import { useRouter } from 'vue-router';

const valid = ref(false);
const categoryName = ref('');
const categoryDesc = ref('');
const router = useRouter();

const { submit } = createCatSubmit();

const handleSubmit = async () => {
    if (valid.value) {
        try {
            await submit({
                categoryName: categoryName.value,
                categoryDesc: categoryDesc.value
            });
            router.push(getPreviousRoute());
        } catch (error) {
            console.error('Submission error:', error);
        }
    }
};
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
