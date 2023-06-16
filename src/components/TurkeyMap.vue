<script setup>
import data from "@/assets/data/cities.json";
import City from "@/components/City.vue";
import Tooltip from "@/components/Tooltip.vue";
import { reactive, computed } from "vue"
import { prepareToEmit } from "@/utils"

const props = defineProps({
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

	toggleUnselect: {
		type: Boolean,
		default: true,
	},

  isSelectedCity: {
    type: Function,
    default: city => false
  },

	selectCities: {
		type: Function,
	},

	defaultColor: String,
	hoverHexColor: String,
	selectedColor: String,
});

const emits = defineEmits(["hover", "select", 'deselect'])

const { top, left, width, height } = props.viewBox;
const textViewBox = `${top} ${left} ${width} ${height}`

const citiesByProps = computed(() => props.selectCities && props.selectCities(data))
const citiesWithDefaultSelecteds = computed(() => data.map(city => ({...city, isSelected: props.isSelectedCity(city)})))
const usedCitiesArray = computed(() => {
	return  citiesByProps.value?.length === data.length
		? citiesByProps.value 
		: citiesWithDefaultSelecteds.value 
})

const selectedCities = computed(() => usedCitiesArray.value.filter(city => city.isSelected))
const tooltipSettings = reactive({
  text: "",
  top: 0,
  left: 0,
  isVisible: false
})

const clickedCityHandler = (city) => {
  const isInArray = city.isSelected
	
	const justSelected = prepareToEmit(city)
  const allSelecteds = prepareToEmit(selectedCities.value)

  if(isInArray && props.toggleUnselect){
		city.isSelected = false
		emits("deselect", justSelected, allSelecteds)
		return
	}

  if(!props.clickToSelect) return
  city.isSelected = true
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
    style="{{ width: '100%', height: 'auto'}}"
  >
    <g key="turkey" id="turkey">
				<City 
					v-for="city in usedCitiesArray"
					:isActive="city.isSelected"
					:key="city" 
					:city="city"
					:hoverable="props.hoverable"
					:hoverHexColor="props.hoverHexColor"
					:defaultColor="props.defaultColor"
					:selectedColor="city.color || props.selectedColor"
					:opacity="props.opacity"
					@select="clickedCityHandler"
					@enterMouse="enterMouseHandler"
					@moveMouse="moveMouseHandler"
					@leaveMouse="leaveMouseHandler">
				</City>
    </g>
  </svg>
  <Tooltip v-bind="tooltipSettings">
		<template #tooltip="{ text }">
			<slot :text="text"></slot>
		</template>
	</Tooltip>
</template>