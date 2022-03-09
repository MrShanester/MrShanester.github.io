import "./style.css";

import * as THREE from "three";
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
const geometry = new THREE.IcosahedronGeometry(10, 1, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347, wireframe: false });
const dice = new THREE.Mesh(geometry, material);

//adds dice to scene
scene.add(dice);

//creates point light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);

//adds light to scene
scene.add(pointLight);

// creates and adds wireframe to pinpoint location of pointlight
const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

// animation recursive function
function animate() {
  requestAnimationFrame(animate);
  dice.rotation.x += 0.01;
  renderer.render(scene, camera);
}

animate();
