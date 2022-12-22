<script setup>
import { computed } from 'vue';

const props = defineProps({
  text: String,
  isVisible: Boolean,
  top: Number,
  left: Number,
  tooltipBgColor: {
    type: String,
    default: "#666"
  },
  tooltipTextColor: {
    type: String,
    default: "#000"
  }
});

const position = computed(() => ({top: `${props.top}px`, left: `${props.left}px`}))
</script>

<template>
  <pre>{{ position, props.isVisible }}</pre>
  <Transition name="fade">
    <div v-show="props.isVisible" class="tooltip">{{ props.text }}</div>
  </Transition>
</template>

<style scoped>
.tooltip {
  width: 120px;
  background-color: v-bind('props.tooltipBgColor');
  color: v-bind('props.tooltipTextColor');
  position: absolute;
  z-index: 1;
  top: v-bind('position.top');
  left: v-bind('position.left');
  text-align: center;
  padding: .7rem .4rem;
  font-weight: 600;
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