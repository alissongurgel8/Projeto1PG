// Terra.js
import * as THREE from 'three';
import imagemUrano from './assets/urano.jpg';

export function criarUrano() {
    // Mesma geometria de Urano
    const geometry = new THREE.SphereGeometry(16, 64, 64);
    
    // Cor azul para representar a urano
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff }); 
    const urano = new THREE.Mesh(geometry, material);
    
    const texturaLoader = new THREE.TextureLoader();
    const texturaurano = texturaLoader.load(imagemUrano);
    material.map = texturaurano; // Aplica a textura
    
    //Joga a urano pro lado pra n fundir com urano, q é o 000
    // urano.position.x = 520; 

    return urano;
}