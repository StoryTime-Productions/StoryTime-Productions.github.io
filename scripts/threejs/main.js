import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Get the container div
const container = document.getElementById('three-container');

// Create the scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.01, 1000);

// Set the background color
scene.background = new THREE.Color('#1d141c'); // Replace with your desired hex code

// Create the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setAnimationLoop(animate);
container.appendChild(renderer.domElement);

camera.position.z = 4;

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth motion
controls.dampingFactor = 0.05;
controls.maxPolarAngle = Math.PI / 2; // Restrict vertical rotation
controls.minPolarAngle = Math.PI / 4; // Optional: Restrict vertical rotation to a range
controls.minDistance = 3.8; // Minimum distance from the target
controls.maxDistance = 6; // Maximum distance from the target
controls.enablePan = false;

// Create a group for the globe and stars
const globeGroup = new THREE.Group();
scene.add(globeGroup);

// Load the GLTF model
const loader = new GLTFLoader();
let globe; // Store the globe for rotation

loader.load(
  './scripts/threejs/scene.gltf',
  function (gltf) {
    globe = gltf.scene;
    globe.scale.set(2.5, 2.5, 2.5); // Adjust scale if needed
    globeGroup.add(globe); // Add the globe to the group
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Add stars
function addStars() {
  const starGeometry = new THREE.SphereGeometry(0.05, 24, 24);
  const starMaterial = new THREE.MeshBasicMaterial({ color: '#FFFFFF' });

  for (let i = 0; i < 200; i++) {
    const star = new THREE.Mesh(starGeometry, starMaterial);
    const [x, y, z] = Array(3)
      .fill()
      .map(() => THREE.MathUtils.randFloatSpread(50)); // Spread stars within a cube of 50 units
    star.position.set(x, y, z);
    globeGroup.add(star); // Add the star to the group
  }
}

addStars();

// Animation loop
function animate() {
  // Rotate the group (globe and stars together)
  globeGroup.rotation.y += 0.001; // Adjust the speed of rotation

  // Update controls
  controls.update();

  // Render the scene
  renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});
