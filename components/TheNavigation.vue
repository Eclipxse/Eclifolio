<template>
  <div class="fixed top-0 right-0 z-[9000] p-6 md:p-10 pointer-events-none sticky-nav-container">
    <!-- Hamburger Button -->
    <button 
      class="pointer-events-auto w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md flex flex-col items-center justify-center gap-1.5 md:gap-2 group hover:scale-110 transition-transform duration-300"
      @click="toggleMenu"
    >
      <span 
        ref="line1"
        class="w-6 md:w-8 h-0.5 bg-white transition-transform duration-300"
      ></span>
      <span 
        ref="line2"
        class="w-6 md:w-8 h-0.5 bg-white transition-opacity duration-300"
      ></span>
      <span 
        ref="line3"
        class="w-6 md:w-8 h-0.5 bg-white transition-transform duration-300"
      ></span>
    </button>
  </div>

  <!-- Full Screen Overlay -->
  <div 
    ref="menuOverlay"
    class="fixed inset-0 bg-black z-[8999] flex flex-col items-center justify-center translate-y-[-100%]"
  >
    <div class="text-center flex flex-col gap-6 md:gap-10">
      <a 
        v-for="(link, index) in links" 
        :key="index"
        href="#" 
        class="nav-link font-display text-4xl md:text-7xl font-bold text-white hover:text-accent transition-colors overflow-hidden"
        @click="toggleMenu"
        data-cursor="hover"
      >
        <span class="inline-block transform translate-y-[100%]">{{ link }}</span>
      </a>
    </div>

    <!-- Decorative Big Text -->
    <div class="absolute bottom-10 left-10 md:left-20 text-white/5 font-display text-9xl font-bold pointer-events-none select-none">
      MENU
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const { gsap } = useGsap()

const isOpen = ref(false)
const menuOverlay = ref(null)
const line1 = ref(null)
const line2 = ref(null)
const line3 = ref(null)

const links = ['WORK', 'ABOUT', 'SERVICES', 'CONTACT']

const toggleMenu = () => {
  isOpen.value = !isOpen.value

  if (isOpen.value) {
    // Animate Hamburger to X
    gsap.to(line1.value, { rotate: 45, y: 6, duration: 0.3 })
    gsap.to(line2.value, { opacity: 0, duration: 0.3 })
    gsap.to(line3.value, { rotate: -45, y: -6, duration: 0.3 })

    // Open Overlay
    const tl = gsap.timeline()
    tl.to(menuOverlay.value, {
      y: '0%',
      duration: 0.8,
      ease: 'power4.inOut'
    })
    
    // Stagger Links
    tl.to('.nav-link span', {
      y: '0%',
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out'
    }, '-=0.4')
    
  } else {
    // Animate X back to Hamburger
    gsap.to(line1.value, { rotate: 0, y: 0, duration: 0.3 })
    gsap.to(line2.value, { opacity: 1, duration: 0.3 })
    gsap.to(line3.value, { rotate: 0, y: 0, duration: 0.3 })

    // Close Overlay
    const tl = gsap.timeline()
    tl.to('.nav-link span', {
      y: '100%',
      duration: 0.4,
      ease: 'power3.in'
    })
    
    tl.to(menuOverlay.value, {
      y: '-100%',
      duration: 0.8,
      ease: 'power4.inOut'
    }, '-=0.2')
  }
}
</script>

<style scoped>
/* Ensure button stays clickable */
.sticky-nav-container {
  mix-blend-mode: difference;
}
</style>
