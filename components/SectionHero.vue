<template>
  <section class="min-h-screen w-full flex flex-col justify-center px-6 md:px-20 relative overflow-hidden bg-[#1a1a1a]">
    <!-- Background Texture/Noise -->
    <div class="absolute inset-0 opacity-[0.03] pointer-events-none" 
         style="background-image: url('https://grainy-gradients.vercel.app/noise.svg');"></div>

    <div class="z-10 text-left max-w-5xl">
      <!-- Debossed Metal Text -->
      <h1 ref="titleRef" class="text-[15vw] leading-[0.85] font-black font-display tracking-tighter select-none
                 text-[#1a1a1a] drop-shadow-[1px_1px_1px_rgba(255,255,255,0.1)] block"
          style="text-shadow: -1px -1px 2px rgba(0,0,0,0.9), 1px 1px 0px rgba(255,255,255,0.1);">
        LAWLIET
      </h1>

      <div class="mt-12 flex flex-col items-start gap-6 pl-4 md:pl-8 border-l-4 border-[#333]">
        <!-- LED Status Light -->
        <div ref="statusRef" class="flex items-center gap-3 bg-[#151515] px-6 py-2 rounded-full shadow-[inset_2px_2px_5px_#000,inset_-2px_-2px_5px_#333]">
          <span class="relative flex h-3 w-3">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f3ff] opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-[#00f3ff] shadow-[0_0_10px_#00f3ff]"></span>
          </span>
          <span class="text-[#00f3ff] font-mono text-sm tracking-widest shadow-[#00f3ff]">SYSTEM ONLINE</span>
        </div>

        <h2 ref="subRef" class="text-xl md:text-3xl font-mono text-gray-400 tracking-widest uppercase mt-2">
          Level 99 <span class="text-[#00f3ff] mx-2">•</span> Digital Alchemist
        </h2>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'

const titleRef = ref(null)
const statusRef = ref(null)
const subRef = ref(null)

onMounted(() => {
  const tl = gsap.timeline()
  
  // Custom Scramble Text Effect
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
  const targetText = "LAWLIET"
  const duration = 2
  const steps = 30
  
  let step = 0
  const interval = setInterval(() => {
    if (!titleRef.value) return
    const progress = step / steps
    const scrambled = targetText.split('').map((char, index) => {
        if (index < progress * targetText.length) {
            return char
        }
        return chars[Math.floor(Math.random() * chars.length)]
    }).join('')
    
    titleRef.value.innerText = scrambled
    step++
    
    if (step > steps) {
        clearInterval(interval)
        titleRef.value.innerText = targetText
    }
  }, duration * 1000 / steps)

  // Staggered Entrance
  tl.from(statusRef.value, {
    y: 20,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    delay: 0.5
  })
  .from(subRef.value, {
    x: -20,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  }, "-=0.8")

})
</script>

<style scoped>
/* Scoped styles remain */
.font-display {
  font-family: 'Syne', sans-serif;
}
</style>
