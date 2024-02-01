"use client";
import { useEffect } from "react";
import {
  AmbientLight,
  AxesHelper,
  Box3,
  PerspectiveCamera,
  PointLight,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

let camera, scene, renderer, controls;
let earth, sun;

const EARTH_REV_SPEED = 1 / (365 * 24 * 60 * 60); // speed of earth's revolution, i.e. 1 year every 10 secs
const EARTH_ROT_SPEED = 0.1;
const DAY = EARTH_REV_SPEED * 365;
const SCALE = 100000;

const AU = 10000; // 150,000,000 km = 10,000 units, i.e. 1km = 0.00006666666 units, Earth radius = 0.4 units

// y is up
const system = {
  sun: {
    name: "Sun",
    startPosition: {
      x: 0,
      y: 0,
      z: 0,
    },
    scale: 2,
    rotSpeed: 0,
    revSpeed: 0,
    file: "/sun.glb",
  },
  mercuy: {
    name: "Mercury",
    startPosition: {
      x: AU,
      y: 0,
      z: 0,
    },
    scale: 0.39,
    radius: 0.39 * AU,
    rotSpeed: EARTH_ROT_SPEED / 59,
    revSpeed: -4.14 * EARTH_REV_SPEED * SCALE,
    file: "/mercury.glb",
  },
  venus: {
    name: "Venus",
    startPosition: {
      x: AU,
      y: 0,
      z: 0,
    },
    scale: 0.95,
    radius: 0.72 * AU,
    rotSpeed: EARTH_ROT_SPEED / 200,
    revSpeed: -1.62 * EARTH_REV_SPEED * SCALE,
    file: "/mars.glb",
  },
  earth: {
    name: "Earth",
    startPosition: {
      x: AU,
      y: 0,
      z: 0,
    },
    scale: 1,
    radius: AU,
    rotSpeed: 0.01,
    revSpeed: -EARTH_REV_SPEED * SCALE,
    file: "/earth.glb",
  },
};

function init() {
  scene = new Scene();

  let canvas = document.getElementById("myCanvas");

  if (!canvas) return;

  renderer = new WebGLRenderer({ antialias: true, canvas: canvas });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  // camera

  camera = new PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    100,
    100000
  );
  camera.position.set(0, 15000, 0);
  scene.add(camera);
  camera.lookAt(scene.position);

  // controls

  controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 2500;
  controls.maxDistance = 50000;
  controls.maxPolarAngle = Math.PI / 2;

  // ambient light

  let ambientLight = new AmbientLight(0x666666);
  ambientLight.intensity = 100;
  scene.add(ambientLight);

  // point light

  const light = new PointLight(0xffff00, 0, 0, 0);
  camera.add(light);

  scene.add(new AxesHelper(20000));

  const loader = new GLTFLoader();

  const loadPlanets = async () => {
    Promise.all(
      Object.values(system).map(async (planet) => {
        planet.scene = await loader
          .loadAsync(planet.file)
          .then((obj) => obj.scene);
        planet.scene.name = planet.name;
        planet.scene.scale.set(planet.scale, planet.scale, planet.scale);
        planet.scene.position.set(
          planet.startPosition.x,
          planet.startPosition.y,
          planet.startPosition.z
        );

        let boundingBox = new Box3().setFromObject(planet.scene);
        const t = new Vector3();
        let size = boundingBox.getSize(t);
        console.log(planet.name, size);

        scene.add(planet.scene);
      })
    );

    animate();
  };

  loadPlanets();
  console.log(scene);

  camera.updateMatrixWorld();
  let vec = camera.position.clone();
  vec.applyMatrix4(camera.matrixWorld);
  console.log("Cam", vec);

  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

let w = -1 / 20; // 1 rotation every n seconds

function animate() {
  controls.update();
  const numFrames = requestAnimationFrame(animate);

  Object.values(system).map((planet) => {
    if (planet.radius && planet.scene) {
      let theta = (planet.revSpeed * numFrames) / 60;
      planet.scene.position.x = planet.radius * Math.cos(theta);
      planet.scene.position.z = planet.radius * Math.sin(theta);

      planet.scene.rotation.y += planet.rotSpeed;
    }
  });

  render();
}

function render() {
  renderer.render(scene, camera);
}

const Canvas = () => {
  useEffect(() => {
    init();
  }, []);
  return <canvas style={{ display: "block" }} id="myCanvas"></canvas>;
};

export default Canvas;
