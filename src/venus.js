// Terra.js
import * as THREE from 'three';
import imagemVenus from './assets/venus.jpg';

export function criarVenus() {
    // Mesma geometria de Venus
    const geometry = new THREE.SphereGeometry(4, 64, 64);
    
    // Cor azul para representar a venus
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff }); 
    const venus = new THREE.Mesh(geometry, material);
    
    const texturaLoader = new THREE.TextureLoader();
    const texturavenus = texturaLoader.load(imagemVenus);
    material.map = texturavenus; // Aplica a textura
    
    //Joga a venus pro lado pra n fundir com venus, q é o 000
    // venus.position.x = 70; 

    return venus;
}