<script setup lang="ts"></script>
<template>
  <v-row class="bg-[#0D1117]">
    <v-col cols="12">
      <v-btn @click="$emit('onCompact', true)">Toggle Compact Screen</v-btn>
    </v-col>
  </v-row>
</template>
