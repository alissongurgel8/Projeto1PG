import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './style.css'; 
import { criarTerra } from './Terra.js';
import { criarSol } from './sun.js';
import { criarMarte } from './marte.js';
import { criarJupiter } from './jupiter.js';
import { criarMercurio } from './mercurio.js';
import { criarVenus } from './venus.js';
import { criarSaturno } from './saturno.js';
import { criarUrano } from './urano.js';
import { criarNeturno } from './neturno.js';

// CONFIGURAÇÃO DA CENA E RENDERIZADOR ---
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.querySelector('#app').appendChild(renderer.domElement);






// Câmera 1: Perspectiva (Livre com mouse)
const camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera1.position.set(-80, 30, 200);

// Câmera 2: Topo (Visão de cima)
const camera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera2.position.set(0,0,250);
camera2.lookAt(0, 0, 0);

const camera3 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera3.position.set(0, 550, 0);
camera3.lookAt(0, 0, 0);

// Controle de qual câmera está ativa
let activeCamera = camera1;

// OrbitControls (apenas para a câmera 1 ter interatividade com o mouse)
const controls = new OrbitControls(camera1, renderer.domElement);

// --- teste: CRIAÇÃO DO OBJETO (PLANETA VERMELHO ) dentro do sol ---
const geometry = new THREE.SphereGeometry(5, 64, 64);
const material = new THREE.MeshStandardMaterial({ color: 0xff0000 }); // Vermelho sólido MeshStandardMaterial para ele reagir à luz
const planet = new THREE.Mesh(geometry, material);
planet.position.set(0, 0, 0);
scene.add(planet);


const planetasAnimados = [];


function registrarPlaneta(planeta, distancia, velocidadeOrbita, velocidadeRotacao) {
    scene.add(planeta);
    const linha = criarLinhaOrbita(distancia);
    scene.add(linha);

    planetasAnimados.push({
        planeta: planeta,
        distancia: distancia,
        velocidadeOrbita: velocidadeOrbita,
        velocidadeRotacao: velocidadeRotacao,
        
        // Inicia em um ângulo aleatório para os planetas não ficarem todos em fila
        angulo: Math.random() * Math.PI * 2 
    });
}


function criarLinhaOrbita(distancia) {
    // Cria uma curva circular (ellipse com raios iguais)
    const curva = new THREE.EllipseCurve(
        0,  0,            // Centro x, y
        distancia, distancia, // Raio X, Raio Y
        0,  2 * Math.PI,  // Ângulo inicial e final
        false,            // Sentido horário
        0                 // Rotação da curva
    );

    
    const pontos = curva.getPoints(128);
    const geometria = new THREE.BufferGeometry().setFromPoints(pontos);

    // Material da linha branca
    const material = new THREE.LineBasicMaterial({ 
        color: 0xffffff, 
        transparent: true, 
        opacity: 0.3 
    });

    const linhaOrbita = new THREE.Line(geometria, material);

    // Como a curva é criada no plano XY (em pé), precisamos deitá-la no plano XZ
    linhaOrbita.rotation.x = Math.PI / 2;

    return linhaOrbita;
}


function criarEstrelas() {
    const quantidadeEstrelas = 30000;
    
    // BufferGeometry é super otimizado para lidar com milhares de pontos
    const geometriaEstrelas = new THREE.BufferGeometry();
    const posicoes = new Float32Array(quantidadeEstrelas * 3); // x, y, z para cada estrela

    // Espalha as estrelas aleatoriamente num cubo gigante
    for (let i = 0; i < quantidadeEstrelas * 3; i++) {
        // Gera posições entre -1000 e 1000
        posicoes[i] = (Math.random() - 0.5) * 2000; 
    }

    geometriaEstrelas.setAttribute('position', new THREE.BufferAttribute(posicoes, 3));

    const materialEstrelas = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 1.5, 
        transparent: true,
        opacity: 0.8
    });

    const estrelas = new THREE.Points(geometriaEstrelas, materialEstrelas);
    scene.add(estrelas);
}




const planetaMercurio = criarMercurio();
registrarPlaneta(planetaMercurio, 54, 0.02, 0.01);

const planetaVenus = criarVenus();
registrarPlaneta(planetaVenus, 70, 0.015, 0.008);


const planetaTerra = criarTerra();
registrarPlaneta(planetaTerra, 90, 0.01, 0.005);

const planetaMarte = criarMarte();
registrarPlaneta(planetaMarte, 116, 0.008, 0.004);

const planetaJupiter = criarJupiter();
registrarPlaneta(planetaJupiter, 220, 0.005, 0.002);

const planetaSaturno = criarSaturno();
registrarPlaneta(planetaSaturno, 350, 0.003, 0.001);

const planetaUrano = criarUrano();
registrarPlaneta(planetaUrano, 520, 0.002, 0.0005);

const planetaNeturno = criarNeturno();
registrarPlaneta(planetaNeturno, 700, 0.001, 0.0002);
//Sol
const atualizarSol = criarSol(scene);   


// --- ILUMINAÇÃO (Necessária para ver a cor/forma) ---
const pointLight = new THREE.PointLight(0xffffff, 10);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// --- INTERAÇÃO (TROCA DE CÂMERA) ---
window.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'c') {
        activeCamera = (activeCamera === camera1) ? camera2 : (activeCamera === camera2) ? camera3 : camera1;
        console.log("Câmera trocada!");
    }
});

// --- REDIMENSIONAMENTO DA JANELA ---
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    renderer.setSize(width, height);
    
    camera1.aspect = width / height;
    camera1.updateProjectionMatrix();
    
    camera2.aspect = width / height;
    camera2.updateProjectionMatrix();
});

// --- LOOP DE ANIMAÇÃO ---
function animate() {
    requestAnimationFrame(animate);

    // Movimento simples de rotação (
    planet.rotation.y += 1;

    atualizarSol();
    

    planetasAnimados.forEach((dados) => {
        // A. Rotação no próprio eixo
        dados.planeta.rotation.y += dados.velocidadeRotacao;

        // B. Órbita ao redor do Sol usando Trigonometria
        dados.angulo += dados.velocidadeOrbita;
        
        // Math.cos para o eixo X e Math.sin para o eixo Z cria um círculo perfeito
        dados.planeta.position.x = Math.cos(dados.angulo) * dados.distancia;
        dados.planeta.position.z = Math.sin(dados.angulo) * dados.distancia;
    });


    // Renderiza a cena com a câmera ativa no momento
    renderer.render(scene, activeCamera);
}

animate();
criarEstrelas();