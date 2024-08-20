<script setup lang="ts">
  import Header from './components/Header.vue';
</script>

<template>
  <Header></Header>
  <header>
    <router-link to="/">Home</router-link>
    <router-link to="/universal-stats">Stats</router-link>
  </header>
  <router-view />
</template>

<style scoped>
</style>
