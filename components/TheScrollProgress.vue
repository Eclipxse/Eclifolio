<template>
  <div class="fixed bottom-8 right-8 z-[8000] mix-blend-difference hidden md:block">
    <svg width="60" height="60" viewBox="0 0 100 100" class="transform -rotate-90">
      <circle 
        cx="50" 
        cy="50" 
        r="45" 
        fill="none" 
        stroke="rgba(255,255,255,0.1)" 
        stroke-width="2" 
      />
      <circle 
        ref="progressCircle"
        cx="50" 
        cy="50" 
        r="45" 
        fill="none" 
        stroke="white" 
        stroke-width="2" 
        stroke-dasharray="283"
        stroke-dashoffset="283"
      />
    </svg>
    <div class="absolute inset-0 flex items-center justify-center text-[10px] font-mono text-white">
      {{ Math.round(progress * 100) }}%
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
const progress = ref(0)
const progressCircle = ref(null)

const updateProgress = () => {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  const val = Math.min(scrollTop / docHeight, 1) // clamp to 1
  progress.value = val
  
  // Update circle stroke
  if (progressCircle.value) {
    const circumference = 283
    const offset = circumference - (val * circumference)
    progressCircle.value.style.strokeDashoffset = offset
  }
}

onMounted(() => {
  window.addEventListener('scroll', updateProgress)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
})
</script>
