"use client"
import { useEffect, useId, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"

export function Sparkles({
  className,
  size = 1,
  minSize = null,
  density = 800,
  speed = 1,
  minSpeed = null,
  opacity = 1,
  opacitySpeed = 3,
  minOpacity = null,
  color = "#FFFFFF",
  background = "transparent",
  options = {},
}: any) {
  const [isReady, setIsReady] = useState(false)
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setIsReady(true))
  }, [])
  const id = useId()
  
  // @ts-ignore
  return isReady && <Particles id={id} className={className} options={{
    background: { color: { value: background } },
    fullScreen: { enable: false, zIndex: 1 },
    fpsLimit: 120,
    particles: {
      color: { value: color },
      move: { enable: true, speed: { min: minSpeed || speed / 10, max: speed } },
      number: { value: density },
      opacity: { value: { min: minOpacity || opacity / 10, max: opacity }, animation: { enable: true, speed: opacitySpeed } },
      size: { value: { min: minSize || size / 2.5, max: size } },
    },
    detectRetina: true,
    ...options
  }} />
}