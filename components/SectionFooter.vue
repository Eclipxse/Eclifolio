<template>
  <footer ref="footer" class="w-full py-20 px-6 md:px-20 border-t border-white/10 bg-black z-10 relative">
    <div class="flex flex-col md:flex-row justify-between items-start gap-10">
      <div class="flex flex-col gap-4">
        <h3 class="font-display text-4xl font-bold">ECLIPXSE</h3>
        <p class="text-white/40 max-w-xs">Crafting digital voids and interactive experiences.</p>
      </div>
      
      <div class="flex gap-10 text-sm font-mono text-white/60">
        <a href="#" class="hover:text-white transition-colors">TWITTER</a>
        <a href="#" class="hover:text-white transition-colors">GITHUB</a>
        <a href="#" class="hover:text-white transition-colors">LINKEDIN</a>
      </div>
    </div>
    
    <div class="mt-20 pt-10 border-t border-white/5 flex justify-between items-center text-xs text-white/20 font-mono">
      <span>© 2026 PROJECT LAWLIET</span>
      <span>ALL RIGHTS RESERVED</span>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const footer = ref(null)

onMounted(() => {
    gsap.from(footer.value, {
        scrollTrigger: {
            trigger: footer.value,
            start: "top 95%"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    })
})
</script>
