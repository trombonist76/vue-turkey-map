<script setup>
import { computed, ref } from "vue"

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
    default: "#dddddd"
  },

  hoverHexColor: {
    type: String,
    default: "#aaa"
  }

})

const emits = defineEmits(["enterMouse", "leaveMouse", "moveMouse", "select"])
const cityEmitFields = () => {
  const fieldsObj = {
    id: props.city.id,
    plateNumber: props.city.plateNumber,
    name: props.city.name
  }
  return fieldsObj
}

const cityRef = ref(null)
const hoverColor = computed(() => props.hoverable && props.hoverHexColor)

const mouseEnterHandler = (event) => {
  const emitingFields = cityEmitFields()
  cityRef.value.style.fill = hoverColor.value
  emits("enterMouse", emitingFields)
}

const mouseLeaveHandler = () => {
  cityRef.value.style.fill = props.defaultColor
  emits("leaveMouse")
}

const mouseMoveHandler = (event) => {
  emits("moveMouse", event)
}

const clickHandler = () => {
  const emitingFields = cityEmitFields()
  emits("select", emitingFields)
}
</script>

<template>
  <g 
    @mouseenter="mouseEnterHandler"
    @mouseleave="mouseLeaveHandler"
    @mouseover="mouseOverHandler"
    @mousemove="mouseMoveHandler"
    @click="clickHandler"
    >
      <path ref="cityRef" class="city" :fill="props.defaultColor" :fill-opacity="props.opacity" :d="city.path" />
  </g>
</template>

<style lang="scss" scoped>
.city{
  cursor: pointer;
}
</style>