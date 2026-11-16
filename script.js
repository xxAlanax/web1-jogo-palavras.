const palavras = [
    "javascript", "html", "css", "internet", "navegador",
    "programacao", "computador", "algoritmo", "website", "servidor"
  ];
  
  let palavraSecreta;
  let letrasCorretas = [];
  let letrasUsadas = [];
  let tentativas = 6;
  let jogoFinalizado = false;
  
  const elementoPalavra = document.getElementById("palavra");
  const elementoTentativas = document.getElementById("tentativas");
  const elementoLetrasUsadas = document.getElementById("letras-usadas");
  const inputLetra = document.getElementById("letra");
  const mensagem = document.getElementById("mensagem");
  const botaoTentar = document.getElementById("btn-tentar");
  const botaoReiniciar = document.getElementById("btn-reiniciar");
  
  function iniciarJogo() {
    const indice = Math.floor(Math.random() * palavras.length);
    palavraSecreta = palavras[indice];
    letrasCorretas = [];
    letrasUsadas = [];
    tentativas = 6;
    jogoFinalizado = false;
    mensagem.textContent = "";
    mensagem.className = "";
    elementoTentativas.textContent = tentativas;
    elementoLetrasUsadas.textContent = "Nenhuma";
    inputLetra.value = "";
    inputLetra.disabled = false;
    botaoTentar.disabled = false;
    atualizarPalavra();
    inputLetra.focus();
    console.log("Palavra sorteada:", palavraSecreta);
  }
  
  function atualizarPalavra() {
    let exibicao = "";
    for (let i = 0; i < palavraSecreta.length; i++) {
      const letra = palavraSecreta[i];
      exibicao += letrasCorretas.includes(letra) ? letra + " " : "_ ";
    }
    elementoPalavra.textContent = exibicao;
  }
  
  function verificarLetra() {
    if (jogoFinalizado) return;
  
    const letra = inputLetra.value.toLowerCase().trim();
  
    if (letra === "") {
      mostrarMensagem("Digite uma letra.", "erro");
      return;
    }
    if (letra.length !== 1) {
      mostrarMensagem("Digite apenas uma letra.", "erro");
      return;
    }
    if (!letra.match(/[a-záàâãéêíóôõúç]/i)) {
      mostrarMensagem("Digite uma letra válida.", "erro");
      inputLetra.value = "";
      return;
    }
    if (letrasUsadas.includes(letra)) {
      mostrarMensagem("Você já tentou essa letra.", "erro");
      inputLetra.value = "";
      inputLetra.focus();
      return;
    }
  
    letrasUsadas.push(letra);
    atualizarLetrasUsadas();
  
    if (palavraSecreta.includes(letra)) {
      letrasCorretas.push(letra);
      mostrarMensagem("Você acertou!", "sucesso");
    } else {
      tentativas--;
      elementoTentativas.textContent = tentativas;
      mostrarMensagem("Essa letra não existe na palavra.", "erro");
    }
  
    atualizarPalavra();
  
    if (venceu()) {
      mensagem.textContent = "🎉 Parabéns! Você descobriu a palavra: " + palavraSecreta;
      mensagem.className = "mensagem-sucesso";
      finalizarJogo();
    } else if (tentativas === 0) {
      mensagem.textContent = "😢 Você perdeu! A palavra era: " + palavraSecreta;
      mensagem.className = "mensagem-erro";
      finalizarJogo();
    }
  
    inputLetra.value = "";
    inputLetra.focus();
  }
  
  function venceu() {
    for (let i = 0; i < palavraSecreta.length; i++) {
      if (!letrasCorretas.includes(palavraSecreta[i])) return false;
    }
    return true;
  }
  
  function atualizarLetrasUsadas() {
    elementoLetrasUsadas.textContent = letrasUsadas.join(", ");
  }
  
  function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    if (tipo === "sucesso") mensagem.className = "mensagem-sucesso";
    else if (tipo === "erro") mensagem.className = "mensagem-erro";
    else mensagem.className = "";
  }
  
  function finalizarJogo() {
    jogoFinalizado = true;
    inputLetra.disabled = true;
    botaoTentar.disabled = true;
  }
  
  botaoTentar.addEventListener("click", verificarLetra);
  botaoReiniciar.addEventListener("click", iniciarJogo);
  inputLetra.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") verificarLetra();
  });
  
  iniciarJogo();
  
  
  