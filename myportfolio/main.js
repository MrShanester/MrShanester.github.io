// Adds imports
import "./style.css";

import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// adds scene and renderer
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// sets camera position
camera.position.set(0, 30, 40);

//adds scene and camera to the renderer
renderer.render(scene, camera);
renderer.shadowMap.enabled = true;

// //creates geometry and material for a 20-sided die
// const geometry = new THREE.BoxGeometry(10, 10, 10, 10);
// const diceNormalTexture = new THREE.TextureLoader().load("img/metal_map.png");
// const material = new THREE.MeshStandardMaterial({
//   metalness: 1,
//   // clearcoat: 1.0,
//   color: 0xcc0000,
//   normalMap: diceNormalTexture,
// });
// const dice = new THREE.Mesh(geometry, material);
// dice.position.set(0, 20, 0);
// dice.castShadow = true;
// scene.add(dice);

// creates plane
const geometry2 = new THREE.PlaneGeometry(100, 100);
const planeNormalTexture = new THREE.TextureLoader().load("img/floor_map.png");
const material2 = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
  normalMap: planeNormalTexture,
});
const plane = new THREE.Mesh(geometry2, material2);
plane.rotation.x = Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);

//creates point light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 40, 20);

pointLight.castShadow = true;
scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0x00ffff);
pointLight2.position.set(0, 30, 0);

pointLight2.castShadow = true;
scene.add(pointLight2);

// creates and adds wireframe to pinpoint location of pointlight
const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

const lightHelper2 = new THREE.PointLightHelper(pointLight2);
scene.add(lightHelper2);

// camera orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

// SKULLS FOR THE SKULL THRONE!!!
var loader = new GLTFLoader();
loader.castShadow = true;
loader.load("obj/skull/scene.gltf", function (gltf) {
  gltf.scene.scale.set(7, 7, 7);
  gltf.scene.position.set(0, 20, 0);
  gltf.castShadow = true;
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

// animation recursive function
// function animate() {
//   requestAnimationFrame(animate);

//   renderer.render(scene, camera);
// }

// animate();
