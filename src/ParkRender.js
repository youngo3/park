import * as THREE from "https://unpkg.com/three@0.118.3/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three@0.118.3/examples/jsm/loaders/GLTFLoader.js";

export default function parkRender() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    100,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 50, 0);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.setClearColor(new THREE.Color(0xfefefe));
  renderer.setSize(window.innerWidth * 0.8, window.innerHeight);
  const canvas = renderer.domElement;
  document.querySelector(".park-model").appendChild(canvas);
  const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
  scene.add(light);
  const loader = new GLTFLoader();
  loader.load(
    "src/assets/modeling.glb",
    function (gltf) {
      scene.add(gltf.scene);
      setUpAnimation(gltf.scene);
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    function (error) {
      console.error(error);
    }
  );
  render();
  function render() {
    if (resize(renderer)) {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  function resize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }
  function setUpAnimation(model) {
    let tl = new gsap.timeline({
      scrollTrigger: {
        trigger: ".park-model",
        end: "+=7000",
        pin: true,
        scrub: 1,
      },
    });

    //x left and right, y up and down, z lower, closed to hill
    tl.to(camera.position, { x: 0, y: 30, z: 30 })
      .to(model.rotation, { x: -0.5, y: 0, z: 0 })
      .to("canvas", { scale: 0.7, left: "70%" })
      .from(".tree-zone", { x: -innerWidth * 1 })
      .to(camera.position, { x: 0, y: 30, z: 20 })
      .to(".tree-zone", { x: -innerWidth * 1 })
      .from(".pond-of-love", { x: -innerWidth * 1 })
      .to(camera.position, { x: 2, y: 20, z: 0 })
      .to(".pond-of-love", { x: -innerWidth * 1 })
      .from(".muhly-zone", { x: -innerWidth * 1 })
      .to(camera.position, { x: 2, y: 5, z: -25 })
      .to(".muhly-zone", { x: -innerWidth * 1 })
      .from(".tree-on-the-hill", { x: -innerWidth * 1 })
      .to(camera.position, { x: 2, y: 10, z: -25 })
      .to("canvas", { scale: 1 });

    // model.position.z = -10;
  }
}
