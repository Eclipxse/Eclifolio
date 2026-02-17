<template>
  <section class="w-full py-24 bg-[#1a1a1a] px-6 md:px-20">
    <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-display font-bold text-[#e0e0e0] mb-12 tracking-widest uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] border-l-4 border-[#00f3ff] pl-6 text-left">
          Arsenal / Tech Stack
        </h2>

        <!-- Motherboard Grid -->
        <div ref="techGrid" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 p-10 bg-[#202020] rounded-xl shadow-[inset_5px_5px_15px_#0d0d0d,inset_-5px_-5px_15px_#2f2f2f] border border-[#333]">
        
        <div 
            v-for="tech in techStack" 
            :key="tech.name"
            class="tech-item group relative w-32 h-32 bg-[#1a1a1a] rounded-lg shadow-[5px_5px_10px_#0d0d0d,-5px_-5px_10px_#2f2f2f] 
                flex flex-col items-center justify-center transition-all duration-300
                hover:shadow-[inset_2px_2px_5px_#0d0d0d,inset_-2px_-2px_5px_#333] hover:scale-95 cursor-pointer"
        >
            <!-- LED Indicator -->
            <div class="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#111] shadow-[inset_1px_1px_2px_#000] group-hover:bg-[#00f3ff] group-hover:shadow-[0_0_8px_#00f3ff] transition-colors duration-300"></div>

            <!-- Tech Icon -->
            <Icon :name="tech.icon" class="text-4xl mb-2 text-gray-400 group-hover:text-[#00f3ff] transition-colors duration-300" />
            <span class="text-sm font-mono text-gray-500 group-hover:text-[#00f3ff] transition-colors">{{ tech.name }}</span>

            <!-- Screw decorations -->
            <div class="absolute top-2 left-2 w-1 h-1 bg-[#444] rounded-full shadow-[inset_0.5px_0.5px_1px_#000]"></div>
            <div class="absolute bottom-2 right-2 w-1 h-1 bg-[#444] rounded-full shadow-[inset_0.5px_0.5px_1px_#000]"></div>
            <div class="absolute bottom-2 left-2 w-1 h-1 bg-[#444] rounded-full shadow-[inset_0.5px_0.5px_1px_#000]"></div>
        </div>

        </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const techGrid = ref(null)

const techStack = [
  { name: 'Vue.js', icon: 'logos:vue' },
  { name: 'Nuxt', icon: 'logos:nuxt-icon' },
  { name: 'TypeScript', icon: 'logos:typescript-icon' },
  { name: 'JavaScript', icon: 'logos:javascript' },
  { name: 'Three.js', icon: 'logos:threejs' },
  { name: 'Python', icon: 'logos:python' },
  { name: 'Rust', icon: 'logos:rust' },
  { name: 'Go', icon: 'logos:go' },
  { name: 'Node.js', icon: 'logos:nodejs-icon' },
  { name: 'C++', icon: 'logos:c-plusplus' },
  { name: 'HTML5', icon: 'logos:html-5' },
  { name: 'CSS3', icon: 'logos:css-3' },
  { name: 'Docker', icon: 'logos:docker-icon' },
  { name: 'AWS', icon: 'logos:aws' },
  { name: 'Git', icon: 'logos:git-icon' }
]

onMounted(() => {
    // Staggered Grid Entrance
    gsap.fromTo(".tech-item", 
        { 
            y: 50, 
            opacity: 0, 
            scale: 0.8 
        },
        {
            scrollTrigger: {
                trigger: techGrid.value,
                start: "top 90%", // Trigger earlier
                toggleActions: "play none none reverse"
            },
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.05,
            ease: "back.out(1.7)"
        }
    )
})
</script>
