'use client'
import { motion, useInView , useAnimate} from 'framer-motion'
import { useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function AnimationOpacity({ children }: { children: React.ReactNode}) {
  const ref = useRef(null)
  const  inView  = useInView(ref, {once: true})

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 1,delay: 0.1}}
    >
      {children}
    </motion.div>
  )
}

export function AnimationSlideY({ children }: { children: React.ReactNode}) {
  const ref = useRef(null)
  const  inView  = useInView(ref, {once: true})

  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: inView ? 0 : 50, opacity: inView ? 1 : 0 }}
      transition={{ duration: 1, delay: 0.1}}
    >
      {children}
    </motion.div>
  )
}

export function NotificationAnimation({ children }: { children: React.ReactNode}) {

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: -50, opacity: 1 }}
      transition={{ duration: .5}}
    >
      {children}
    </motion.div>
  )
}



export function AnimationSlideX({ children }: { children: React.ReactNode}) {
  const ref = useRef(null)
  const  inView  = useInView(ref, {once: true})

  return (
    <motion.div
      ref={ref}
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: inView ? 0 : 50, opacity: inView ? 1 : 0 }}
      transition={{ duration: 1, delay: 0.1}}
    >
      {children}
    </motion.div>
  )
}
