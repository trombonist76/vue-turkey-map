<script setup>
import { ref } from "vue"

const props = defineProps({
  city: {
    type: Object,
    required: true
  },

  hoverable: {
    type: Boolean,
    default: true
  },

  viewName: {
    type: Function,
    default: (name) => name
  },

  defaultColor: {
    type: String,
    default: "#fff"
  },

  hoverHexColor: {
    type: String,
    default: "#aaa"
  },

	selectedColor: {
		type: String,
		default: "#7a7a7a"
	},

  isActive: Boolean

})

const emits = defineEmits(["enterMouse", "leaveMouse", "moveMouse", "select"])
const cityRef = ref(null)

const mouseEnterHandler = () => {
  emits("enterMouse", props.city)
}

const mouseLeaveHandler = () => {
  emits("leaveMouse")
}

const mouseMoveHandler = (event) => {
  emits("moveMouse", event)
}

const clickHandler = () => {
  emits("select", props.city)
}
</script>

<template>
  <g 
    @mouseenter="mouseEnterHandler" 
    @mouseleave="mouseLeaveHandler" 
    @mousemove="mouseMoveHandler"
    @click="clickHandler">
    <path 
      ref="cityRef" 
      class="city" 
      :id="props.city.id" 
      :class="{ 'active': props.isActive }" 
      :fill-opacity="props.opacity"
      :d="city.path" />
  </g>
</template>

<style lang="scss" scoped>
.city {
  cursor: pointer;
  fill: v-bind('props.defaultColor');
  transition: fill 150ms ease-out;  

  &:hover {
    fill: v-bind('props.hoverHexColor');
  }
}
.active {
  fill: v-bind('props.selectedColor')
}
</style>