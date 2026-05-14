// Terra.js
import * as THREE from 'three';
import imagemNeturno from './assets/neturno.jpg';

export function criarNeturno() {
    // Mesma geometria de Neturno
    const geometry = new THREE.SphereGeometry(16, 64, 64);
    
    // Cor azul para representar a neturno
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff }); 
    const neturno = new THREE.Mesh(geometry, material);
    
    const texturaLoader = new THREE.TextureLoader();
    const texturaneturno = texturaLoader.load(imagemNeturno);
    material.map = texturaneturno; // Aplica a textura
    
    //Joga a neturno pro lado pra n fundir com neturno, q é o 000
    // neturno.position.x = 700; 

    return neturno;
}