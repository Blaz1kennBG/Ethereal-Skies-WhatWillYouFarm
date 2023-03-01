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
                :title="
                  farmingItem.item.viewValue + ` (${farmingItem.quantity})`
                "
              ></v-list-item>
            </template>
            <template
              v-for="(material, i) in farmingItem.item.materials"
              v-bind:key="i"
            >
              <v-list-group v-if="material.ingredients.length">
                <template v-slot:activator="{ props }">
                  <v-list-item
                    v-bind="props"
                    :title="material.viewValue + ` (${material.quantity})`"
                  >
                    <v-tooltip
                      content-class="!bg-neutral-300"
                      activator="parent"
                      location="end"
                      open-delay="400"
                      >{{
                        material.description || "Missing description"
                      }}</v-tooltip
                    >
                  </v-list-item>
                </template>

                <v-list-item
                  class="!p-0"
                  v-for="(itemMats, itmI) in material.ingredients"
                  v-bind:key="itmI"
                >
                  <v-checkbox
                    :label="itemMats.viewValue + ` (${itemMats.quantity})`"
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
              <v-list-item v-else class="!p-0" v-bind:key="i">
                <v-checkbox
                  :label="material.viewValue + ` (${material.quantity})`"
                ></v-checkbox>
                <v-tooltip
                  open-delay="400"
                  content-class="!bg-neutral-300"
                  activator="parent"
                  location="end"
                  >{{
                    material.description || "Missing description"
                  }}</v-tooltip
                >
              </v-list-item>
            </template>
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
          <span>{{ item.viewValue }}</span>
          <v-btn class="ms-auto block" @click="addItemToList(item)">Add</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { database } from "../shared/db";
import { CraftingItem } from "../shared/db";
const searchInput = ref("");
const validForm = false;
const foundItems = ref([] as CraftingItem[]);
const farmingList = ref([] as { quantity: number; item: CraftingItem }[]);
const items = database.getAllItems();
/* console.log("[ITEMS]: ", items); */
onMounted(() => {
  submit();
});
function submit() {
  const found = items.filter((v) =>
    v.name.includes(searchInput.value.toLowerCase())
  );

  foundItems.value = found;
}
function addItemToList(item: CraftingItem) {
  const exists = farmingList.value.find((v) => v.item.name === item.name);
  if (exists) {
    updateExisting(exists);
  } else {
    console.log(item);
    farmingList.value.push({ quantity: 1, item });
  }
}
function updateExisting(selectedItem: {
  quantity: number;
  item: CraftingItem;
}) {
  selectedItem.quantity++;
  selectedItem.item.materials.forEach((material) => {
    material.ingredients = material.ingredients.map((ingredient) => {
      ingredient.quantity = ingredient.raw * selectedItem.quantity;
      return ingredient;
    });
    material.quantity = material.raw * selectedItem.quantity;
  });
}
function removeItemFromList(selectedItem: {
  quantity: number;
  item: CraftingItem;
}) {
  const index = farmingList.value.findIndex(
    (v) => v.item.name === selectedItem.item.name
  );
  if (index !== -1) {
    farmingList.value.splice(index, 1);
  }
}

function log(x: any) {
  console.log(x);
}
</script>

<style>
.v-checkbox .v-input__details {
  display: none;
}
</style>
