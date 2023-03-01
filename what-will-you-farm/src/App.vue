<template>
  <router-view />
</template>

<script lang="ts" setup>
import { environment } from "./environment/environment";

console.log("Production: ", process.env.NODE_ENV);
</script>
