<template>
  <span 
    @mouseenter="scramble"
    class="inline-block cursor-default"
  >
    {{ displayText }}
  </span>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  text: string
}>()

const displayText = ref(props.text)
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+'
let interval: any

const scramble = () => {
  let iteration = 0
  clearInterval(interval)
  
  interval = setInterval(() => {
    displayText.value = props.text
      .split('')
      .map((letter, index) => {
        if (index < iteration) {
          return props.text[index]
        }
        return chars[Math.floor(Math.random() * 26)]
      })
      .join('')
    
    if (iteration >= props.text.length) {
      clearInterval(interval)
    }
    
    iteration += 1 / 3
  }, 30)
}

onMounted(() => {
  // initial scramble on load
  scramble()
})
</script>
