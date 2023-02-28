<template>
  <v-container class="h-screen overflow-hidden">
    <v-row>
      <v-col md="12" class="bg-neutral-900">
        <v-form
          v-model="validForm"
          @submit.prevent="submit"
          class="flex flex-row gap-x-3 items-center"
        >
          <v-text-field
            v-model="searchInput"
            label="Armor, weapon, accessories...."
          ></v-text-field>
          <v-btn type="submit">Search</v-btn>
        </v-form>
      </v-col>
    </v-row>
    <v-row class="h-full">
      <v-col
        md="4"
        class="h-full bg-[#0D1117] border border-solid border-neutral-100"
        >Farming list
        <v-list
          class="!my-2"
          v-for="farmingItem in farmingList"
          v-bind:key="farmingItem.item.name"
        >
          <v-list-group value="FARMING_ITEM_GROUP">
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                :title="farmingItem.item.name + ` (${farmingItem.quantity})`"
              ></v-list-item>
            </template>

            <v-list-group
              v-for="(item, i) in farmingItem.item.ingredients"
              v-bind:key="i"
            >
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  :title="item.name + ` (${item.quantity})`"
                >
                  <v-tooltip
                    content-class="!bg-neutral-300"
                    activator="parent"
                    location="end"
                    open-delay="400"
                    >{{ item.description || "Missing description" }}</v-tooltip
                  >
                </v-list-item>
              </template>
              <v-list-item
                class="!p-0"
                v-for="(itemMats, itmI) in item.materials"
                v-bind:key="itmI"
              >
                <v-checkbox
                  :label="itemMats.name + ` (${itemMats.quantity})`"
                ></v-checkbox>
                <v-tooltip
                  open-delay="400"
                  content-class="!bg-neutral-300"
                  activator="parent"
                  location="end"
                  >{{
                    itemMats.description || "Missing description"
                  }}</v-tooltip
                >
              </v-list-item>
            </v-list-group>
          </v-list-group>
        </v-list>
      </v-col>
      <v-col
        md="8"
        class="h-full bg-[#0D1117] border border-solid border-neutral-100"
      >
        Item list
        <v-card
          class="!flex items-center !p-2 !my-2"
          v-for="(item, index) in foundItems"
          v-bind:key="index"
          variant="tonal"
        >
          <span>{{ item.name }}</span>
          <v-btn class="ms-auto block" @click="addItemToList(item)">Add</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Weaponry } from "../shared/interfaces/weaponry.interface";

import { database } from "../shared/db";
const searchInput = ref("");
const validForm = false;
const foundItems = ref([]);
const farmingList = ref([] as { quantity: number; item: Weaponry }[]);
const items = database.getAllItems();
/* console.log("[ITEMS]: ", items); */
function submit() {
  const found = Object.entries(items)
    .filter(([key, value]) => items.searchable.includes(key))
    .map((v) => v[1]);
  foundItems.value = found.flat();
}
function addItemToList(selectedItem: Weaponry) {
  const exists = farmingList.value.find(
    (v) => v.item.name === selectedItem.name
  );
  if (exists) {
    updateExisting(exists);
  } else {
    selectedItem.ingredients.forEach((ingr) => {
      let _mats = [] as any;
      const foundMats = items.materials.find((v) => v.name === ingr.name);
      if (foundMats) {
        _mats = foundMats.ingredients;
      }
      ingr.materials = _mats;
    });

    farmingList.value.push({ quantity: 1, item: selectedItem });
  }
}
function updateExisting(selectedItem: { quantity: number; item: Weaponry }) {
  selectedItem.quantity++;
  selectedItem.item.ingredients.map((v) => {
    v.quantity = selectedItem.quantity * v.raw;
    v.materials = v.materials?.map((m) => ({
      ...m,
      quantity: (m.raw || 1) * selectedItem.quantity,
    }));
    return v;
  });
}
function removeItemFromList(selectedItem: {
  quantity: number;
  item: Weaponry;
}) {
  const index = farmingList.value.findIndex(
    (v) => v.item.name === selectedItem.item.name
  );
  if (index !== -1) {
    farmingList.value.splice(index, 1);
  }
}
function getItem(name: string, category: string) {}
function getMaterial(name: string) {}
function log(x) {
  console.log(x);
}
</script>

<style>
.v-checkbox .v-input__details {
  display: none;
}
</style>
