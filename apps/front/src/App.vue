<script setup lang="ts">
import HeaderBar from "./components/Header.vue";
</script>

<template>
  <HeaderBar />
  <div class="container px-6 py-10 mx-auto">
    <router-view />
  </div>
</template>

<style scoped>
.active {
  background: white;
  border-radius: 9999px;
  color: #63b3ed;
}
</style>