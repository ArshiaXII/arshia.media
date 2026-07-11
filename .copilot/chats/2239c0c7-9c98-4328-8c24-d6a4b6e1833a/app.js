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
