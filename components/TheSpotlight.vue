<template>
  <div 
    class="fixed inset-0 pointer-events-none z-30 transition-opacity duration-700"
    :style="{ 
      background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(255,255,255,0.07), transparent 40%)` 
    }"
  ></div>
</template>

<script setup lang="ts">
const x = ref(0)
const y = ref(0)

const updateMouse = (e: MouseEvent) => {
  x.value = e.clientX
  y.value = e.clientY
}

onMounted(() => {
  window.addEventListener('mousemove', updateMouse)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', updateMouse)
})
</script>
