
let quantidadeDeNumerosQueVaiJogar = parseInt(prompt("Com quantos números você quer jogar?"));
let listaDeNumerosSorteados = [];


// FUNÇÃO QUE GERA O NUMERO ALEATÓRIO.
function gerarNumeroAleatorio(){
    
    // VARIAVEL NUMERO ESCOLHIDO QUE RECEBE O RESULTADO DO Math.random.
    let numeroEscolhido = parseInt(Math.random() * quantidadeDeNumerosQueVaiJogar + 1);
    
    // VARIAVEL QUE IGUALA O TAMANHO DA LISTA DE NUMEROS COM O TAMANHO DO ARRAY USANDO O .length.
    let tamanhoListaDeNumerosSorteados = listaDeNumerosSorteados.length;
    
    // IF COMPARANDO SE O TAMANHO DA LISTA ATINGIR/IGUALAR A QUANTIDADE DE NUMEROS POSSIVEIS, ELA ZERA A LISTA DE NUMEROS SORTEADOS.
    if(tamanhoListaDeNumerosSorteados == quantidadeDeNumerosQueVaiJogar){
        listaDeNumerosSorteados = [];
    }
    
    // IF DE VERIFICAÇÃO SE O NUMERO SORTEADO JÁ ESTÁ NA LISTA USANDO O .includes(numeroEscolhido).
    // SE TRUE/ESTIVER NA LISTA ELE RETORNA SORTEANDO UM NOVO NUMERO.
    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } 
    
    // ELSE FAZENDO A FUNÇÃO SE O NUMERO SORTEADO NÃO ESTIVER NA LISTA ELE INSERE O NUMERO DENTRO DA LISTA USANDO O .push(numeroEscolhido).
    else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
    
}

// A LET DO NUMERO SORTEADO É PARA CHAMAR A FUNÇÃO GERAR NUMERO ALEATÓRIO.
let numeroSorteado = gerarNumeroAleatorio();
console.log(numeroSorteado);

// FUNÇÃO PARA SELECIONAR EM QUE PARTE/TAG DO HTML ELE VAI EXIBIR E QUAL O TEXTO VAI INSERIR.
// DENTRO DELA TEM O responsiveVoice() QUE FAZ A NARRAÇÃO DO TEXTO E RECEBE 3 PARÂMETROS (1- TEXTO A SER LIDO; 2- IDIOMA; 3-VELOCIDADE {rate})
function exibeTextoNaTela(tag, texto){
    textoAInserir = document.querySelector(tag);
    textoAInserir.innerHTML = texto;
    responsiveVoice.speak(texto, 'Portuguese Female', {rate:1.2});
}
// FUNÇÃO DA MENSAGEM INICIAL DO JOGO, E PARA QUANDO CLICAR NOVO JOGO ELA APARECER NOVAMENTE.
function mensagemInicial(){
    exibeTextoNaTela("h1", "Adivinhe o Número Secreto");
    exibeTextoNaTela("p", "Dê seu palpite de 1 a 10");
}

// VARIAVEL PARA A MARCAÇÃO DO INÍCIO DAS TENTATIVAS 

let tentativas = 1;

// FUNÇÃO COMPARA NÚMEROS, QUE VAI PEGAR O NUMERO INSERIDO NO INPUT COM O NUMERO SORTEADO.

function comparaNumeros(){
    let palpiteJogador = document.querySelector("input").value;
    let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
    
    
    // FUNÇÃO IF/SE COMPARARANDO O NUMERO SORTEADO COM O PALPITE DO JOGADOR, TEXTO EM <h1> E EM <p>. E CHAMADA DA FUNÇÃO QUE ATIVA O BOTÃO REINICIAR.
    if(numeroSorteado == palpiteJogador){
        exibeTextoNaTela("h1", "Bingo!");
        exibeTextoNaTela("p", `Você acertou com ${tentativas} ${palavraTentativa}!`);
        ativarBotaoReiniciar();
    } 
    
    // ELSE FAZENDO A FUNÇÃO SE O PALPITE NÃO FOR IGUAL AO NUMERO SORTEADO.
    // IF FAZENDO A CHAMADA DA FUNÇÃO ESGOTA TENTATIVAS, QUANDO ATINGE 3 TENTATIVAS.

    else {
        if(tentativas == 3){
            esgotaTentativas();
        } 
        
        // ELSE FAZENDO A FUNÇÃO SE AINDA NÃO TIVER ATINGIDO O MAXIMO DE TENTATIVAS.
        // IF E ELSE COMPARANDO SE O PALPITE É MAIOR OU MENOR AO NUMERO SORTEADO E EXIBINDO AS DICAS.
        
        else {
            if(palpiteJogador < numeroSorteado){
                exibeTextoNaTela("h1", "Putz errou heim!");
                exibeTextoNaTela("p", `O Número Secreto é maior que o Palpite`);
                limparInput();
            } else {
                 exibeTextoNaTela("h1", "Ixi, errou!");
                 exibeTextoNaTela("p", `O Número Secreto é menor que o Palpite`);  
                 limparInput();
        }
        
        }
    // APÓS JOGAR E ERRAR, AUMENTA O USO DE TENTATIVAS.
    tentativas++;
    }
}
// FUNÇÃO DE ESGOTAR AS TENTATIVAS, ONDE EXIBE QUAL ERA O NUMERO SORTEADO E REINICIA O JOGO.
function esgotaTentativas(){
   exibeTextoNaTela("h1", "Acabou!");
   exibeTextoNaTela("p", `Esgotaram suas tentativas, o Número Secreto era ${numeroSorteado}.`);  
   ativarBotaoReiniciar();
}

// FUNÇÃO QUE LIMPA O INPUT A CADA JOGADA.
function limparInput(){
    palpiteJogador = document.querySelector("input");
    palpiteJogador.value = "";
}

// FUNÇÃO QUE ATIVA O BOTÃO REINICIAR, ELA SÓ É EXECUTADA QUANDO ESGOTAM AS TENTATIVAS OU QUANDO O JOGAGOR ACERTA.
// ONDE ESSA FUNÇÃO IDENTIFICA DENTRO DO INDEX O ID DO HTML (getElementById("idnome"))  E UTILIZA O .removeAttribute("nomeAtributo") PARA ATIVAR O BOTÃO.
function ativarBotaoReiniciar(){
    document.getElementById("reiniciar").removeAttribute("disabled");
}
// FUNÇÃO QUE DESATIVA O BOTÃO REINICIAR, ELA SÓ É EXECUTADA QUANDO REINICIA O JOGO.
// ONDE ESSA FUNÇÃO IDENTIFICA DENTRO DO INDEX O ID DO HTML .getElementById("idnome")  E UTILIZA O .setAttribute("nomeAtributo") PARA DESATIVAR O BOTÃO.
function desativarBotaoReiniciar(){
    document.getElementById("reiniciar").setAttribute("disabled", true);
}

// FUNÇÃO REINICIAR JOGO, ONDE CHAMA A FUNÇÃO MENSAGEM INICIAL, CHAMA A FUNÇÃO PARA GERAR UM NOVO NUMERO ALEATORIO.
// CHAMA A FUNÇÃO QUE LIMPA O INPUT E CHAMA A FUNÇÃO QUE DESATIVA O BOTÃO REINICIAR.
function reiniciarJogo(){
    mensagemInicial();
    numeroSorteado = gerarNumeroAleatorio();
    limparInput();
    tentativas = 1;
    desativarBotaoReiniciar();   
}

