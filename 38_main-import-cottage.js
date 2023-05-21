import "./style.css";
import * as dat from "dat.gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

/**
 * Base
 */
// Debug
const gui = new dat.GUI({
  width: 400,
});

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader();

// Draco loader
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("draco/");

// GLTF loader
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

/**
 * Textures
 */
const blinn2Texture = textureLoader.load(
  "/models/cottage/textures/blinn2_baseColor.png"
);
blinn2Texture.flipY = false;
blinn2Texture.colorSpace = THREE.SRGBColorSpace;

const blinn3Texture = textureLoader.load(
  "/models/cottage/textures/blinn3_baseColor.png"
);
blinn3Texture.flipY = false;
blinn3Texture.colorSpace = THREE.SRGBColorSpace;

const blinn4Texture = textureLoader.load(
  "/models/cottage/textures/blinn4_baseColor.png"
);
blinn4Texture.flipY = false;
blinn4Texture.colorSpace = THREE.SRGBColorSpace;

/**
 * Baked Materials
 */
const blinn2Material = new THREE.MeshBasicMaterial({ map: blinn2Texture });

/**
 * Model
 */

let blinn2Mesh;
let blinn3Mesh;
let blinn4Mesh;

gltfLoader.load("/models/cottage/scene.gltf", (gltf) => {
  gltf.scene.traverse((child) => {
    if (child.name === "polySurface55_blinn2_0") {
      blinn2Mesh = child;
    }
    if (child.name === "polySurface55_blinn3_0") {
      blinn3Mesh = child;
    }
    if (child.name === "polySurface55_blinn4_0") {
      blinn4Mesh = child;
    }

    console.log(child);
  });

  console.log(blinn2Mesh);
  console.log(blinn3Mesh);
  console.log(blinn4Mesh);

  scene.add(gltf.scene);
});

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 4;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
