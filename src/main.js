import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const container = document.getElementById('model-container');
const scene = new THREE.Scene();
const background_img = document.getElementById('background-rinascita');
// scene.background = new THREE.Color(0x000000, 0);

const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setClearColor( 0x000000, 0 );
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// Свет
scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const dirLight = new THREE.DirectionalLight(0xffffff, 3);
dirLight.position.set(3,3,3);
scene.add(dirLight);

// Загрузка модели
const loader = new GLTFLoader();
loader.load('/models/ChokoladkaModel2.glb', (gltf) => {
    const model = gltf.scene;
    model.scale.set(0.5,0.5,0.5);
    scene.add(model);

    const targetDefaultRotationX = Math.PI / 2.5;

    model.rotation.x = targetDefaultRotationX;

    let targetRotationZLoop = -Math.PI / 6;
    let targetRotationX = model.rotation.x;
    let targetRotationY = model.rotation.y;
    const rotationSpeed = 0.05;

    model.rotation.z = targetRotationZLoop;

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', e => {
        mouseX = (e.clientX / window.innerWidth) - 0.5;
        mouseY= (e.clientY / window.innerHeight) - 0.5;
        targetRotationY = mouseX * 0.5;
        targetRotationX = targetDefaultRotationX + mouseY * 0.5;
    });

    function animate() {
        requestAnimationFrame(animate);
        model.rotation.x += (targetRotationX - model.rotation.x) * rotationSpeed;
        model.rotation.y += (targetRotationY - model.rotation.y) * rotationSpeed;
        model.rotation.z = Math.sin(targetRotationZLoop) / 2;

        background_img.style.paddingTop = (model.rotation.x * 100) + "px";
        background_img.style.paddingLeft = (model.rotation.y * 150) + "px";

        renderer.render(scene, camera);

        targetRotationZLoop += Math.PI / 777;
    }
    animate();
}, undefined, err => console.error(err));

// Адаптивность
window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});
