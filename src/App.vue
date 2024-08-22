<script setup lang="ts">
  import Header from './components/Header.vue';


</script>

<template>
  <v-app style="width: 100%;">
    <v-layout class="rounded rounded-md"  style="width: 100%;">
      <Header></Header>
      <v-main class="d-flex align-center justify-center">
        <router-view />
      </v-main>
    </v-layout>
  </v-app>
</template>

<style scoped>
</style>
