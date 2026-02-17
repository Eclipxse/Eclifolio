<template>
  <div
    ref="cursorRef"
    class="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
    :class="[
      isHovering ? 'scale-[3] bg-white' : 'scale-100 bg-white'
    ]"
    style="transform: translate(-50%, -50%); will-change: transform;"
  ></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const cursorRef = ref<HTMLElement | null>(null)
const isHovering = ref(false)
const { gsap } = useGsap()

let mouseX = 0
let mouseY = 0
let cursorX = 0
let cursorY = 0

// Lerp factor for smoothness
const speed = 0.15

const onMouseMove = (e: MouseEvent) => {
  mouseX = e.clientX
  mouseY = e.clientY
  
  // Check for hover targets
  const target = e.target as HTMLElement
  // Hover effect on links, buttons, or elements with data-cursor="hover"
  if (
    target.tagName.toLowerCase() === 'a' ||
    target.tagName.toLowerCase() === 'button' ||
    target.closest('a') ||
    target.closest('button') ||
    target.closest('[data-cursor="hover"]')
  ) {
    isHovering.value = true
  } else {
    isHovering.value = false
  }
}

const animate = () => {
  cursorX += (mouseX - cursorX) * speed
  cursorY += (mouseY - cursorY) * speed

  if (cursorRef.value) {
    gsap.set(cursorRef.value, {
      x: cursorX,
      y: cursorY
    })
  }
  
  requestAnimationFrame(animate)
}

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
  // Initialize position
  cursorX = window.innerWidth / 2
  cursorY = window.innerHeight / 2
  animate()
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
})
</script>

<style scoped>
/* Optional: slightly different styling or effects */
</style>
