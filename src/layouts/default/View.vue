<template>
  <v-layout class="!bg-tw-secondary">
    <v-navigation-drawer
      expand-on-hover
      :rail="true"
      permanent
      class="!bg-tw-primary"
    >
      <v-list density="compact" nav class="flex flex-col justify-center h-full">
        <v-list-item
          title="The Forge"
          value="the-forge"
          :to="{ name: 'the-forge' }"
        >
          <template v-slot:prepend>
            <i class="mr-2">
              <span
                class="iconify scale-125"
                data-width="24"
                data-height="24"
                data-icon="cib:conda-forge"
              ></span>
            </i>
          </template>
        </v-list-item>
        <v-list-item title="The Cookery" value="the-cookery">
          <template v-slot:prepend>
            <i class="mr-2">
              <span
                class="iconify scale-125"
                data-width="24"
                data-height="24"
                data-icon="mdi:cook"
              ></span>
            </i>
          </template>
        </v-list-item>
        <v-list-item
          title="Attribute Calculator"
          value="attribute-calculator"
          :to="{ name: 'attribute-calculator' }"
        >
          <template v-slot:prepend>
            <i class="mr-2">
              <span
                class="iconify scale-125"
                data-width="24"
                data-height="24"
                data-icon="la:level-up-alt"
              ></span>
            </i>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main class="!pl-[52px]">
      <router-view />
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
//
</script>
