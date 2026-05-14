import * as THREE from 'three';

export function criarSol(scene) {
  const relogioSol = new THREE.Clock();

  const ruidoGLSL = `
    float hash(vec3 p) {
        p = fract(p * 0.3183099 + 0.1);
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

  const vertexShaderSol = `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;
    ${ruidoGLSL}
    void main() {
      vUv = uv;
      vPosition = position;
      float pulso = noise(position * 1.5 + uTime * 0.8) * 0.2;
      vec3 novaPosicao = position + normal * pulso;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(novaPosicao, 1.0);
    }
  `;

  const fragmentShaderSol = `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;
    ${ruidoGLSL}
    void main() {
      float n1 = noise(vPosition * 2.0 + uTime);
      float n2 = noise(vPosition * 6.0 - uTime * 1.5);
      float mistura = (n1 + n2 * 0.5) / 1.5;
      
      vec3 corVermelha = vec3(0.5, 0.0, 0.0);
      vec3 corLaranja = vec3(1.0, 0.4, 0.0);
      vec3 corAmarela = vec3(1.0, 0.9, 0.2);
      
      vec3 corFinal;
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
    uniforms: { uTime: { value: 0.0 } }
  });

  const geometriaSol = new THREE.SphereGeometry(2.5, 128, 128); 
  const sol = new THREE.Mesh(geometriaSol, materialSol);
  sol.position.set(0, 0, 0); 
  
  // Adiciona o Sol na cena que veio do main.js
  scene.add(sol);

  // Retorna uma função que será chamada todo frame para animar
  return function animarSol() {
    materialSol.uniforms.uTime.value = relogioSol.getElapsedTime();
    sol.rotation.y += 0.005;
  };
}