<script setup>
import TurkeyMap from "@/components/TurkeyMap.vue";
import Sidebar from "@/components/Sidebar.vue";
import Button from "primevue/Button";
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { onBeforeMount, reactive, ref } from "vue";
import { randomNumber, randomColor } from "@/utils/random";
import {
  byPlateNumber,
  byPopulation,
  byRegion,
  createPopulationHeatmap,
  getRandomFilterByKey,
} from "@/utils/filters";

const initialState = {
  region: null,
  population: null,
  plateNumber: null,
};

const toast = useToast();

const selectedColor = ref(null);
const autoShufflerInterval = ref(undefined);
const isSidebarVisible = ref(true);
const activeFilters = reactive({ ...initialState });

//Actions
const filterActions = {
  region: (city) => byRegion(city, activeFilters.region),
  population: (city) => byPopulation(city, activeFilters.population),
  plateNumber: (city) => byPlateNumber(city, activeFilters.plateNumber),
};

const shuffleHandler = () => {
  const keys = Object.keys(activeFilters);
  const randFilterIndex = randomNumber(keys.length - 1);
  const randomKey = keys.at(randFilterIndex);
  const filterValue = getRandomFilterByKey(randomKey);

  const state = { ...initialState, [randomKey]: filterValue };
  Object.assign(activeFilters, state);
  selectedColor.value = randomColor();
};

const autoShuffler = () => {
  if (autoShufflerInterval.value) {
    clearInterval(autoShufflerInterval.value);
    autoShufflerInterval.value = undefined;
    return;
  }
  autoShufflerInterval.value = setInterval(() => shuffleHandler(), 500);
};

const selectedCityHandler = (city) => {
  const isPassedCondition = Object.entries(activeFilters).some(
    ([key, value]) => {
      if (!value) return false;
      const action = filterActions[key];
      return action(city);
    }
  );

  return isPassedCondition;
};

const selectCityHandler = (city, cities) => {
  const title = 'Şehir seçimi başarılı'
  const message = `${city.name} şehrini seçtiniz`
  toast.add({ severity: 'success', summary: title, detail: message, life: 2000 });
};

//this iterates cities and changes city's 'isActive' and 'color' by condition
const selectCitiesHandler = (cities) => {
  return createPopulationHeatmap(cities);
};

const populationHandler = (population) => {
  activeFilters.population = population;
};

const plateNumberHandler = (plateNumber) => {
  activeFilters.plateNumber = plateNumber;
};

const regionHander = (region) => {
  activeFilters.region = region;
};

const showSidebar = () => {
  isSidebarVisible.value = true
}


//Hooks
onBeforeMount(() => shuffleHandler());
</script>

<template>
  <main class="wrapper">
    <Toast />
    <div class="left-panel">
      <Sidebar
        @setPopulation="populationHandler"
        @setPlateNum="plateNumberHandler"
        @setRegion="regionHander"
        @toggleAutoFilter="autoShuffler"
        @shuffleOnce="shuffleHandler"
        v-model:visible="isSidebarVisible"
        :autoFilter="!!autoShufflerInterval"
      />
      <Button @click="showSidebar" class="open-sidebar" icon="pi-check"/>
    </div>

    <div class="content">
      <TurkeyMap
        :isSelectedCity="selectedCityHandler"
        @select="selectCityHandler"
        :selectedColor="selectedColor"
      />
      <TurkeyMap
        :selectCities="selectCitiesHandler"
        @select="selectCityHandler"
      >
        <template v-slot="{ text }">
          <span>City: {{ text }}</span>
        </template>
      </TurkeyMap>
    </div>
  </main>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
}

.content {
  flex: 1;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding-top: 10px;

  &__button {
    padding: 1rem 1.3rem;
    font-size: 1rem;
    cursor: pointer;
    font-weight: bold;
    border-radius: 5px;
    background-color: #4338ca;
    color: white;
    transition: background-color 150ms ease-in-out;

    &:hover {
      background-color: #818cf8;
    }
  }
}
.open-sidebar {
  position: fixed;
  bottom: 130px;
  left: 20px;
}
</style>
