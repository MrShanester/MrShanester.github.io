// ============ IMPORTS ============

import "./style.css";

import * as THREE from "./node_modules/three";

import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls";

import { GLTFLoader } from "./node_modules/three/examples/jsm/loaders/GLTFLoader";

import { OBJLoader } from "./node_modules/three/examples/jsm/loaders/OBJLoader";

import { TGALoader } from "./node_modules/three/examples/jsm/loaders/TGALoader";

// ============ SCENE, CAMERA, and RENDERER SETUP ============

// creates scene
const scene = new THREE.Scene();

// creates camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//creates renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
  antialias: true,
});

// sets render size and enables shadows
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMapType = THREE.PCFSoftShadowMap;

// sets camera position
camera.position.set(0, 30, 40);

// adds scene and camera to the renderer
renderer.render(scene, camera);

// camera orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

// ============ SHAPES AND PLANES ============

//creates geometry and material for sphere
// const geometry = new THREE.SphereGeometry(15, 32, 16);
// const sphereNormalTexture = new THREE.TextureLoader().load("./img/metal_map.png");
// const material = new THREE.MeshStandardMaterial({
//   metalness: 1,
//   // clearcoat: 1.0,
//   color: 0xffffff,
//   normalMap: sphereNormalTexture,
// });
// const sphere = new THREE.Mesh(geometry, material);
// sphere.position.set(0, 20, 0);
// sphere.castShadow = true;
// sphere.receiveShadow = true;
// scene.add(sphere);

// creates plane
const geometry2 = new THREE.PlaneGeometry(100, 100);
const planeNormalTexture = new THREE.TextureLoader().load("./img/floor_map.png");
const material2 = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
  // normalMap: planeNormalTexture,
});
const plane = new THREE.Mesh(geometry2, material2);
plane.rotation.x = Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);

// ============ LIGHTS ============

// creates point light
// const pointLight = new THREE.PointLight(0xffffff);
// pointLight.position.set(20, 40, 20);

// pointLight.castShadow = true;
// scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0x00ffff);
pointLight2.position.set(-20, 40, -20);
pointLight2.castShadow = true;
pointLight2.shadowMapWidth = 2048;
pointLight2.shadowMapHeight = 2048;
pointLight2.shadow.mapSize.width = 2048;
pointLight2.shadow.mapSize.height = 2048;
scene.add(pointLight2);

const pointLight3 = new THREE.PointLight(0xf1ae14);
pointLight3.position.set(20, 40, -20);
pointLight3.castShadow = true;
pointLight3.shadowMapWidth = 2048;
pointLight3.shadowMapHeight = 2048;
pointLight3.shadow.mapSize.width = 2048;
pointLight3.shadow.mapSize.height = 2048;
scene.add(pointLight3);

// creates and adds wireframe to pinpoint location of pointlight
// const lightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(lightHelper);

const lightHelper2 = new THREE.PointLightHelper(pointLight2);
scene.add(lightHelper2);

const lightHelper3 = new THREE.PointLightHelper(pointLight3);
scene.add(lightHelper3);

// ========== OBJ AND GLTF LOADERS ============

// skull gltf loader
var loader = new GLTFLoader();
loader.load("obj/sledge/scene.glb", function (gltf) {
  gltf.scene.scale.set(2, 2, 2);
  gltf.scene.position.set(0, 20, 0);
  gltf.scene.traverse(function (child) {
    child.castShadow = true;
    child.recieveShadow = true;
  });
  scene.add(gltf.scene);
  function animate() {
    requestAnimationFrame(animate);
    gltf.scene.rotation.x += 0.003;
    gltf.scene.rotation.y += 0.003;
    gltf.scene.rotation.z += 0.003;
    renderer.render(scene, camera);
  }

  animate();
});

// scaffold obj loader
const scaffoldLoader = new OBJLoader();
scaffoldLoader.load("./obj/scaffold/Scaffolding_Set.obj", function (object) {
  object.traverse(function (child) {
    child.castShadow = true;
    child.recieveShadow = true;
  });
  object.children[26].position.set(30, 0, 50);
  scene.add(object.children[26]);
});

// ============ ANIMATION CONTROLS ============

// animation recursive function
function animate() {
  requestAnimationFrame(animate);
  // sphere.rotation.x += 0.003;
  // sphere.rotation.y += 0.003;
  // sphere.rotation.z += 0.003;
  renderer.render(scene, camera);
}

animate();

console.log(scene);
