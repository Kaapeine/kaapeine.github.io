"use client";
import { useEffect } from "react";
import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

let camera, scene, renderer, controls;
let earth, sun;

function init() {
  scene = new THREE.Scene();

  let canvas = document.getElementById("myCanvas");

  if (!canvas) return;

  renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  // camera

  camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    100,
    100000
  );
  //   camera.position.set(15, 20, 30);
  camera.position.set(2500, 2500, 7000);
  scene.add(camera);
  camera.lookAt(scene.position);

  // controls

  controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 2500;
  controls.maxDistance = 10000;
  controls.maxPolarAngle = Math.PI / 2;

  // ambient light

  let ambientLight = new THREE.AmbientLight(0x666666);
  ambientLight.intensity = 100;
  scene.add(ambientLight);

  // point light

  const light = new THREE.PointLight(0xffff00, 0, 0, 0);
  camera.add(light);

  const loader = new GLTFLoader();
  //   loader.load(
  //     "/earth.glb",
  //     (gltf) => scene.add(gltf.scene),
  //     undefined,
  //     (error) => console.log(error)
  //   );

  const loadPlanets = async () => {
    sun = await loader.loadAsync("/sun.glb");

    earth = await loader.loadAsync("/earth.glb");
    scene.add(earth.scene);
    earth.scene.position.set(5000, 0, 0);
    scene.add(sun.scene);
  };

  loadPlanets();

  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  controls.update();
  requestAnimationFrame(animate);

  console.log(camera.position);

  render();
}

function render() {
  renderer.render(scene, camera);
}

const Canvas = () => {
  useEffect(() => {
    init();
    animate();
  }, []);
  return <canvas style={{ display: "block" }} id="myCanvas"></canvas>;
};

export default Canvas;
