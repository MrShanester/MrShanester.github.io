// Adds imports
import "./style.css";

import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { ObjectLoader } from "three";

import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

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

//creates geometry and material for a 20-sided die
const geometry = new THREE.BoxGeometry(10, 10, 10, 10);
const diceNormalTexture = new THREE.TextureLoader().load("img/metal_map.png");
const material = new THREE.MeshStandardMaterial({
  metalness: 1,
  // clearcoat: 1.0,
  color: 0x444444,
  normalMap: diceNormalTexture,
});
const dice = new THREE.Mesh(geometry, material);
dice.position.set(0, 20, 0);

scene.add(dice);

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
scene.add(plane);

//creates point light
const pointLight = new THREE.PointLight(0xfff2cc);
pointLight.position.set(20, 20, 20);

//adds light to scene
scene.add(pointLight);

// creates and adds wireframe to pinpoint location of pointlight
const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

// creates grid for orientation purposes
// const gridhelper = new THREE.GridHelper(200, 50);
// scene.add(gridhelper);

// Studio light
const lampLight = new OBJLoader();
lampLight.load("obj/lamp/studio_light.obj", function (object) {
  object.position.set(-50, 1, 0);
  // object.material.color.setHex(0xffffff);
  scene.add(object);
});

// camera orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

// animation recursive function
function animate() {
  requestAnimationFrame(animate);
  dice.rotation.x += 0.003;
  dice.rotation.y += 0.003;
  dice.rotation.z += 0.003;

  renderer.render(scene, camera);
}

animate();
