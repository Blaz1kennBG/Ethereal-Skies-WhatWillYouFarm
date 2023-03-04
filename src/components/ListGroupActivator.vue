<template>
  <button
    v-ripple
    v-bind="props"
    class="w-full flex flex-row items-center hover:bg-white hover:bg-opacity-5 transition-all duration-500 py-3 px-3"
  >
    <span class="flex flex-row items-center">
      <i class="mr-2" v-if="icon">
        <span
          data-width="23"
          data-height="23"
          class="iconify"
          :data-icon="icon"
        ></span>
      </i>
      {{ title }}</span
    >
    <slot name="label-prepend"></slot>
    <div class="ml-auto flex flex-row items-center">
      <i
        class="mr-2"
        v-if="deleteAction"
        @click="$emit('delete', 'DELETE_ACTION')"
      >
        <span
          data-width="16"
          data-height="16"
          class="iconify"
          data-icon="akar-icons:cross"
        ></span>
      </i>
      <i
        class="transition-all duration-500"
        :class="{ 'rotate-180': isOpen, 'rotate-0': !isOpen }"
      >
        <span
          data-width="24"
          data-height="24"
          class="iconify text-neutral-400"
          data-icon="mdi:chevron-down"
        ></span>
      </i>
    </div>
    <v-tooltip
      content-class="!bg-neutral-300"
      activator="parent"
      location="end"
      open-delay="400"
      >{{ description || "Missing description" }}</v-tooltip
    >
  </button>
</template>
<script setup lang="ts">
defineProps<{
  icon?: string;
  itemType: string;
  description: string;
  title: string;
  isOpen: boolean;
  props: any;
  deleteAction?: boolean;
}>();
</script>
