import * as THREE from "three";

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

// Red Cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(
  75, // Field of view
  sizes.width / sizes.height, // Aspect of ratio
  0.1, // near
  100 // far
);

// Orthographic Camera
// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   100
// );
camera.position.z = 3;
// camera.position.y = 2;

scene.add(camera);

// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);

// Clock
const clock = new THREE.Clock();

// Animations
const tick = () => {
  // Clock
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  // mesh.rotation.y = (elapsedTime * Math.PI) / 4;

  // Update camera
  camera.position.x = Math.sin(cursor.x * 2) * 3;
  camera.position.z = Math.cos(cursor.x * 2) * 3;
  camera.position.y = cursor.y * 5;

  camera.lookAt(mesh.position); // must add after camera update

  // Render
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
