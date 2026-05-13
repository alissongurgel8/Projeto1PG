import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './style.css'; 

// --- 1. CONFIGURAÇÃO DA CENA E RENDERIZADOR ---
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.querySelector('#app').appendChild(renderer.domElement);

// --- 2. CONFIGURAÇÃO DAS CÂMERAS ---
// Câmera 1: Perspectiva (Livre com mouse)
const camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera1.position.set(0, 4, 16); 
// Câmera 2: Topo (Visão de cima)
const camera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera2.position.set(0, 15, 0); 
camera2.lookAt(0, 0, 0);
// Controle de qual câmera está ativa
let activeCamera = camera1;
// OrbitControls (apenas para a câmera 1 ter interatividade com o mouse)
const controls = new OrbitControls(camera1, renderer.domElement);

// ==========================================
// --- CÓDIGO DO SOL (SHADER CUSTOMIZADO) ---
// ==========================================
const relogioSol = new THREE.Clock();

const ruidoGLSL = `
  float hash(vec3 p) {
      p = fract(p * 0.32 + 0.1);
      p *= 17.0;
      return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float noise(vec3 x) {
      vec3 i = floor(x);
      vec3 f = fract(x);
      f = f * f * (3.0 - 2.0 * f);
      return mix(mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
                     mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
                 mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                     mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
  }
`;

// Vertex Shader: Controla a malha (formato)
const vertexShaderSol = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;

  // Injetando a função de ruído aqui dentro
  ${ruidoGLSL}

  void main() {
    vUv = uv;
    vPosition = position;
    
    // Usa o ruído 3D para criar um pulso totalmente orgânico e caótico
    float pulso = noise(position * 1.5 + uTime * 0.8) * 0.2;
    vec3 novaPosicao = position + normal * pulso;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(novaPosicao, 1.0);
  }
`;

// Fragment Shader: Controla as cores (plasma)
const fragmentShaderSol = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;

  // Injetando a função de ruído aqui dentro
  ${ruidoGLSL}

  void main() {
    // Camada 1: Manchas grandes e lentas
    float n1 = noise(vPosition * 2.0 + uTime);
    // Camada 2: Manchas pequenas e rápidas (a fervura)
    float n2 = noise(vPosition * 6.0 - uTime * 1.5);
    
    // Mistura as duas camadas
    float mistura = (n1 + n2 * 0.5) / 1.5;
    
    // Cores
    vec3 corVermelha = vec3(0.5, 0.0, 0.0);
    vec3 corLaranja = vec3(1.0, 0.4, 0.0);
    vec3 corAmarela = vec3(1.0, 0.9, 0.2);
    
    vec3 corFinal;
    
    // Transição orgânica baseada no ruído
    if (mistura < 0.5) {
        corFinal = mix(corVermelha, corLaranja, mistura * 2.0);
    } else {
        corFinal = mix(corLaranja, corAmarela, (mistura - 0.5) * 2.0);
    }
    
    gl_FragColor = vec4(corFinal, 1.0);
  }
`;

const materialSol = new THREE.ShaderMaterial({
  vertexShader: vertexShaderSol,
  fragmentShader: fragmentShaderSol,
  uniforms: {
    uTime: { value: 0.0 }
  }
});

// Aumente os segmentos para 128 para o ruído dobrar a malha suavemente
const geometriaSol = new THREE.SphereGeometry(2.5, 128, 128); 
const sol = new THREE.Mesh(geometriaSol, materialSol);
sol.position.set(0, 0, 0); 
scene.add(sol);

// --- 3. CRIAÇÃO DO OBJETO (PLANETA VERMELHO) ---
// Usamos MeshStandardMaterial para ele reagir à luz
const geometry = new THREE.SphereGeometry(1.0, 64, 64); // Diminuí um pouco o planeta
const material = new THREE.MeshStandardMaterial({ color: 0xff0000 }); 
const planet = new THREE.Mesh(geometry, material);
planet.position.set(10, 0, 0); // Movi o planeta para o lado, para não ficar dentro do Sol
scene.add(planet);

// --- 5. ILUMINAÇÃO ---
const pointLight = new THREE.PointLight(0xffffff, 10);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// --- 6. INTERAÇÃO (TROCA DE CÂMERA) ---
window.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'c') {
        activeCamera = (activeCamera === camera1) ? camera2 : camera1;
        console.log("Câmera trocada!");
    }
});

// --- 7. REDIMENSIONAMENTO DA JANELA ---
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    renderer.setSize(width, height);
    
    camera1.aspect = width / height;
    camera1.updateProjectionMatrix();
    
    camera2.aspect = width / height;
    camera2.updateProjectionMatrix();
});

// --- 8. LOOP DE ANIMAÇÃO ---
function animate() {
    requestAnimationFrame(animate);

    // Animação do Planeta Vermelho (Movimento simples de rotação)
    planet.rotation.y += 0.01; // Mudei de 1 para 0.01 para não girar rápido demais

    // Animação do Sol (Shader + Rotação)
    if (materialSol) {
      materialSol.uniforms.uTime.value = relogioSol.getElapsedTime();
    }
    if (sol) {
      sol.rotation.y += 0.005;
    }

    // Renderiza a cena com a câmera ativa no momento
    renderer.render(scene, activeCamera);
}

animate();