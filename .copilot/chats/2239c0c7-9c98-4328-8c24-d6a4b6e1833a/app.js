gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({ ignoreMobileResize: true });

const isMobile = window.matchMedia("(max-width: 1100px)").matches;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const lowPowerDevice =
  (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
  (navigator.deviceMemory && navigator.deviceMemory <= 4);
const heavyMotionEnabled = !reduceMotion && !lowPowerDevice;

const lenis = new Lenis({
  duration: isMobile ? 0.9 : 1.1,
  wheelMultiplier: isMobile ? 0.85 : 0.95,
  touchMultiplier: isMobile ? 0.9 : 1.05,
  smoothWheel: true
});

lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

if (heavyMotionEnabled) {
  gsap.to(".glow-cyan", {
    x: isMobile ? 48 : 110,
    y: isMobile ? 34 : 72,
    duration: isMobile ? 16 : 12,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  gsap.to(".glow-magenta", {
    x: isMobile ? -44 : -96,
    y: isMobile ? -28 : -58,
    duration: isMobile ? 18 : 13,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  gsap.to(".bg-grid", {
    xPercent: 2,
    yPercent: -2,
    duration: 20,
    repeat: -1,
    yoyo: true,
    ease: "none"
  });
}

const marqueeTrack = document.querySelector(".marquee-track");
if (marqueeTrack) {
  gsap.to(marqueeTrack, {
    xPercent: -50,
    ease: "none",
    duration: heavyMotionEnabled ? 18 : 26,
    repeat: -1
  });
}

gsap.utils.toArray(".scene").forEach((scene) => {
  const revealEls = scene.querySelectorAll(".reveal-up");
  if (!revealEls.length) return;

  gsap.set(revealEls, { yPercent: 120, opacity: 0 });
  gsap.to(revealEls, {
    yPercent: 0,
    opacity: 1,
    ease: "elastic.out(1, 0.7)",
    duration: 1.35,
    stagger: 0.08,
    scrollTrigger: {
      trigger: scene,
      start: "top 78%",
      once: true
    }
  });
});

const mm = gsap.matchMedia();
mm.add("(min-width: 1281px)", () => {
  if (!heavyMotionEnabled) return;
  const worksTrack = document.querySelector(".works-track");
  if (!worksTrack) return;

  gsap.to(worksTrack, {
    x: () => -Math.max(0, worksTrack.scrollWidth - window.innerWidth + window.innerWidth * 0.12),
    ease: "none",
    scrollTrigger: {
      trigger: ".works",
      pin: ".works-pin",
      start: "top top",
      end: () => `+=${worksTrack.scrollWidth}`,
      scrub: 1.1,
      invalidateOnRefresh: true
    }
  });
});

if (heavyMotionEnabled) {
  gsap.to(".hero-video", {
    scale: 1.08,
    yPercent: -8,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1.3
    }
  });
}

gsap.utils.toArray("[data-parallax]").forEach((el) => {
  if (!heavyMotionEnabled) return;
  const amount = parseFloat(el.getAttribute("data-parallax")) || 120;
  const responsiveAmount = isMobile ? amount * 0.35 : amount * 0.72;
  gsap.fromTo(
    el,
    { y: responsiveAmount * 0.2 },
    {
      y: -responsiveAmount,
      ease: "none",
      scrollTrigger: {
        trigger: el.closest(".scene"),
        start: "top bottom",
        end: "bottom top",
        scrub: 1.1
      }
    }
  );
});

gsap.from(".device-left", {
  xPercent: -120,
  yPercent: 65,
  rotate: -20,
  opacity: 0,
  duration: 1.4,
  ease: "elastic.out(1, 0.62)",
  scrollTrigger: {
    trigger: ".software-web",
    start: "top 70%"
  }
});

gsap.from(".device-right", {
  xPercent: 120,
  yPercent: -60,
  rotate: 16,
  opacity: 0,
  duration: 1.4,
  ease: "elastic.out(1, 0.62)",
  scrollTrigger: {
    trigger: ".software-web",
    start: "top 70%"
  }
});

gsap.utils.toArray(".mood-item").forEach((item, index) => {
  gsap.from(item, {
    opacity: 0,
    scale: 0.9,
    y: 80,
    rotate: (index % 2 === 0 ? -8 : 8) + index,
    ease: "back.out(1.8)",
    duration: 1.2,
    scrollTrigger: {
      trigger: ".social-media",
      start: "top 72%"
    }
  });

  if (!isMobile && heavyMotionEnabled) {
    gsap.to(item, {
      y: "+=18",
      duration: 2.2 + index * 0.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }
});

const manifestoWords = gsap.utils.toArray(".manifesto-word");
if (manifestoWords.length) {
  gsap.to(manifestoWords, {
    opacity: 1,
    color: "#f3f3f3",
    stagger: 0.09,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".manifesto",
      start: "top 65%",
      end: "bottom 45%",
      scrub: 0.8
    }
  });
}

gsap.from(".footer-cta", {
  yPercent: 35,
  opacity: 0,
  duration: 1.25,
  ease: "power4.out",
  scrollTrigger: {
    trigger: ".mega-footer",
    start: "top 85%"
  }
});

gsap.from(".contact-cloud > *", {
  y: 90,
  opacity: 0,
  duration: 1.1,
  stagger: 0.1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".mega-footer",
    start: "top 74%"
  }
});

function glitchReveal(targetSelector, startPos) {
  const el = document.querySelector(targetSelector);
  if (!el) return;

  gsap.set(el, { opacity: 0, clipPath: "inset(0 100% 0 0)" });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".seo-ai",
      start: startPos
    }
  });

  tl.to(el, {
    opacity: 1,
    clipPath: "inset(0 0% 0 0)",
    duration: 0.95,
    ease: "expo.out"
  }).to(
    el,
    {
      x: 4,
      duration: 0.06,
      repeat: 5,
      yoyo: true,
      ease: "steps(2)"
    },
    0.15
  );
}

glitchReveal(".seo-ai .glitch-line:first-of-type", "top 78%");
glitchReveal(".seo-ai .glitch-line.ai-focus", "top 60%");
