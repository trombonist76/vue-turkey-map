<script setup>
import { computed } from 'vue';

const props = defineProps({
  text: String,
  isVisible: Boolean,
  top: Number,
  left: Number,
  tooltipBgColor: {
    type: String,
    default: "#0f172a"
  },
  tooltipTextColor: {
    type: String,
    default: "#fff"
  }
});

const position = computed(() => ({top: `${props.top}px`, left: `${props.left}px`}))
</script>

<template>
  <Transition name="fade">
    <div v-show="props.isVisible" class="tooltip">{{ props.text }}</div>
  </Transition>
</template>

<style scoped>
.tooltip {
  background-color: v-bind('props.tooltipBgColor');
  color: v-bind('props.tooltipTextColor');
  position: absolute;
  z-index: 1;
  top: v-bind('position.top');
  left: v-bind('position.left');
  text-align: center;
  padding: .7rem .5rem;
  font-weight: 500;
  border-radius: 7px;
  pointer-events: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>