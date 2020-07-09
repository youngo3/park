gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  toggleActions: "restart pause reverse pause",
});

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".intro",
    end: "+=100%",
    pin: true,
    scrub: 1,
    mark: true,
  },
});
tl.to(".intro", {
  filter: `grayScale(0)`,
  // onComplete: () => console.log(window.innerHeight),
});
tl.to(".muhly", {
  y: "+=700",
});
tl.to(".cloud", {
  x: "+=700",
});

gsap.to(".park-model img", {
  scrollTrigger: {
    trigger: ".park-model",
    start: "top",
    pin: true,
    scrub: 1,
    markers: {
      startColor: "white",
      endColor: "green",
    },
  },
  rotate: 30,
});
