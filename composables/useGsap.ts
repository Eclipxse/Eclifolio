import { onUnmounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const useGsap = () => {
    const ctx = gsap.context(() => { })

    onUnmounted(() => {
        ctx.revert()
    })

    return {
        gsap,
        ScrollTrigger,
        ctx
    }
}
