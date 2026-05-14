// Terra.js
import * as THREE from 'three';
import imagemJupiter from './assets/jupiter.jpg';

export function criarJupiter() {
    // Mesma geometria de Jupiter
    const geometry = new THREE.SphereGeometry(46, 64, 64);
    
    // Cor azul para representar a jupiter
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff }); 
    const jupiter = new THREE.Mesh(geometry, material);
    
    const texturaLoader = new THREE.TextureLoader();
    const texturajupiter = texturaLoader.load(imagemJupiter);
    material.map = texturajupiter; // Aplica a textura
    
    //Joga a jupiter pro lado pra n fundir com jupiter, q é o 000
    // jupiter.position.x = 220; 

    return jupiter;
}