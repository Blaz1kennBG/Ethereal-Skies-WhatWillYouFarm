<script setup lang="ts"></script>
<template>
  <v-row class="!bg-tw-secondary border-neutral-100 border">
    <v-col cols="12">
      <v-btn @click="$emit('onCompact', true)">Toggle Compact Screen</v-btn>
    </v-col>
  </v-row>
</template>
