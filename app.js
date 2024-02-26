//  CRIAR UMA VARIAVEL ONDE TEM UM NOME DE numeroSorteado QUE VAI FAZER A CHAMADA DA FUNÇÃO gerarNumeroAleatorio.

let numeroSorteado = gerarNumeroAletorio();

// INFORMAÇÕES A SEREM EXIBIDAS NA TELA - QUE FORAM SUBSTITUIDAS PELA FUNÇÃO exibirTexto.

    // let titulo = document.querySelector("h1");
    // titulo.innerHTML = "Este é o Advinha mais!";

    // let paragrafo = document.querySelector("p");
    // paragrafo.innerHTML = "De um palpite de 1 a 8 !";

// PARA QUE O CÓDIGO NÃO FIQUE REPETITIVO, PODEMOS CRIAR UMA FUNÇÃO E DECLARAR OS PARAMETROS PARA EXIBIR COMO A TAG E O TEXTO.

function exibirTexto (tag, texto){
    textoAInserir = document.querySelector(tag);          // ONDE BUSCAR A INFORMAÇÃO, OU SEJA, LOCAL DA TAG
    textoAInserir.innerHTML = texto;                      // TEXTO A SER INSERIDO PELO .innerHTML
}

// AGORA DEVEMOS CHAMAR A FUNÇÃO COM O NOME DELA E INDICAR OS PARAMETROS QUE ELA TEM QUE EXECUTAR.

exibirTexto("h1", "Este é o Adivinha mais!");
exibirTexto("p", "De seu palpite de 1 a 10")

// CRIANDO UMA FUNÇÃO PARA GERAR UM NÚMERO ALEATÓRIO, ONDE IREMOS POSTERIROMENTE COMPARAR ELE AO PALPITE DADO PELO USUÁRIO.
function gerarNumeroAletorio() {
    return parseInt(Math.random() * 10 + 1);
    console.log(gerarNumeroAletorio);
        
}
let tentativas = 1;

function comparaNumeros(){
    let palpite = document.querySelector("input").value;
    let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
    let mensagemTentativas = `Você usou ${tentativas} ${palavraTentativa}`;
    ativarBotaoReiniciar();
    if(palpite == numeroSorteado){
        exibirTexto("h1", "Puxa Vida!");
        exibirTexto("p",`Você acertou! ${mensagemTentativas} `);
    } else {
        if(palpite < numeroSorteado){
            exibirTexto("h1", "Putz, errou!");
            exibirTexto("p","O número sorteado é maior que o Palpite!");
        } else {
            exibirTexto("h1", "Putz, errou!");
            exibirTexto("p","O número sorteado é menor que o Palpite!");
        }
    }
    tentativas++;
    limparInput();
} 

function limparInput(){
    palpite = document.querySelector("input");
    palpite.value = "";
}

function ativarBotaoReiniciar(){
    document.getElementById("reiniciar").removeAttribute("disabled");
}

function reiniciarJogo(){
    numeroSorteado = gerarNumeroAletorio();
    limparInput();
    tentativas = 1;
}