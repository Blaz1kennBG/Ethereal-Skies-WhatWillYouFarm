<script setup lang="ts">
import { attributes as _attributes } from "@/shared/attributes";
import { cloneDeep } from "lodash";
import { ref } from "vue";
const attributes = ref(cloneDeep(_attributes));
const totalPoints = ref(0);
const max_points = 300;
function addOrRemove(att: any, amount: number, remove = false) {
  if (remove) {
    if (att.quantity > 0) {
      totalPoints.value -= amount;
      att.quantity -= amount;
    }
    return;
  }
  if (att.quantity + amount > max_points) {
    const difference = max_points - att.quantity;
    totalPoints.value += difference;
    att.quantity += difference;
  } else {
    totalPoints.value += amount;
    att.quantity += amount;
  }
}
function reset() {
  attributes.value = cloneDeep(_attributes);
  totalPoints.value = 0;
}
</script>

<template>
  <v-container
    class="h-screen overflow-hidden transition-all duration-500 border-neutral-100 border"
  >
    <div class="h-full flex items-center justify-center">
      <div class="flex flex-col bg-neutral-900 p-10 rounded-lg">
        <div id="attribute-form">
          <div class="flex justify-center mb-10">
            <img src="@/assets/images/attributes-heading.png" />
          </div>

          <h1 class="text-center text-lg my-2">
            Points: {{ totalPoints }} / {{ max_points }}
          </h1>
          <div class="grid grid-cols-6 gap-y-5 gap-x-10 place-items-center">
            <div
              class="flex flex-col gap-y-3 justify-center items-center !border !border-neutral-600 rounded-lg p-5"
              :class="{ 'col-span-2': index < 3, 'col-span-3': index >= 3 }"
              v-for="(att, index) of attributes"
              :key="att.name"
            >
              <button class="transition-all duration-300 hover:scale-110">
                <img :src="att.iconUrl" />
              </button>
              <div class="grid grid-cols-3 gap-3 justify-center">
                <v-btn
                  size="x-small"
                  class="!text-xs flex"
                  icon
                  @click="() => addOrRemove(att, 1)"
                >
                  +1
                </v-btn>
                <v-btn
                  size="x-small"
                  class="!text-xs flex"
                  icon
                  @click="() => addOrRemove(att, 10)"
                >
                  +10
                </v-btn>
                <v-btn
                  size="x-small"
                  class="!text-xs flex"
                  icon
                  @click="() => addOrRemove(att, 50)"
                >
                  +50
                </v-btn>
                <div
                  class="w-full h-[1px] col-span-3 bg-neutral-600 rounded-lg"
                ></div>
                <v-btn
                  size="x-small"
                  class="!text-xs flex"
                  icon
                  @click="() => addOrRemove(att, 1, true)"
                >
                  -1
                </v-btn>
                <v-btn
                  size="x-small"
                  class="!text-xs flex"
                  icon
                  @click="() => addOrRemove(att, 10, true)"
                >
                  -10
                </v-btn>
                <v-btn
                  size="x-small"
                  class="!text-xs flex"
                  icon
                  @click="() => addOrRemove(att, 50, true)"
                >
                  -50
                </v-btn>
              </div>
            </div>
          </div>
        </div>
        <div id="total-bonus" class="mt-5 flex flex-col gap-y-1">
          <p>Current Bonus:</p>
          <template v-for="(att, index) of attributes" :key="att.name + index">
            <template v-if="att.quantity">
              <div
                class="flex flex-row gap-x-3 items-center"
                v-for="stat of att.stats"
                :key="stat.viewValue"
              >
                <div class="w-3 h-1 bg-white rounded-full"></div>
                <span
                  >{{ (att.quantity * stat.multiplier).toFixed(2) }}%
                  {{ stat.viewValue }}</span
                >
              </div>
            </template>
          </template>
        </div>
        <v-btn class="mt-3" @click="() => reset()">Reset</v-btn>
      </div>
    </div>
  </v-container>
</template>
