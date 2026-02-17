<template>
  <section class="w-full py-24 bg-[#1a1a1a] flex justify-center items-center px-6" ref="cardSection">
    
    <!-- Holographic Card Container -->
    <div 
      class="relative w-full max-w-2xl bg-[#111] rounded-xl border border-[#333] p-8 md:p-12 shadow-[0_0_50px_rgba(0,243,255,0.05)] overflow-hidden group hover:border-[#00f3ff]/50 transition-colors duration-500"
      @mousemove="handleMouseMove"
      @mouseleave="resetTilt"
      ref="card"
      style="transform-style: preserve-3d;"
    >
      <!-- Background Grid/Scanlines -->
      <div class="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-[#00f3ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-scan"></div>

      <!-- Content Layout -->
      <div class="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center" style="transform: translateZ(20px);">
        
        <!-- Avatar Section -->
        <div class="relative shrink-0">
            <!-- Hologram Ring -->
            <div class="absolute -inset-4 border border-[#00f3ff]/30 rounded-full animate-spin-slow border-t-transparent border-l-transparent"></div>
            <div class="absolute -inset-4 border border-[#00f3ff]/10 rounded-full animate-reverse-spin border-b-transparent border-r-transparent"></div>
            
            <div class="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-[#00f3ff] shadow-[0_0_20px_#00f3ff40] bg-[#000]">
                <img src="/assets/lawliet_final.jpg" alt="Lawliet" class="w-full h-full object-cover pixelated" />
                <!-- Scanline Overlay -->
                <div class="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[size:100%_2px,3px_100%] pointer-events-none"></div>
                <div class="absolute inset-x-0 h-1 bg-[#00f3ff]/50 animate-scan-fast z-20"></div>
            </div>
            
            <!-- Level Badge -->
            <div class="absolute -bottom-2 -right-2 bg-[#00f3ff] text-black font-black font-mono text-xs px-2 py-1 rounded border border-black shadow-[0_0_10px_#00f3ff]">
                LVL.99
            </div>
        </div>

        <!-- Stats Info -->
        <div class="flex-1 w-full">
            <div class="flex justify-between items-end mb-6 border-b border-[#333] pb-2">
                <div>
                    <h2 class="text-3xl font-display font-black text-white tracking-widest uppercase shadow-[#00f3ff] drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]">
                        LAWLIET
                    </h2>
                    <p class="text-[#00f3ff] font-mono text-sm tracking-wider">ID: 539-77-404 // CLASS: FULL STACK</p>
                </div>
                <div class="hidden md:block">
                     <Icon name="ph:fingerprint-simple-bold" class="text-4xl text-[#333] group-hover:text-[#00f3ff] transition-colors duration-500" />
                </div>
            </div>

            <!-- Stat Bars -->
            <div class="space-y-4 font-mono text-xs tracking-wider">
                <!-- INT -->
                <div>
                    <div class="flex justify-between text-gray-400 mb-1">
                        <span>INT [INTELLIGENCE]</span>
                        <span class="text-[#00f3ff]">{{ stats.int }}%</span>
                    </div>
                    <div class="h-2 bg-[#1a1a1a] rounded-full overflow-hidden border border-[#333]">
                        <div class="h-full bg-[#00f3ff] shadow-[0_0_10px_#00f3ff] transition-all duration-1000 ease-out" :style="{ width: stats.int + '%' }"></div>
                    </div>
                </div>

                <!-- STR -->
                <div>
                    <div class="flex justify-between text-gray-400 mb-1">
                        <span>STR [CREATIVITY]</span>
                        <span class="text-[#ffbf00]">{{ stats.str }}%</span>
                    </div>
                    <div class="h-2 bg-[#1a1a1a] rounded-full overflow-hidden border border-[#333]">
                        <div class="h-full bg-[#ffbf00] shadow-[0_0_10px_#ffbf00] transition-all duration-1000 ease-out delay-100" :style="{ width: stats.str + '%' }"></div>
                    </div>
                </div>

                <!-- AGI -->
                <div>
                    <div class="flex justify-between text-gray-400 mb-1">
                        <span>AGI [EFFICIENCY]</span>
                        <span class="text-[#ff0055]">{{ stats.agi }}%</span>
                    </div>
                    <div class="h-2 bg-[#1a1a1a] rounded-full overflow-hidden border border-[#333]">
                        <div class="h-full bg-[#ff0055] shadow-[0_0_10px_#ff0055] transition-all duration-1000 ease-out delay-200" :style="{ width: stats.agi + '%' }"></div>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useElementVisibility } from '@vueuse/core'

const card = ref(null)
const cardSection = ref(null)
const isVisible = useElementVisibility(cardSection)

// Reactive stats for animation
const stats = ref({
    int: 0,
    str: 0,
    agi: 0
})

// Tilt Effect Logic
const handleMouseMove = (e: MouseEvent) => {
    if (!card.value) return
    const rect = card.value.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Calculate rotation (-10 to 10 degrees)
    const xRot = ((y / rect.height) - 0.5) * -10
    const yRot = ((x / rect.width) - 0.5) * 10
    
    card.value.style.transform = `perspective(1000px) rotateX(${xRot}deg) rotateY(${yRot}deg)`
}

const resetTilt = () => {
    if (!card.value) return
    card.value.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`
}

// Animate stats when visible
watch(isVisible, (visible) => {
    if (visible) {
        // Simple easing animation simulation
        setTimeout(() => { stats.value.int = 98 }, 100)
        setTimeout(() => { stats.value.str = 95 }, 200)
        setTimeout(() => { stats.value.agi = 100 }, 300)
    }
})

</script>

<style scoped>
.pixelated {
    image-rendering: pixelated;
}

@keyframes scan {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(200%); }
}
.animate-scan {
    animation: scan 3s linear infinite;
}

@keyframes scan-fast {
    0% { top: 0%; opacity: 0; }
    50% { opacity: 1; }
    100% { top: 100%; opacity: 0; }
}
.animate-scan-fast {
    animation: scan-fast 2s linear infinite;
}

@keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
.animate-spin-slow {
    animation: spin-slow 10s linear infinite;
}

@keyframes reverse-spin {
    from { transform: rotate(360deg); }
    to { transform: rotate(0deg); }
}
.animate-reverse-spin {
    animation: reverse-spin 15s linear infinite;
}
</style>
