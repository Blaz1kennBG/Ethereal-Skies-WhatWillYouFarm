<script lang="ts" setup>
import ListGroupActivator from "@/components/ListGroupActivator.vue";
import { ref, onMounted } from "vue";
import { database, FarmingMaterial } from "../shared/db";
import { CraftingItem } from "../shared/db";
import { cloneDeep } from "lodash-es";
const searchInput = ref("");
let validForm = false;
const foundItems = ref([] as CraftingItem[]);
const farmingList = ref([] as { quantity: number; item: CraftingItem }[]);
const materialFarmingList = ref([] as FarmingMaterial[]);
const changes = ref(false);
const items = database.getAllItems();

onMounted(() => {
  submit();
});
function submit() {
  const found = items.filter((v) =>
    v.name.includes(searchInput.value.trim().toLowerCase())
  );
  foundItems.value = found;
}
function addItemToList(item: CraftingItem) {
  const exists = farmingList.value.find((v) => v.item.name === item.name);
  if (exists) {
    updateExisting(exists);
  } else {
    const _item = cloneDeep(item);
    _item.materials.forEach((material) => {
      const craftsAmount = Math.ceil(
        material.quantity / material.craftable_amount
      );

      material.ingredients.map((ingredient) => {
        ingredient.quantity = ingredient.raw * craftsAmount;
        return {
          ...ingredient,
        };
      });
    });
    farmingList.value.push({ quantity: 1, item: _item });
  }
  console.log();
  changes.value = true;
}
function updateExisting(selectedItem: {
  quantity: number;
  item: CraftingItem;
}) {
  selectedItem.quantity++;
  selectedItem.item.materials.forEach((material) => {
    material.quantity = material.raw * selectedItem.quantity;
    const craftsAmount = Math.ceil(
      material.quantity / material.craftable_amount
    );
    material.ingredients.map((ingredient) => {
      ingredient.quantity = ingredient.raw * craftsAmount;
      return {
        ...ingredient,
      };
    });
  });
}
function addMaterialsToList(newItem: FarmingMaterial) {
  const exists = materialFarmingList.value.find(
    (v) => v.item.name === newItem.item.name
  );
  if (!exists) {
    materialFarmingList.value.push(newItem);
  } else {
    exists.quantity += newItem.quantity;
  }
  changes.value = false;
}
function generateFarmingMaterialList() {
  materialFarmingList.value = [];
  farmingList.value.forEach(({ item }) => {
    item.materials.forEach((material) => {
      addMaterialsToList({
        quantity: material.quantity,
        item: material,
        checked: false,
      });
      material.ingredients.forEach((ingredient) => {
        addMaterialsToList({
          quantity: ingredient.quantity,
          item: ingredient,
          checked: false,
        });
      });
    });
  });
}
function removeItem(selectedItem: { quantity: number; item: CraftingItem }) {
  const index = farmingList.value.findIndex(
    (v) => v.item.name === selectedItem.item.name
  );
  if (index !== -1) {
    const newArr = farmingList.value.slice();
    newArr.splice(index, 1);
    farmingList.value = newArr;
  }
  changes.value = true;
}
function clearLists() {
  farmingList.value = [];
  materialFarmingList.value = [];
}
function log(...x: any) {
  console.log(x);
}
</script>

<style>
.v-checkbox .v-input__details {
  display: none;
}
</style>
<template>
  <v-container class="h-screen overflow-hidden">
    <v-row>
      <v-col md="12" class="bg-neutral-900">
        <v-form
          v-model="validForm"
          @submit.prevent="submit"
          class="flex flex-col gap-x-3"
        >
          <v-text-field
            v-model="searchInput"
            label="Armor, weapon, accessories...."
          ></v-text-field>
          <div class="flex gap-x-3">
            <v-btn type="submit" variant="tonal">Search</v-btn>
            <v-btn type="button" @click="clearLists()">Clear lists</v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
    <v-row class="h-full">
      <v-col
        md="4"
        class="h-full bg-[#0D1117] border border-solid border-neutral-100 overflow-auto !pb-28"
        >Farming list
        <v-list
          class="!my-2 !p-0"
          v-for="farmingItem in farmingList"
          :key="farmingItem.item.name"
        >
          <v-list-group>
            <template v-slot:activator="{ props, isOpen }">
              <list-group-activator
                :delete-action="true"
                @delete="(ev) => removeItem(farmingItem)"
                :title="`${farmingItem.item.viewValue} (${farmingItem.quantity})`"
                :item-type="farmingItem.item.type"
                :description="
                  farmingItem.item.description || 'Missing item description'
                "
                :props="props"
                :isOpen="isOpen"
              >
                <template v-slot:label-prepend>
                  <div class="flex flex-row gap-x-2 mx-auto items-center">
                    <span
                      data-width="25"
                      data-height="25"
                      class="iconify"
                      data-icon="system-uicons:coins"
                    ></span>
                    <span>{{
                      farmingItem.item.requirements.coins * farmingItem.quantity
                    }}</span>
                  </div>
                </template>
              </list-group-activator>
            </template>
            <template
              v-for="(material, i) in farmingItem.item.materials"
              :key="i"
            >
              <v-list-group v-if="material.ingredients.length">
                <template v-slot:activator="{ props, isOpen }">
                  <list-group-activator
                    class="px-8"
                    :title="`${material.viewValue} (${material.quantity})`"
                    :item-type="material.type"
                    :description="
                      material.description || 'Missing item description'
                    "
                    :props="props"
                    :isOpen="isOpen"
                  />
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
        md="4"
        class="h-full bg-[#0D1117] border border-solid border-neutral-100 overflow-auto !pb-28"
      >
        Item list
        <v-card
          class="!flex items-center !p-2 !my-2"
          v-for="(item, index) in foundItems"
          v-bind:key="index"
          variant="tonal"
        >
          <span
            data-width="23"
            data-height="23"
            class="iconify"
            :data-icon="item.icon"
          ></span>

          <span class="ml-2">{{ item.viewValue }}</span>
          <v-btn class="ms-auto block" @click="addItemToList(item)">Add</v-btn>
        </v-card>
      </v-col>
      <v-col
        md="4"
        class="h-full bg-[#0D1117] border border-solid border-neutral-100 overflow-auto !pb-28"
      >
        All Items to farm
        <v-btn
          class="w-full"
          variant="flat"
          :color="changes ? 'red' : 'green'"
          @click="generateFarmingMaterialList()"
          >Generate</v-btn
        >
        <h1 class="my-1">Materials</h1>
        <v-card
          v-for="material in materialFarmingList.filter(
            (v) => v.item.type === 'materials'
          )"
          :key="material.item.name"
        >
          <div class="flex flex-row items-center">
            <v-checkbox-btn
              :label="`${material.item.viewValue} (${material.quantity})`"
              v-model="material.checked"
              @click="log(material)"
            >
            </v-checkbox-btn>
          </div>
        </v-card>
        <h1 class="my-1">Ingredients</h1>
        <v-card
          v-for="material in materialFarmingList.filter(
            (v) => v.item.type === 'ingredients'
          )"
          :key="material.item.name"
        >
          <div class="flex flex-row items-center">
            <v-checkbox-btn
              :label="`${material.item.viewValue} (${material.quantity})`"
              v-model="material.checked"
              @click="log(material)"
            >
            </v-checkbox-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
