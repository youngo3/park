import * as THREE from "https://unpkg.com/three@0.118.3/build/three.module.js";
// import { FBXLoader } from "https://unpkg.com/three@0.118.3/examples/jsm/loaders/FBXLoader.js";
import { OBJLoader } from "https://unpkg.com/three@0.118.3/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "https://unpkg.com/three@0.118.3/examples/jsm/loaders/MTLLoader.js";
export default function parkRender() {
  class Scene {
    constructor(model) {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
      });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setClearColor(new THREE.Color(0xfefefe));
      //
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.renderer.setPixelRatio(window.devicePixelRatio);
      //
      document
        .querySelector(".park-model")
        .appendChild(this.renderer.domElement);
      //scene
      this.scene = new THREE.Scene();
      this.scene.add(model);
      //camera
      this.camera = new THREE.PerspectiveCamera(
        100,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      this.camera.position.set(0, 10, 10);
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));
      //helper
      this.gridHelper = new THREE.GridHelper(4, 4);
      this.scene.add(this.gridHelper);
      this.cameraHelper = new THREE.CameraHelper(this.camera);
      this.scene.add(this.cameraHelper);
      this.axesHelper = new THREE.AxesHelper(5);
      this.scene.add(this.axesHelper); //The X axis is red. The Y axis is green. The Z axis is blue.
      //light
      this.spotLight = new THREE.SpotLight(0xffffff);
      this.spotLight.position.set(10, 10, 10);
      this.scene.add(this.spotLight);
    }
    render = () => {
      // this.renderer.setViewport(0, 0, this.width, this.height);
      // .setViewport ( x : Integer, y : Integer, width : Integer, height : Integer ) : null
      // this.camera.aspect = this.width / this.height;
      this.renderer.render(this.scene, this.camera);
    };
  }
  function loadModel() {
    gsap.registerPlugin(ScrollTrigger);
    const mtlLoader = new MTLLoader();
    // mtlLoader.setPath("./");
    mtlLoader.load("modeling.mtl", function (materials) {
      materials.preload();
      const objLoader = new OBJLoader();
      objLoader.load(
        "modeling.obj",
        function (object) {
          object.scale.set(1, 1, 1);
          // object.position.set(-60, 0, 30);
          // object.rotation.set(0, 0, 0);
          setUpAnimation(object);
        }
        // onProgress,
        // onError
      );
    });
  }

  function setUpAnimation(model) {
    let scene = new Scene(model);
    scene.render();
    let tl = new gsap.timeline({
      onUpdate: scene.render,
      scrollTrigger: {
        trigger: ".park-model",
        start: "top 100vh",
        end: "bottom top",
        pin: true,
        scrub: 0.1,
        markers: {
          startColor: "black",
          endColor: "green",
        },
      },
    });
    tl.to(model.rotation, { x: 1, y: 1, z: -1 }, "+=1");
  }
  loadModel();
}
