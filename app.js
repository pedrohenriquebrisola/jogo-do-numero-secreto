let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
}

function exibirMensagemInicial() {
  exibirTextoNaTela('h1', 'Jogo do número secreto');
  exibirTextoNaTela('p', 'Escolha um numero de 1 a 10');
}

exibirMensagemInicial();

function verificarChute() {
  let chute = document.querySelector('input').value;
  if (chute == numeroSecreto) {
    exibirTextoNaTela('h1', 'Parabéns! Você acertou!');
    let palavras = tentativas > 1 ? 'tentativas' : 'tentativa';
    exibirTextoNaTela(
      'p',
      `Você acertou o número secreto com ${tentativas} ${palavras}`
    );
    document.getElementById('reiniciar').removeAttribute('disabled');
  } else {
    if (chute > numeroSecreto) {
      exibirTextoNaTela('h1', 'O número secreto é menor');
    } else {
      exibirTextoNaTela('h1', 'O número secreto é maior');
    }
    tentativas++;
    limparCampo();
  }
}

function gerarNumeroAleatorio() {
  let numero = parseInt(Math.random() * numeroLimite + 1);
  let quantidadeElemntosLista = listaDeNumerosSorteados.length;

  if (quantidadeElemntosLista == numeroLimite) {
    listaDeNumerosSorteados = [];
  }

  if (listaDeNumerosSorteados.includes(numero)) {
    return gerarNumeroAleatorio();
  } else {
    listaDeNumerosSorteados.push(numero);
    return numero;
  }
}

function limparCampo() {
  document.querySelector('input').value = '';
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  exibirMensagemInicial();
  document.getElementById('reiniciar').setAttribute('disabled', true);
}
