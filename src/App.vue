<script setup lang="ts">
  import { useStore } from './lib/store';
  const store = useStore();

  console.log(store.isDatabaseLoaded);
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
