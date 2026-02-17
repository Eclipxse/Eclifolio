import { defineNuxtPlugin } from '#app'
import gsap from 'gsap'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('magnetic', {
        mounted(el: HTMLElement) {
            el.addEventListener('mousemove', (e: MouseEvent) => {
                const rect = el.getBoundingClientRect()
                const relX = e.clientX - rect.left - rect.width / 2
                const relY = e.clientY - rect.top - rect.height / 2

                gsap.to(el, {
                    x: relX * 0.4, // Strength of the magnet
                    y: relY * 0.4,
                    duration: 0.5,
                    ease: 'power2.out'
                })
            })

            el.addEventListener('mouseleave', () => {
                gsap.to(el, {
                    x: 0,
                    y: 0,
                    duration: 0.8,
                    ease: 'elastic.out(1, 0.3)'
                })
            })
        }
    })
})
