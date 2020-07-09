gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  toggleActions: "restart pause reverse pause",
});

let tl = gsap.timeline(".intro", {
  scrollTrigger: {
    trigger: ".intro",
    scrub: true,
    pin: true,
    pinSpacing: false,
    start: "top 100px",
    end: "+=100%",
    markers: {
      startColor: "white",
      endColor: "red",
      fontSize: "16px",
      fontWeight: "bold",
    },
  },
});
tl.to(".muhly", {
  //   y: "-=50vh",
  //   transformOrigin: "right bottom",
});
tl.from(".cloud", {});

// ScrollTrigger.create({
//     trigger: '.chart',
//     start: 'center center',
//     end: 'bottom top',
//     toggleClass: '.visible', //this toggles the specified CSS class on the trigger element
//     onEnter: drawPoints //this fires the drawPoints function when the trigger enters the scroller from above
//   })
