<template>
  <div
    v-if="!isRevealed"
    ref="preloaderRef"
    class="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black text-white overflow-hidden"
  >
    <!-- Counter logic same as before, but styled differently -->
    <div ref="counterRef" class="text-[20vw] font-display font-bold leading-none tracking-tighter mix-blend-exclusion z-20">
      {{ progress }}%
    </div>

    <!-- Shutter Panels -->
    <div ref="shutterTopRef" class="absolute top-0 left-0 w-full h-1/2 bg-black z-10 origin-top"></div>
    <div ref="shutterBottomRef" class="absolute bottom-0 left-0 w-full h-1/2 bg-black z-10 origin-bottom"></div>

    <!-- Glitch Overlay Layer (Visible during transition) -->
    <div 
      ref="glitchRef" 
      class="absolute inset-0 z-30 pointer-events-none opacity-0 mix-blend-color-dodge bg-red-500/20"
      style="transform: translateX(-10px);"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isRevealed = ref(false)
const progress = ref(0)
const preloaderRef = ref(null)
const emit = defineEmits(['loaded'])

onMounted(() => {
  console.log('Preloader: Starting...')
  
  // 1. Native JS Interval for Counter (Bulletproof)
  let val = 0
  const interval = setInterval(() => {
    val += Math.random() * 5 // Random increment
    if (val >= 100) {
        val = 100
        progress.value = 100
        clearInterval(interval)
        finishLoading()
    } else {
        progress.value = Math.floor(val)
    }
  }, 50) // Update every 50ms

  // 2. Emergency Failsafe (Force load after 3s no matter what)
  setTimeout(() => {
      if (!isRevealed.value) {
          console.warn('Preloader: Failsafe Triggered')
          progress.value = 100
          finishLoading()
      }
  }, 3000)
})

const finishLoading = () => {
    if (isRevealed.value) return
    console.log('Preloader: Finished')
    
    // Smooth reveal
    setTimeout(() => {
        isRevealed.value = true
        // Allow CSS transition to finish before emitting? 
        // Actually emit immediately so app knows interaction is allowed, 
        // but maybe wait a split second for the curtain visual.
        emit('loaded')
    }, 500)
}
</script>
