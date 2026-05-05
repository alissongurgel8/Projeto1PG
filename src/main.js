import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './style.css'; // Certifique-se de ter o style.css para remover margens

// --- 1. CONFIGURAÇÃO DA CENA E RENDERIZADOR ---
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.querySelector('#app').appendChild(renderer.domElement);

// --- 2. CONFIGURAÇÃO DAS CÂMERAS ---

// Câmera 1: Perspectiva (Livre com mouse)
const camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera1.position.set(0, 2, 5);

// Câmera 2: Topo (Visão de cima)
const camera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera2.position.set(0, 7, 0);
camera2.lookAt(0, 0, 0);

// Controle de qual câmera está ativa
let activeCamera = camera1;

// OrbitControls (apenas para a câmera 1 ter interatividade com o mouse)
const controls = new OrbitControls(camera1, renderer.domElement);

// --- 3. CRIAÇÃO DO OBJETO (PLANETA VERMELHO) ---
// Usamos MeshStandardMaterial para ele reagir à luz
const geometry = new THREE.SphereGeometry(1.5, 64, 64);
const material = new THREE.MeshStandardMaterial({ color: 0xff0000 }); // Vermelho sólido
const planet = new THREE.Mesh(geometry, material);
scene.add(planet);

// --- 4. ILUMINAÇÃO (Necessária para ver a cor/forma) ---
const pointLight = new THREE.PointLight(0xffffff, 10);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// --- 5. INTERAÇÃO (TROCA DE CÂMERA) ---
window.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'c') {
        activeCamera = (activeCamera === camera1) ? camera2 : camera1;
        console.log("Câmera trocada!");
    }
});

// --- 6. REDIMENSIONAMENTO DA JANELA ---
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    renderer.setSize(width, height);
    
    camera1.aspect = width / height;
    camera1.updateProjectionMatrix();
    
    camera2.aspect = width / height;
    camera2.updateProjectionMatrix();
});

// --- 7. LOOP DE ANIMAÇÃO ---
function animate() {
    requestAnimationFrame(animate);

    // Movimento simples de rotação (Requisito atendido)
    planet.rotation.y += 1;

    // Renderiza a cena com a câmera ativa no momento
    renderer.render(scene, activeCamera);
}

animate();