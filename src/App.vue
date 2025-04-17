<template>
  <router-view />
</template>

<script setup lang="ts">
import { createPinia } from 'pinia';
import { app } from './boot/app';

const pinia = createPinia();
app.use(pinia);
</script>
