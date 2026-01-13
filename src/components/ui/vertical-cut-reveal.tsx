"use client"
import { forwardRef } from "react"
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"

export const VerticalCutReveal = forwardRef<any, any>(({ children, containerClassName, ...props }, ref) => {
  return (
    <span className={cn(containerClassName, "inline-block")} ref={ref} {...props}>
      {children.split(" ").map((word: string, i: number) => (
    
        <span key={i} className="inline-block overflow-hidden align-bottom pb-1 -mb-1">
          <motion.span
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: "backOut" }}
            className="inline-block mr-[0.2em]"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
})
VerticalCutReveal.displayName = "VerticalCutReveal"