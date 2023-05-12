import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Textures vanilla js
// const image = new Image();
// const texture = new THREE.Texture(image);

// image.onload = () => {
//   texture.needsUpdate = true;
// };

// image.src = "/textures/Door_Wood_001_basecolor.jpg";

// Texture Three js
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
  console.log("started");
};
loadingManager.onLoaded = () => {
  console.log("loaded");
};
loadingManager.onProgress = () => {
  console.log("progressed");
};
loadingManager.onError = () => {
  console.log("errored");
};

const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load("/texture/Door_Wood_001_basecolor.jpg");
const alphaTexture = textureLoader.load("/texture/Door_Wood_001_opacity.jpg");
const heightTexture = textureLoader.load("/texture/Door_Wood_001_height.png");
const normalTexture = textureLoader.load("/texture/Door_Wood_001_normal.jpg");
const ambientOcclusionTexture = textureLoader.load(
  "/texture/Door_Wood_001_ambientOcclusion.jpg"
);
const metalnessTexture = textureLoader.load(
  "/texture/Door_Wood_001_metallic.jpg"
);
const roughnessTexture = textureLoader.load(
  "/texture/Door_Wood_001_roughness.jpg"
);

// colorTexture.repeat.x = 2;
// colorTexture.repeat.y = 3;
// colorTexture.wrapS = THREE.RepeatWrapping;
// colorTexture.wrapT = THREE.RepeatWrapping;

// colorTexture.offset.x = 0.5;
// colorTexture.offset.y = 0.5;

colorTexture.rotation = Math.PI / 4;

colorTexture.center.x = 0.5;
colorTexture.center.y = 0.5;

colorTexture.minFilter = THREE.NearestFilter; // if we are using this, we can deactivate mipmaps
colorTexture.generateMipmaps = false;
colorTexture.magFilter = THREE.NearestFilter;

// Cursor
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
});

// Scene
const scene = new THREE.Scene();

// Cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ map: colorTexture });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Resize handler
window.addEventListener("resize", () => {
  // update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Fullscreen
window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// Camera
const camera = new THREE.PerspectiveCamera(
  75, // Field of view
  sizes.width / sizes.height, // Aspect of ratio
  0.1, // near
  100 // far
);

camera.position.z = 3;

scene.add(camera);

// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);
// pixel ratio for retina, but not for more than 2, because those are so expensive to rerender (which is not necessary)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// controls.target.y = 1;
// controls.update();

// Animations
const tick = () => {
  // Update Controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
