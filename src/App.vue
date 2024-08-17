<script setup lang="ts">
  import { useStore } from './lib/store';
  const store = useStore();

  const dbLoaded = await store.isDatabaseLoaded;
  console.log(`The check to see if a database is loaded in the store returns: ${dbLoaded}`);
</script>

<template>
  <header>
    <router-link to="/">Home</router-link>
    <router-link to="/universal-stats">Stats</router-link>
  </header>
  <router-view />
</template>

<style scoped>
</style>
