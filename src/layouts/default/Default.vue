<template>
  <v-app>
    <default-view />
  </v-app>
</template>

<script lang="ts" setup>
import DefaultView from "./View.vue";
import { onMounted } from "vue";
onMounted(() => {
  console.log("Default.vue mounted");
});
console.log("Default.vue");
</script>
