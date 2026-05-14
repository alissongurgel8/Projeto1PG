// Terra.js
import * as THREE from 'three';
import imagemTerra from './assets/terra.jpg';

export function criarTerra() {

    const relogioTerra = new THREE.Clock();
    
    
    const geometry = new THREE.SphereGeometry(4.2 , 64, 64);
    
    // Cor azul para representar a Terra
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff }); 
    const terra = new THREE.Mesh(geometry, material);
    
    const texturaLoader = new THREE.TextureLoader();
    const texturaTerra = texturaLoader.load(imagemTerra);
    material.map = texturaTerra; // Aplica a textura
    
    //Joga a terra pro lado pra n fundir com marte, q é o 000
    // terra.position.x = 90; 



    return terra;
}