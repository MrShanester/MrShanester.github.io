// Adds imports
import "./style.css";

import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// adds scene and renderer
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// sets camera position
camera.position.setZ(30);

//adds scene and camera to the renderer
renderer.render(scene, camera);

//creates geometry and material for a 20-sided die
const geometry = new THREE.IcosahedronGeometry(10, 1, 120, 1000);
const diceNormalTexture = new THREE.TextureLoader().load("img/metal_map.png");
const material = new THREE.MeshStandardMaterial({ color: 0xff6347, wireframe: false, normalMap: diceNormalTexture });
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
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);

//adds light to scene
scene.add(pointLight);

// creates and adds wireframe to pinpoint location of pointlight
const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

// creates grid for orientation purposes
// const gridhelper = new THREE.GridHelper(200, 50);
// scene.add(gridhelper);

// camera orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

// animation recursive function
function animate() {
  requestAnimationFrame(animate);
  dice.rotation.x += 0.01;
  renderer.render(scene, camera);
}

animate();
