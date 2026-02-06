import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const model_container = document.getElementById("model-container");

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(model_container.clientWidth, model_container.clientHeight);
renderer.setClearColor(0x1D1B1B);
// renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);

model_container.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(20, model_container.clientWidth / model_container.clientHeight, 1, 1000);
camera.position.set(2, 2, 4);
camera.lookAt(0, 1, 1);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.maxDistance = 1.3;
controls.enablePan = false;
controls.enableZoom = false;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate = true;
controls.target = new THREE.Vector3(0, 1, 0);

const ground_geometry = new THREE.PlaneGeometry(20, 20, 32, 32);
ground_geometry.rotateX(-Math.PI / 2);
const ground_material = new THREE.MeshStandardMaterial({
    color: 0x005055,
    side: THREE.DoubleSide
});
const ground_mesh = new THREE.Mesh(ground_geometry, ground_material);
// scene.add(ground_mesh);

const spotlight = new THREE.SpotLight(0xffffff, 3000, 100, 0.2, 0.5);
spotlight.position.set(0, 25, 5);
scene.add(spotlight);

const spotlight2 = new THREE.SpotLight(0xffffff, 3000, 100, 0.2, 0.5);
spotlight2.position.set(0, 25, -5);
scene.add(spotlight2);

const spotlight3 = new THREE.SpotLight(0xffffff, 3000, 100, 0.2, 0.5);
spotlight3.position.set(5, -25, 0);
scene.add(spotlight3);

const spotlight4 = new THREE.SpotLight(0xffffff, 3000, 100, 0.2, 0.5);
spotlight4.position.set(-5, -25, 0);
scene.add(spotlight4);

const loader = new GLTFLoader().setPath('assets/backpack/');
loader.load('backpack.gltf', (gltf) => {
    const mesh = gltf.scene;
    // mesh.position.set(0, 1.05, -1);
    mesh.position.set(0, 1, 0);
    scene.add(mesh);
})

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
}

animate();

window.addEventListener('resize', () => {
  const width = model_container.clientWidth;
  const height = model_container.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
});