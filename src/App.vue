<template>
  <router-view />
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
onMounted(() => {
  /*  console.log("App.vue mounted"); */
});
/* console.log("Production: ", process.env.NODE_ENV, process.env.BASE_URL); */
</script>
