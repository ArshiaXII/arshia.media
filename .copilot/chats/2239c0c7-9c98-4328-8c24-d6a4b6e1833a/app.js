gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.15,
  wheelMultiplier: 0.95,
  touchMultiplier: 1.1,
  smoothWheel: true
});

lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion) {
  gsap.to(".orb-a", {
    x: 110,
    y: 65,
    duration: 11,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  gsap.to(".orb-b", {
    x: -120,
    y: 90,
    duration: 14,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  gsap.to(".orb-c", {
    x: 70,
    y: -95,
    duration: 12.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  gsap.to(".bg-grain", {
    x: 40,
    y: -32,
    duration: 1.1,
    repeat: -1,
    yoyo: true,
    ease: "steps(2)"
  });

  gsap.to(".bg-fx", {
    filter: "hue-rotate(18deg)",
    scrollTrigger: {
      trigger: "main",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.7
    }
  });
}

const marqueeTrack = document.querySelector(".marquee-track");
if (marqueeTrack) {
  gsap.to(marqueeTrack, {
    xPercent: -50,
    ease: "none",
    duration: 18,
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
mm.add("(min-width: 901px)", () => {
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

gsap.utils.toArray("[data-parallax]").forEach((el) => {
  const amount = parseFloat(el.getAttribute("data-parallax")) || 120;
  gsap.fromTo(
    el,
    { y: amount * 0.2 },
    {
      y: -amount,
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

  gsap.to(item, {
    y: "+=18",
    duration: 2.2 + index * 0.4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
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
