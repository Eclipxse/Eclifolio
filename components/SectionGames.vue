<template>
  <section class="w-full py-24 bg-[#1a1a1a] px-6 md:px-20">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-3xl font-display font-bold text-[#e0e0e0] mb-24 tracking-widest uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] border-l-4 border-[#ffbf00] pl-6 text-left">
        Game Library
      </h2>

      <div class="flex flex-col gap-32">
        <!-- Game Item -->
        <div 
           v-for="(game, index) in games" 
           :key="game.title"
           class="game-item group relative w-full flex flex-col lg:flex-row gap-10 items-center"
           :class="{'lg:flex-row-reverse': index % 2 !== 0}"
        >
          <!-- Visual Context -->
          <div class="w-full lg:w-3/5 h-[400px] md:h-[500px] relative rounded-lg overflow-hidden shadow-[10px_10px_30px_#0d0d0d,-10px_-10px_30px_#2f2f2f] border border-[#333] group-hover:border-[#ffbf00] transition-colors duration-500">
             <img 
               :src="game.image" 
               class="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 mixture-blend-overlay grayscale group-hover:grayscale-0"
               alt="Cover Art"
             />
             <!-- Glare Overlay -->
             <div class="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-80"></div>
          </div>

          <!-- Info Panel -->
          <div class="w-full lg:w-2/5 flex flex-col items-start gap-6">
             <div class="flex items-center gap-4">
                <span class="text-[#ffbf00] font-mono text-xs uppercase tracking-widest">0{{ index + 1 }} // {{ game.genre }}</span>
                <div class="h-[1px] w-12 bg-[#333]"></div>
             </div>
             
             <h3 class="text-4xl md:text-5xl font-display font-bold text-white leading-tight">
                {{ game.title }}
             </h3>

             <p class="text-gray-400 font-mono text-sm leading-relaxed max-w-md">
                {{ game.description }}
             </p>
             
             <!-- Stats / Tags -->
             <div class="flex flex-wrap gap-2">
                <span v-for="tag in game.tags" :key="tag" class="px-3 py-1 bg-[#222] text-xs text-gray-500 font-mono rounded border border-[#333]">
                    {{ tag }}
                </span>
             </div>

             <button class="mt-4 px-8 py-3 bg-[#ffbf00] text-black font-bold font-mono text-sm uppercase tracking-wider hover:bg-[#ffe066] transition-colors shadow-[0_0_15px_rgba(255,191,0,0.3)]">
                Launch Protocol
             </button>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const games = [
  { 
    title: 'Black Myth: Wukong', 
    genre: 'Action RPG', 
    image: '/assets/games/wukong.jpg', 
    description: 'Confront the destiny of the Monkey King. A Souls-like journey through Chinese mythology with stunning visuals and intense combat.',
    tags: ['Unreal Engine 5', 'Mythology', 'Souls-like']
  },
  { 
    title: 'Where Winds Meet', 
    genre: 'Open World RPG', 
    image: '/assets/games/wwm.png',
    description: 'A martial arts open-world RPG set in the twilight of the Ten Kingdoms. Forge your own destiny in a time of conflict.',
    tags: ['Wuxia', 'Open World', 'Historical']
  },
  { 
    title: 'Elden Ring', 
    genre: 'Souls-like',
    image: '/assets/games/eldenring.jpg',
    description: 'Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.',
    tags: ['Open World', 'Dark Fantasy', 'GOTY']
  }
]

onMounted(() => {
    const items = gsap.utils.toArray('.game-item')
    items.forEach((item: any, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            x: i % 2 === 0 ? -100 : 100,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        })
    })
})
</script>
