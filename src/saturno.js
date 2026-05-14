// Saturno.js
import * as THREE from 'three';
import imagemSaturno from './assets/saturno.jpg';
import imagemAnel from './assets/anel_saturno.png';

export function criarSaturno() {
    // Mesma geometria de Marte
    const geometry = new THREE.SphereGeometry(34, 64, 64);
    
    // Cor azul para representar a Saturno
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff }); 
    const saturno = new THREE.Mesh(geometry, material);

    
    const texturaLoader = new THREE.TextureLoader();
    const texturaSaturno = texturaLoader.load(imagemSaturno);
    material.map = texturaSaturno; // Aplica a textura


    const geometriaAnel = new THREE.RingGeometry(39, 64, 64);

    const texturaAnel = texturaLoader.load(imagemAnel);
    const materialAnel = new THREE.MeshStandardMaterial({ 
        map: texturaAnel,
        color: 0xffffff,
        side: THREE.DoubleSide, // Permite ver o anel por cima e por baixo
        transparent: true       // Ativa a transparência da imagem PNG
    })
    
    const anel = new THREE.Mesh(geometriaAnel, materialAnel);
    anel.rotation.x = Math.PI / 2;
    anel.rotation.y = Math.PI / 8;

    saturno.add(anel);

    //Joga a saturno pro lado pra n fundir com marte, q é o 000
    // saturno.position.x = 350; 

    return saturno;
}