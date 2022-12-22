<script setup>
import data from "@/assets/data/cities.json";
import City from "@/components/City.vue";
import Tooltip from "@/components/Tooltip.vue";
import { ref, reactive } from "vue"
const props = defineProps({
  cities: {
    type: Array,
    default: data.cities,
  },

  viewBox: {
    type: Object,
    default: { top: 0, left: 80, width: 1050, height: 585 },
  },

  hoverable: {
    type: Boolean,
    default: true
  },

  defaultColor: {
    type: String,
    default: "#dddddd"
  },

  hoverHexColor: {
    type: String,
    default: "#aaa"
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
  }
});

const emits = defineEmits(["hover", "select"])
const { top, left, width, height } = props.viewBox;
const textViewBox = `${top} ${left} ${width} ${height}`;
const selectedCity = ref(null)
const tooltipSettings = reactive({
  text: "",
  top: 0,
  left: 0,
  isVisible: false
})

const selectedCityHandler = (city) => {
  if(selectedCity.value?.id === city.id) return
  selectedCity.value = city
  emits("select", city)
}

const enterMouseHandler = (city) => {
  tooltipSettings.isVisible = true
  tooltipSettings.text = props.tooltipContent(city)
  emits("hover", city)
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
    style="{ width: '100%', height: 'auto' }"
  >
    <g key="turkey" id="turkey">
      <City 
        v-for="city in props.cities" 
        :key="city.id" 
        :city="city"
        :hoverable="props.hoverable"
        :hoverHexColor="props.hoverHexColor"
        :defaultColor="props.defaultColor"
        :opacity="props.opacity"
        @select="selectedCityHandler"
        @enterMouse="enterMouseHandler"
        @moveMouse="moveMouseHandler"
        @leaveMouse="leaveMouseHandler">
      </City>
    </g>
  </svg>
  <Tooltip v-bind="tooltipSettings"/>
</template>