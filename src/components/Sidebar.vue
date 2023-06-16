<script setup>
import Sidebar from "primevue/sidebar";
import Fieldset from "primevue/fieldset";
import InputNumber from "primevue/inputnumber";
import Checkbox from "primevue/Checkbox";
import Slider from "primevue/Slider";
import Button from "primevue/Button";
import { computed, ref } from "vue";

const props = defineProps({
  visible: {
    type: Boolean,
    default: true,
  },
  autoFilter: {
    type: Boolean,
    default: true,
  },
});

const emits = defineEmits([
  "setPopulation",
  "setPlateNum",
  "setRegion",
  "update:visible",
  "update:autoFilter",
  "shuffleOnce"
]);

const regions = ref([
  {
    name: "Akdeniz",
    selected: false,
  },
  {
    name: "İç Anadolu",
    selected: false,
  },
  {
    name: "Doğu Anadolu",
    selected: false,
  },
  {
    name: "Güneydoğu Anadolu",
    selected: false,
  },
  {
    name: "Ege",
    selected: false,
  },
  {
    name: "Karadeniz",
    selected: false,
  },
  {
    name: "Marmara",
    selected: false,
  },
]);
const plateNumber = ref();
const selectedRegions = ref([]);
const population = ref(0);
const formatter = Intl.NumberFormat("tr", { notation: "compact" });
const formattedPopulation = computed(() => formatter.format(population.value));

const regionHandler = (region) => {
  selectedRegions.value = region;
  emits("setRegion", region);
};

const populationHandler = (count) => {
  population.value = count;
  emits("setPopulation", count);
};

const plateNumHandler = (number) => {
  plateNumber.value = number;
  emits("setPlateNum", number);
};

const visibleHandler = (isVisible) => {
  emits("update:visible", isVisible);
};

const autoFilterHandler = () => {
  emits("toggleAutoFilter", !props.autoFilter);
};

const shuffleOnce = () => {
  emits("shuffleOnce")
}
</script>

<template>
  <Sidebar
    :visible="props.visible"
    @update:visible="visibleHandler"
    class="sidebar"
  >
    <div class="content">
      <Fieldset legend="Bölge Seçimi">
        <div class="regions">
          <div
            v-for="region of regions"
            :key="region.name"
            class="regions__region"
          >
            <Checkbox
              :modelValue="selectedRegions"
              :inputId="region.name"
              :value="region.name"
              name="region"
              @update:modelValue="regionHandler"
            />
            <label :for="region.name">{{ region.name }}</label>
          </div>
        </div>
      </Fieldset>
      <span class="plate-num p-float-label">
        <InputNumber
          :modelValue="plateNumber"
          :min="1"
          :max="81"
          id="plate"
          @update:modelValue="plateNumHandler"
        />
        <label for="plate">Plaka Numarası</label>
      </span>
      <Fieldset>
        <template #legend>
          <div>
            Nüfus <span v-if="population"> > {{ formattedPopulation }} </span>
          </div>
        </template>
        <div class="population">
          <Slider
            :modelValue="population"
            @update:modelValue="populationHandler"
            :max="16e6"
          />
        </div>
      </Fieldset>
      <div class="shufflers">
        <Button v-if="!props.autoFilter" @click="autoFilterHandler" label="Otomatik Filtreyi Aç" outlined/>
        <Button v-else @click="autoFilterHandler" label="Otomatik Filtreyi Kapat" outlined severity="secondary"/>
        <Button v-if="!props.autoFilter" @click="shuffleOnce" label="Seçilenleri Karıştır" outlined severity="secondary"/>
      </div>

    </div>
  </Sidebar>
</template>

<style lang="scss" scoped>
.content {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.regions {
  display: flex;
  flex-direction: column;
  gap: 6px;

  &__region {
    display: flex;
    gap: 4px;
  }
}

.population {
  padding-inline: 10px;
}

.shufflers {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
