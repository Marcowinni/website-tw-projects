import * as React from "react"
import { motion, PanInfo } from "framer-motion"
import { cn } from "../../lib/utils"

export interface Testimonial {
  id: number | string
  name: string
  avatar: string
  description: string
  role: string // Neu: Rolle (z.B. "Lehrerin")
}

interface TestimonialCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  testimonials: Testimonial[]
  showArrows?: boolean
  showDots?: boolean
}

const TestimonialCarousel = React.forwardRef<HTMLDivElement, TestimonialCarouselProps>(
  ({ className, testimonials, showArrows = true, showDots = true, ...props }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [exitX, setExitX] = React.useState<number>(0)

    const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (Math.abs(info.offset.x) > 100) {
        setExitX(info.offset.x)
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % testimonials.length)
          setExitX(0)
        }, 200)
      }
    }

    // Hilfsfunktion für Avatar-Fallback
    const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').substring(0, 2);

    return (
      <div ref={ref} className={cn("h-96 w-full flex items-center justify-center overflow-visible", className)} {...props}>
        <div className="relative w-full max-w-md h-72 perspective-1000">
          {testimonials.map((testimonial, index) => {
            const isCurrentCard = index === currentIndex
            const isPrevCard = index === (currentIndex + 1) % testimonials.length
            const isNextCard = index === (currentIndex + 2) % testimonials.length

            if (!isCurrentCard && !isPrevCard && !isNextCard) return null

            return (
              <motion.div
                key={testimonial.id}
                className={cn(
                  "absolute w-full h-full rounded-3xl cursor-grab active:cursor-grabbing p-8",
                  "bg-white/95 backdrop-blur-sm shadow-2xl border border-white/50",
                  "flex flex-col items-center justify-center text-center gap-4"
                )}
                style={{ zIndex: isCurrentCard ? 30 : isPrevCard ? 20 : 10 }}
                drag={isCurrentCard ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={isCurrentCard ? handleDragEnd : undefined}
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{
                  scale: isCurrentCard ? 1 : 0.9,
                  opacity: isCurrentCard ? 1 : isPrevCard ? 0.5 : 0.3,
                  x: isCurrentCard ? exitX : 0,
                  y: isCurrentCard ? 0 : isPrevCard ? 15 : 30,
                  rotate: isCurrentCard ? exitX / 20 : isPrevCard ? -2 : -4,
                  zIndex: isCurrentCard ? 30 : isPrevCard ? 20 : 10
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="relative">
                    <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-20 h-20 rounded-full object-cover border-4 border-cyan-100 shadow-md"
                        onError={(e) => {
                            // Fallback wenn Bild nicht lädt
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling!.classList.remove('hidden');
                        }}
                    />
                    <div className="hidden w-20 h-20 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 font-bold text-xl border-4 border-white">
                        {getInitials(testimonial.name)}
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-slate-800">{testimonial.name}</h3>
                    <p className="text-sm text-cyan-600 font-medium uppercase tracking-wide">{testimonial.role}</p>
                </div>
                
                <p className="text-slate-600 leading-relaxed italic">
                  "{testimonial.description}"
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    )
  }
)
TestimonialCarousel.displayName = "TestimonialCarousel"

export { TestimonialCarousel }