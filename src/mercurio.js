// Terra.js
import * as THREE from 'three';
import imagemMercurio from './assets/mercurio.jpg';

export function criarMercurio() {
    // Mesma geometria de Mercurio
    const geometry = new THREE.SphereGeometry(1.6, 64, 64);
    
    // Cor azul para representar a mercurio
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff }); 
    const mercurio = new THREE.Mesh(geometry, material);
    
    const texturaLoader = new THREE.TextureLoader();
    const texturamercurio = texturaLoader.load(imagemMercurio);
    material.map = texturamercurio; // Aplica a textura
    
    //Joga a mercurio pro lado pra n fundir com mercurio, q é o 000
    // mercurio.position.x = 54; 

    return mercurio;
}