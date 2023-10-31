
// Variáveis para os robôs e suas vidas
let robo1 = {
    elemento: document.getElementById('robo1'),
    vida: 100,
    posicaoX: -115,
    posicaoY: -100,
};
let robo2 = {
    elemento: document.getElementById('robo2'),
    vida: 100,
    posicaoX: 115,
    posicaoY: -100,
};

// Contador de colisões
let colisoes = 0;
const limiteColisoes = 5;


// Flag para controlar o estado do jogo
let jogoAtivo = true;



// Função para atualizar a vida dos robôs
function atualizarVida() {
    const vidaRobo1Element = document.getElementById('vida-robo1');
    const vidaRobo2Element = document.getElementById('vida-robo2');

    if (vidaRobo1Element && vidaRobo2Element) {
        vidaRobo1Element.innerText = `Vida Robô 1: ${robo1.vida}`;
        vidaRobo2Element.innerText = `Vida Robô 2: ${robo2.vida}`;
    }
}

// Função para verificar colisões
function verificarColisao() {
    if (!jogoAtivo) return; // Verificar se o jogo ainda está ativo

    const rect1 = robo1.elemento.getBoundingClientRect();
    const rect2 = robo2.elemento.getBoundingClientRect();

    if (
        rect1.left < rect2.left + rect2.width &&
        rect1.left + rect1.width > rect2.left &&
        rect1.top < rect2.top + rect2.height &&
        rect1.top + rect1.height > rect2.top
    ) {
        // Colisão detectada
        const dano1 = Math.floor(Math.random() * 21); // Dano entre 0 e 20
        const dano2 = Math.floor(Math.random() * 21);

        robo1.vida -= dano1;
        robo2.vida -= dano2;

        colisoes++;

        console.log(`Colisão ${colisoes}:`);
        console.log(`Robô 1 perdeu ${dano1} de vida.`);
        console.log(`Robô 2 perdeu ${dano2} de vida.`);

        if (colisoes === limiteColisoes) {
            let vencedor;
            if (robo1.vida > robo2.vida) {
                vencedor = "Robô 1";
            } else if (robo2.vida > robo1.vida) {
                vencedor = "Robô 2";
            } else {
                vencedor = "Empate";
            }
        
            // Chame a função mostrarMensagemVitoria para exibir a mensagem de vitória e o botão de reinício
            mostrarMensagemVitoria(vencedor);
        
            // Defina a flag jogoAtivo como false para encerrar o jogo
            jogoAtivo = false;
        }
        atualizarVida();



        // Após a colisão, afaste os robôs manualmente
        afastarRobos();
    }
}

// Função para afastar os robôs manualmente
function afastarRobos() {
    const distanciaMinima = 50; // Distância mínima entre os robôs após uma colisão

    const rect1 = robo1.elemento.getBoundingClientRect();
    const rect2 = robo2.elemento.getBoundingClientRect();

    const distanciaHorizontal = Math.abs(rect1.left - rect2.left);
    const distanciaVertical = Math.abs(rect1.top - rect2.top);

    // Mova os robôs em direções opostas para afastá-los
    if (distanciaHorizontal < distanciaMinima && distanciaVertical < distanciaMinima) {
        if (rect1.left < rect2.left) {
            robo1.posicaoX -= distanciaMinima / 2;
            robo2.posicaoX += distanciaMinima / 2;
        } else {
            robo1.posicaoX += distanciaMinima / 2;
            robo2.posicaoX -= distanciaMinima / 2;
        }

        if (rect1.top < rect2.top) {
            robo1.posicaoY -= distanciaMinima / 2;
            robo2.posicaoY += distanciaMinima / 2;
        } else {
            robo1.posicaoY += distanciaMinima / 2;
            robo2.posicaoY -= distanciaMinima / 2;
        }

        atualizarPosicaoRobos();
    }
}

// Função para atualizar a posição dos robôs com animação de deslizamento
function atualizarPosicaoRobos() {
    // Aplicar a transformação de deslizamento
    robo1.elemento.style.transform = `translate(${robo1.posicaoX}px, ${robo1.posicaoY}px)`;
    robo2.elemento.style.transform = `translate(${robo2.posicaoX}px, ${robo2.posicaoY}px)`;
}


// Inicialize a exibição da vida dos robôs
atualizarVida();
atualizarPosicaoRobos(); // Inicialize a posição dos robôs

// Função para mostrar mensagem de vitória e botão de reinício
function mostrarMensagemVitoria(vencedor) {
    const vitoriaElement = document.getElementById('vitoria');
    vitoriaElement.style.display = 'block';
    vitoriaElement.innerHTML = `<h2>Vitória do ${vencedor}!</h2>`;


    const restartButton = document.createElement('button');
    restartButton.id = 'restartButton';
    restartButton.textContent = 'Reiniciar';

    vitoriaElement.appendChild(restartButton);

    // Adicione um evento de clique ao botão de reinício
    restartButton.addEventListener('click', reiniciarJogo);
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    // Restabeleça as condições iniciais do jogo, incluindo a vida dos robôs e ocultando a mensagem de vitória
    robo1.vida = 100;
    robo1.posicaoX = -115;
    robo1.posicaoY = -100;

    robo2.vida = 100;
    robo2.posicaoX = 115;
    robo2.posicaoY = -100;

    colisoes = 0;
    jogoAtivo = true;

    const vitoriaElement = document.getElementById('vitoria');
    const restartButton = document.getElementById('restartButton');

    vitoriaElement.style.display = 'none';
    restartButton.style.display = 'none';

    atualizarVida();
    atualizarPosicaoRobos();
}


// Adicione event listener para o movimento dos robôs
document.addEventListener('keydown', function (event) {
    if (!jogoAtivo) return; // Verificar se o jogo ainda está ativo antes de mover os robôs


    const moveSpeed = 10; // Velocidade de movimento

    switch (event.key) {
        case 'ArrowLeft':
            if (robo1.posicaoX - moveSpeed >= -184) {
                robo1.posicaoX -= moveSpeed;
            }
            break;
        case 'ArrowRight':
            if (robo1.posicaoX + robo1.elemento.width + moveSpeed <= 234) {
                robo1.posicaoX += moveSpeed;
            }
            break;
        case 'ArrowUp':
            if (robo1.posicaoY - moveSpeed >= -180) {
                robo1.posicaoY -= moveSpeed;
            }
            break;
        case 'ArrowDown':
            if (robo1.posicaoY + robo1.elemento.height + moveSpeed <= 230) {
                robo1.posicaoY += moveSpeed;
            }
            break;
        case 'a':
            if (robo2.posicaoX - moveSpeed >= -184) {
                robo2.posicaoX -= moveSpeed;
            }
            break;
        case 'd':
            if (robo2.posicaoX + robo2.elemento.width + moveSpeed <= 234) {
                robo2.posicaoX += moveSpeed;
            }
            break;
        case 'w':
            if (robo2.posicaoY - moveSpeed >= -180) {
                robo2.posicaoY -= moveSpeed;
            }
            break;
        case 's':
            if (robo2.posicaoY + robo2.elemento.height + moveSpeed <= 230) {
                robo2.posicaoY += moveSpeed;
            }
            break;
    }

    atualizarPosicaoRobos();
    verificarColisao();
});

// Inicialize a exibição da vida dos robôs
atualizarVida();
