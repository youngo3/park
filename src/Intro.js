export default function intro() {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.defaults({
    toggleActions: "restart pause reverse pause",
  });
  gsap.to(".intro", {
    filter: `grayScale(0)`,
    scrollTrigger: {
      trigger: ".intro",
      end: "+=100%",
      pin: true,
      scrub: 1,
    },
  });
  gsap.to(".muhly", {
    y: "+=700",
    scrollTrigger: {
      trigger: ".intro",
      end: "+=100%",
      pin: true,
      scrub: 1,
    },
  });
  gsap.to(".cloud", {
    x: "+=700",
    scrollTrigger: {
      trigger: ".intro",
      end: "+=100%",
      pin: true,
      scrub: 1,
    },
  });
}
