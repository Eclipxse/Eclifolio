<template>
  <TresPerspectiveCamera 
    ref="cameraRef"
    :position="[0, 0, 14]" 
    :fov="35" 
    :look-at="[0, 0, 0]" 
  />
  
  <OrbitControls 
    ref="controlsRef"
    :enable-zoom="false" 
    :enable-pan="false" 
    :enable-damping="true"
    :auto-rotate="false"
  />
  
  <Suspense>
    <TresGroup ref="sceneGroupRef">
      <!-- 1. THE SUN (Core) -->
      <TresMesh ref="sunRef" :position="[0, 0, -5]">
        <TresSphereGeometry :args="[4.4, 64, 64]" />
        <TresShaderMaterial v-bind="sunShader" />
      </TresMesh>

      <!-- 1b. THE CORONA (Glow Mesh behind) -->
      <TresMesh v-if="glowTexture" :position="[0, 0, -6]">
         <TresPlaneGeometry :args="[20, 20]" />
         <TresMeshBasicMaterial :map="glowTexture" :transparent="true" :opacity="0.8" color="#ffaa00" :blending="THREE.AdditiveBlending" :depth-write="false" />
      </TresMesh>

      <!-- 2. THE MOON (Occluder) -->
      <TresMesh 
        ref="moonRef" 
        :position="[0, 0, 4]"
        @click="handleEnter"
        @pointer-enter="onPointerEnter"
        @pointer-leave="onPointerLeave"
      >
        <TresSphereGeometry :args="[3.9, 64, 64]" />
        <TresMeshStandardMaterial 
          color="#000000"
          :roughness="0.9"
          :metalness="0.1"
        />
      </TresMesh>

      <!-- Stars -->
       <Stars :radius="100" :depth="50" :count="5000" :factor="4" />
    </TresGroup>
  </Suspense>

  <!-- Rim Light -->
  <TresSpotLight :position="[5, 5, 5]" :intensity="100" color="#ffffff" :distance="50" :angle="0.5" :penumbra="1" />
  <TresAmbientLight :intensity="0.05" />
</template>

<script setup lang="ts">
import { shallowRef, ref, onMounted } from 'vue'
import { useLoop } from '@tresjs/core'
import { OrbitControls, Stars } from '@tresjs/cientos'
import * as THREE from 'three'
import gsap from 'gsap'

// Emits for interaction
const emit = defineEmits(['enter'])

const cameraRef = shallowRef()
const sunRef = shallowRef()
const moonRef = shallowRef()
const controlsRef = shallowRef()
const glowTexture = shallowRef(null)

// --- TEXTURE LOADER (Native THREE) ---
const glowTextureUrl = `data:image/svg+xml;base64,${btoa(`
<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
      <stop offset="0%" style="stop-color:rgb(255,160,0);stop-opacity:1" />
      <stop offset="50%" style="stop-color:rgb(255,100,0);stop-opacity:0.5" />
      <stop offset="100%" style="stop-color:rgb(0,0,0);stop-opacity:0" />
    </radialGradient>
  </defs>
  <rect width="512" height="512" fill="url(#glow)" />
</svg>
`)}`

onMounted(async () => {
    try {
        const loader = new THREE.TextureLoader()
        const texture = await loader.loadAsync(glowTextureUrl)
        if (texture) {
             glowTexture.value = texture
        }
    } catch (e) {
        console.error("Texture load failed", e)
    }
})

const { onBeforeRender } = useLoop()

// --- SUN SHADER (Procedural Plasma) ---
const sunShader = {
  uniforms: {
    uTime: { value: 0 },
    uColorA: { value: new THREE.Color('#ff0000') }, // Red
    uColorB: { value: new THREE.Color('#ffaa00') }, // Orange
    uColorC: { value: new THREE.Color('#ffffff') }, // Core White
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform vec3 uColorC;
    
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    // Simplex Noise (Simplified)
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    float snoise(vec3 v) {
        const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
        const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i  = floor(v + dot(v, C.yyy) );
        vec3 x0 = v - i + dot(i, C.xxx) ;
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min( g.xyz, l.zxy );
        vec3 i2 = max( g.xyz, l.zxy );
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        vec3 i = mod289(i);
        vec4 p = permute( permute( permute( 
                  i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
                + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
        float n_ = 0.142857142857;
        vec3  ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_ );
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4( x.xy, y.xy );
        vec4 b1 = vec4( x.zw, y.zw );
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
        vec3 p0 = vec3(a0.xy,h.x);
        vec3 p1 = vec3(a0.zw,h.y);
        vec3 p2 = vec3(a1.xy,h.z);
        vec3 p3 = vec3(a1.zw,h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
        vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 105.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
    }

    void main() {
      // Noise Field
      float n = snoise(vPosition * 1.5 + uTime * 0.2);
      float n2 = snoise(vPosition * 3.0 - uTime * 0.5);
      
      // Fresnel / Rim
      vec3 viewDir = normalize(cameraPosition - vPosition);
      float fresnel = pow(1.0 - dot(viewDir, vNormal), 3.0);
      
      // Mixing
      vec3 color = mix(uColorA, uColorB, n * 0.5 + 0.5);
      color = mix(color, uColorC, n2 * fresnel);
      
      // Brighten Core
      color += vec3(0.2) * fresnel;

      gl_FragColor = vec4(color, 1.0);
    }
  `,
  transparent: true,
  side: THREE.BackSide
}

onBeforeRender(({ elapsed }) => {
  sunShader.uniforms.uTime.value = elapsed
})

// --- INTERACTION ---
const isEntering = shallowRef(false)

const onPointerEnter = () => {
    document.body.style.cursor = 'pointer'
}
const onPointerLeave = () => {
    document.body.style.cursor = 'default'
}

const handleEnter = () => {
    if(isEntering.value) return
    isEntering.value = true
    
    // 1. Disable Controls
    if(controlsRef.value) controlsRef.value.enabled = false
    
    // 2. Animate Camera INTO the Moon
    if(cameraRef.value && moonRef.value) {
        gsap.to(cameraRef.value.position, {
            x: moonRef.value.position.x,
            y: moonRef.value.position.y,
            z: moonRef.value.position.z + 0.5, // Stop just inside
            duration: 2.0,
            ease: "power3.inOut",
            onComplete: () => {
                emit('enter')
            }
        })
    }
}
</script>
