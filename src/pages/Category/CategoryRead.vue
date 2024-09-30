<template>
    <h1>This is the Category Read Page</h1>
    <br>
    <h3>The Current Selected Category is: {{ categoryID }}</h3>
</template>

<script>

export default {
    computed: {
        categoryID() {
            return this.$route.params.id;
        }
    }
}

</script>