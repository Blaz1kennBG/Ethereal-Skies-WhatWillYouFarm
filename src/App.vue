<template>
  <router-view />
  <div class="text-red-500">APP.vue</div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
onMounted(() => {
  console.log("App.vue mounted");
});
console.log("Production: ", process.env.NODE_ENV);
</script>
