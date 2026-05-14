# Projeto 1 - Processamento Gráfico (PG)

Este repositório contém a implementação do Primeiro Projeto da disciplina de Processamento/Computação Gráfica. O projeto consiste em uma cena virtual em 3D que demonstra a aplicação de conceitos fundamentais de renderização, manipulação de câmeras, texturização e programação de shaders.

---

## Tecnologias Utilizadas

* **Linguagem:** JavaScript
* **API Gráfica:** WebGL
* **Biblioteca/Framework:** Three.js

---

## Especificações Atendidas

O projeto atende a todos os requisitos solicitados na especificação:

- [x] **Múltiplos Objetos 3D:** Visualização de pelo menos um objeto 3D por membro do grupo. Cada objeto foi redimensionado e posicionado individualmente no ambiente virtual.
- [x] **Shader Customizado:** Utilização de um shader próprio (Vertex/Fragment) em pelo menos um dos objetos.
- [x] **Múltiplas Câmeras:** Definição e configuração de pelo menos duas câmeras na cena.
- [x] **Animação:** Implementação de movimento simples em pelo menos um objeto da cena.
- [x] **Texturização:** Aplicação de textura mapeada em pelo menos um objeto.

---

## Principais Características Implementadas

Nesta seção estão descritos os detalhes do que foi construído na cena:

* **Objetos 3D:** Foram criados ao total 9 objetos, sendo os 8 planetas do sistema solar e o sol
* **Implementação do Shader:** O sol foi criado usando um shader prório, que pode ser encontrado no arquivo sun.js. O Shader foi 
    1.  **Câmera 1 (Principal):** Esta câmera é livre e pode ser movimentada usando o mouse.
    2.  **Câmera 2:** Esta câmera está posicionada de forma TopDown e é fixa
    3.  **Câmera 3:** Esta câmera está posicionada de forma lateral aos planetas e é fixa.
* **Movimentação:** Todos os planetas tem movimentos de rotação e translação incorporados
* **Aplicação de Textura:** Foram carregadas as texturas da pasta assets usando o TextureLoader da biblioteca Three.JS

---

## Modo de Interação
Para navegar e interagir com a cena virtual, utilize os seguintes controles:

* **Mouse (Botão Esquerdo):** Segure e mova o mouse para moviementar a câmera
* **Mouse (Scroll):** Use para aumentar ou diminuir o zoom na câmera livre
* **Tecla `[C]` ** Use para trocar entre os modos de câmera
---

## Para Executar o Projeto
Para rodar este projeto localmente na sua máquina, siga os passos abaixo:

### Pré-requisitos
* Node.JS 20.x.x +

### Passo a Passo
No terminal:
1. Clone o repositório com o comando git clone [https://github.com/alissongurgel8/Projeto1PG.git](https://github.com/alissongurgel8/Projeto1PG.git)
2. Navegue até a pasta Projeto1PG\src
3. Instale as dependências com o comando npm install
4. Execute o programa com o comando npm run dev
