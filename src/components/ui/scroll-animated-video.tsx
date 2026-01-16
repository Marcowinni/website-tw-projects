import React, { CSSProperties, ReactNode, useEffect, useMemo, useRef } from "react";

type Source = { mp4?: string; webm?: string; ogg?: string };
type VideoLike = string | Source;

type Eases = {
  container?: string;
  overlay?: string;
  text?: string;
};

export type HeroScrollVideoProps = {
  title?: ReactNode;
  subtitle?: ReactNode;
  meta?: ReactNode;
  credits?: ReactNode;
  media?: VideoLike;
  poster?: string;
  mediaType?: "video" | "image";
  orientation?: "landscape" | "portrait";
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  autoPlay?: boolean;
  overlay?: {
    caption?: ReactNode;
    heading?: ReactNode;
    paragraphs?: ReactNode[];
    extra?: ReactNode;
  };
  initialBoxSize?: number;
  targetSize?: { widthVw: number; heightVh: number; borderRadius?: number } | "fullscreen";
  scrollHeightVh?: number;
  showHeroExitAnimation?: boolean;
  sticky?: boolean;
  overlayBlur?: number;
  overlayRevealDelay?: number;
  eases?: Eases;
  smoothScroll?: boolean;
  lenisOptions?: Record<string, unknown>;
  className?: string;
  style?: CSSProperties;
};

const DEFAULTS = {
  initialBoxSize: 360,
  targetSize: "fullscreen" as const,
  scrollHeightVh: 280,
  overlayBlur: 10,
  overlayRevealDelay: 0.35,
  eases: {
    container: "expo.out",
    overlay: "expo.out",
    text: "power3.inOut",
  } as Eases,
};

function isSourceObject(m?: VideoLike): m is Source {
  return !!m && typeof m !== "string";
}

export const HeroScrollVideo: React.FC<HeroScrollVideoProps> = ({
  title = "Future Forms",
  subtitle = "Design in Motion",
  meta = "2025",
  credits,
  media,
  poster,
  mediaType = "video",
  orientation = "landscape",
  muted = true,
  loop = true,
  playsInline = true,
  autoPlay = false,
  overlay,
  initialBoxSize = DEFAULTS.initialBoxSize,
  targetSize = DEFAULTS.targetSize,
  scrollHeightVh = DEFAULTS.scrollHeightVh,
  showHeroExitAnimation = true,
  sticky = true,
  overlayBlur = DEFAULTS.overlayBlur,
  overlayRevealDelay = DEFAULTS.overlayRevealDelay,
  eases = DEFAULTS.eases,
  smoothScroll = true,
  lenisOptions,
  className,
  style,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const overlayCaptionRef = useRef<HTMLDivElement | null>(null);
  const overlayContentRef = useRef<HTMLDivElement | null>(null);

  const isClient = typeof window !== "undefined";

  const cssVars: CSSProperties = useMemo(
    () => ({
      ["--initial-size" as any]: `${initialBoxSize}px`,
      ["--overlay-blur" as any]: `${overlayBlur}px`,
    }),
    [initialBoxSize, overlayBlur]
  );

  useEffect(() => {
    if (!isClient) return;

    let gsap: any;
    let ScrollTrigger: any;
    let CustomEase: any;
    let LenisCtor: any;
    let lenis: any;
    let heroTl: any;
    let mainTl: any;
    let overlayDarkenEl: HTMLDivElement | null = null;
    let rafCb: ((t: number) => void) | null = null;
    let cancelled = false;

    (async () => {
      const gsapPkg = await import("gsap");
      gsap = gsapPkg.gsap || gsapPkg.default || gsapPkg;

      const STPkg = await import("gsap/ScrollTrigger").catch(() => import("gsap/dist/ScrollTrigger"));
      ScrollTrigger = STPkg.default || (STPkg as any).ScrollTrigger || STPkg;

      const CEPkg = await import("gsap/CustomEase").catch(() => import("gsap/dist/CustomEase"));
      CustomEase = CEPkg.default || (CEPkg as any).CustomEase || CEPkg;

      gsap.registerPlugin(ScrollTrigger, CustomEase);

      if (cancelled) return;

      if (smoothScroll) {
        const try1 = await import("lenis").catch(() => null);
        LenisCtor = try1?.default || (try1 as any)?.Lenis;
        if (LenisCtor) {
          lenis = new LenisCtor({ duration: 0.8, smoothWheel: true, ...lenisOptions });
          rafCb = (time: number) => lenis?.raf(time * 1000);
          gsap.ticker.add(rafCb);
          lenis?.on?.("scroll", ScrollTrigger.update);
        }
      }

      const container = containerRef.current!;
      const overlayEl = overlayRef.current!;
      const overlayCaption = overlayCaptionRef.current!;
      const overlayContent = overlayContentRef.current!;
      const headline = headlineRef.current!;

      if (container) {
        overlayDarkenEl = document.createElement("div");
        overlayDarkenEl.style.position = "absolute";
        overlayDarkenEl.style.inset = "0";
        overlayDarkenEl.style.background = "rgba(0,0,0,0)";
        overlayDarkenEl.style.zIndex = "1";
        container.appendChild(overlayDarkenEl);
      }

      if (showHeroExitAnimation && headline) {
        heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: headline,
            start: "top top",
            end: "top+=420 top",
            scrub: 1.1,
          },
        });
        headline.querySelectorAll<HTMLElement>(".hsv-headline > *").forEach((el, i) => {
          heroTl.to(el, { y: -36, opacity: 0, filter: "blur(4px)", ease: eases.text ?? "power3.inOut" }, i * 0.08);
        });
      }

      const triggerEl = rootRef.current?.querySelector("[data-sticky-scroll]") as HTMLElement;
      if (!triggerEl) return;

      mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerEl,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.1,
        },
      });

      const target = targetSize === "fullscreen" 
        ? (orientation === "portrait" 
            ? { width: "56.25vh", height: "100vh", borderRadius: 0 }
            : { width: "92vw", height: "92vh", borderRadius: 0 })
        : { width: `${targetSize.widthVw}vw`, height: `${targetSize.heightVh}vh`, borderRadius: targetSize.borderRadius ?? 0 };

      gsap.set(container, { width: initialBoxSize, height: initialBoxSize, borderRadius: 20 });
      gsap.set(overlayEl, { clipPath: "inset(100% 0 0 0)" });
      gsap.set([overlayContent, overlayCaption], { y: 30 });

      mainTl
        .to(container, { width: target.width, height: target.height, borderRadius: target.borderRadius, ease: eases.container ?? "expo.out" }, 0)
        .to(overlayDarkenEl, { backgroundColor: "rgba(0,0,0,0.4)" }, 0)
        .to(overlayEl, { clipPath: "inset(0% 0 0 0)", backdropFilter: `blur(${overlayBlur}px)`, ease: eases.overlay ?? "expo.out" }, overlayRevealDelay)
        .to([overlayCaption, overlayContent], { y: 0, filter: "blur(0px)", stagger: 0.05 }, overlayRevealDelay + 0.05);

      const videoEl = container.querySelector("video");
      if (videoEl) videoEl.play().catch(() => {});
    })();

    return () => {
      cancelled = true;
      heroTl?.kill?.();
      mainTl?.kill?.();
      if (rafCb) gsap?.ticker?.remove(rafCb);
      lenis?.destroy?.();
    };
  }, [isClient, initialBoxSize, targetSize, scrollHeightVh, overlayBlur, overlayRevealDelay, eases, showHeroExitAnimation, smoothScroll, lenisOptions]);

  const renderMedia = () => {
    if (mediaType === "image") {
      return <img src={typeof media === "string" ? media : ""} alt="" className="w-full h-full object-cover" />;
    }
    return (
      <video muted loop playsInline autoPlay className="w-full h-full object-cover">
        {typeof media === "string" ? <source src={media} type="video/mp4" /> : isSourceObject(media) && Object.entries(media).map(([ext, src]) => <source key={ext} src={src} type={`video/${ext}`} />)}
      </video>
    );
  };

  return (
    <div ref={rootRef} className={["hsv-root", className].join(" ")} style={{ ...cssVars, ...style }}>
      <div className="hsv-container" ref={headlineRef}>
        <div className="hsv-headline">
          <h1 className="hsv-title">{title}</h1>
          {subtitle && <h2 className="hsv-subtitle">{subtitle}</h2>}
          {meta && <div className="hsv-meta">{meta}</div>}
        </div>
      </div>

      <div className="hsv-scroll" data-sticky-scroll style={{ height: `${scrollHeightVh}vh` }}>
        <div className={`hsv-sticky ${sticky ? "is-sticky" : ""}`}>
          <div className={`hsv-media ${orientation === "portrait" ? "portrait" : ""}`} ref={containerRef}>
            {renderMedia()}
            <div className="hsv-overlay" ref={overlayRef}>
              <div className="hsv-caption" ref={overlayCaptionRef}>{overlay?.caption}</div>
              <div className="hsv-overlay-content" ref={overlayContentRef}>
                <h3>{overlay?.heading}</h3>
                {overlay?.paragraphs?.map((p, i) => <p key={i}>{p}</p>)}
                {overlay?.extra}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hsv-root { --bg: #0b0c10; --text: #e5e7eb; --muted: #9ca3af; --overlay-bg: rgba(8,8,12,0.55); background: var(--bg); color: var(--text); overflow-x: clip; }
        .hsv-container { height: 100vh; display: grid; place-items: center; }
        .hsv-title { font-size: clamp(40px, 8vw, 96px); font-weight: 900; background: linear-gradient(90deg, #fff, #06b6d4); -webkit-background-clip: text; color: transparent; }
        .hsv-scroll { position: relative; }
        .hsv-sticky.is-sticky { position: sticky; top: 0; height: 100vh; display: grid; place-items: center; }
        .hsv-media { position: relative; width: var(--initial-size); height: var(--initial-size); border-radius: 20px; overflow: hidden; background: #000; margin: 0 auto; }
        .hsv-media.portrait { width: 56.25vh; height: 100vh; }
        .hsv-overlay { position: absolute; inset: 0; background: var(--overlay-bg); padding: 40px; clip-path: inset(100% 0 0 0); display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .hsv-overlay-content h3 { font-size: clamp(26px, 5vw, 50px); font-weight: 900; color: #fff; margin-bottom: 20px; }
      `}</style>
    </div>
  );
};

export default HeroScrollVideo;