// Terra.js
import * as THREE from 'three';
import imagemMarte from './assets/marte.jpg';

export function criarMarte() {
    // Mesma geometria de Marte
    const geometry = new THREE.SphereGeometry(4, 64, 64);
    
    // Cor azul para representar a marte
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff }); 
    const marte = new THREE.Mesh(geometry, material);
    
    const texturaLoader = new THREE.TextureLoader();
    const texturamarte = texturaLoader.load(imagemMarte);
    material.map = texturamarte; // Aplica a textura
    
    //Joga a marte pro lado pra n fundir com marte, q é o 000
    // marte.position.x = 116; 

    return marte;
}