<script setup>
import data from "@/assets/data/cities.json";
import City from "@/components/City.vue";
import Tooltip from "@/components/Tooltip.vue";
import { ref, reactive, computed, watch } from "vue"
import { isInArrayById, prepareToEmit } from "@/utils"

const props = defineProps({
  cities: {
    type: Array,
    default: data,
  },

  viewBox: {
    type: Object,
    default: { top: 0, left: 80, width: 1050, height: 585 },
  },

  hoverable: {
    type: Boolean,
    default: true
  },

  opacity: {
    type: Number,
    default: 1,
  },

  tooltipContent: {
    type: Function,
    default: ( city ) => city.name
  },

  tooltipOffset: {
    type: Object,
    default: {
      top: -26,
      left: 16
    }
  },

  clickToSelect: {
    type: Boolean,
    default: true
  },

  defaultSelecteds: {
    type: Function,
    default: ( city ) => false
  },

	defaultColor: String,
	hoverHexColor: String,
	selectedColor: String,
});

const emits = defineEmits(["hover", "select"])
const { top, left, width, height } = props.viewBox;
const textViewBox = `${top} ${left} ${width} ${height}`;
const selectedCitiesByProps = computed(() => data.filter(city => props.defaultSelecteds(city)))
const selectedCities = ref(selectedCitiesByProps.value)
const tooltipSettings = reactive({
  text: "",
  top: 0,
  left: 0,
  isVisible: false
})

console.log('props.selectedColor :>> ', props.selectedColor);
const checkInSelecteds = (city) => {
  const result = isInArrayById(selectedCities.value, city.id)
  return result
}

watch(() => selectedCitiesByProps.value, 
  () => selectedCities.value = selectedCitiesByProps.value
)

const clickedCityHandler = (city) => {
  const isInArray = checkInSelecteds(city)
  if(isInArray) return

  if(!props.clickToSelect) return
  selectedCities.value.push(city)

  const justSelected = prepareToEmit(city)
  const allSelecteds = prepareToEmit(selectedCities.value)
  emits("select", justSelected, allSelecteds)
}

const enterMouseHandler = (city) => {
  tooltipSettings.isVisible = true
  tooltipSettings.text = props.tooltipContent(city)
  const hoveredCity = prepareToEmit(city)
  emits("hover", hoveredCity)
}

const leaveMouseHandler = () => {
  tooltipSettings.isVisible = false
}

const moveMouseHandler = (event) => {
  tooltipSettings.left = event.pageX + props.tooltipOffset.left
  tooltipSettings.top = event.pageY + props.tooltipOffset.top
}
</script>

<template>
  <svg
    version="1.1"
    id="vue-svg-turkey-map"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    xmlSpace="preserve"
    :viewBox="textViewBox"
    style="{ width: '100%', height: 'auto'}"
  >
    <g key="turkey" id="turkey">
      <City 
        v-for="city in props.cities"
        :isActive="checkInSelecteds(city)"
        :key="city" 
        :city="city"
        :hoverable="props.hoverable"
        :hoverHexColor="props.hoverHexColor"
        :defaultColor="props.defaultColor"
				:selectedColor="props.selectedColor"
        :opacity="props.opacity"
        @select="clickedCityHandler"
        @enterMouse="enterMouseHandler"
        @moveMouse="moveMouseHandler"
        @leaveMouse="leaveMouseHandler">
      </City>
    </g>
  </svg>
  <Tooltip v-bind="tooltipSettings"/>
</template>