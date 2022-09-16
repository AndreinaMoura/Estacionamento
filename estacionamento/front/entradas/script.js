const modalExcluir = document.querySelector(".excluir");
const modalCadastrar = document.querySelector(".cadastrar");
var inputNome = document.querySelector("#inputNome");
var inputTipo = document.querySelector("#inputTipo");
var inputPlaca = document.querySelector("#inputPlaca");
var inputCor = document.querySelector("#inputCor");
var inputModelo = document.querySelector("#inputModelo");
var inputVaga = document.querySelector("#inputVaga");
var inputSaida = document.querySelector("#inputSaida");
var nome = document.querySelector("#nome");
var tipo = document.querySelector("#tipo");
var placa = document.querySelector("#placa");
var cor = document.querySelector("#cor");
var modelo = document.querySelector("#modelo");
var vaga = document.querySelector("#vaga");
var entrada = document.querySelector("#entrada");
var saida = document.querySelector("#saida");
var valor = document.querySelector("#valor");

var dd = []
function carregar() {
    fetch('http://localhost:5000/estacionamento/entradas')
        .then((response) => {
            return response.json();
        })
        .then((dados) => {
            dd = dados
            preencherTabelas()
        })
}
function preencherTabelas() {
    dd.forEach(cada => {

        var linha = document.createElement("tr");
        nome = document.createElement("td");
        tipo = document.createElement("td");
        placa = document.createElement("td");
        cor = document.createElement("td");
        modelo = document.createElement("td");
        vaga = document.createElement("td");
        entrada = document.createElement("td");
        saida = document.createElement("td");
        valor = document.createElement("td");
        nome.innerHTML = cada.nome;
        tipo.innerHTML = cada.tipo;
        placa.innerHTML = cada.placa;
        cor.innerHTML = cada.cor;
        modelo.innerHTML = cada.modelo;
        vaga.innerHTML = cada.vaga;
        entrada.innerHTML = cada.entrada;
        saida.innerHTML = cada.saida;
        valor.innerHTML = cada.valor
        linha.append(nome, tipo, placa, cor, modelo);
        document.querySelector("#corpo").appendChild(linha);
    })
}

function cadastrar() {
    let entradas = {
        "nome_cli": inputNome.value,
        "tipo": inputTipo.value,
        "placa": inputPlaca.value,
        "cor": inputCor.value,
        "modelo": inputModelo.value,
        "vaga": inputVaga.value,
        "data_saida": inputSaida.value
    };

    fetch("http://localhost:5000/estacionamento/entradas", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(entradas)
    })
        .then(res => { return res.json() })
        .then(resp => {
            if (resp.placa !== undefined) {
                alert("Lançado Com Sucesso !");
                window.location.reload();
            } else {
                alert("Falha ao Lançar");
            }
        })
}

function fecharModal() {
    modalCadastrar.classList.add("model");
}

function abrirModalCadastro() {
    modalCadastrar.classList.remove("model");
    inputNome.value = ""
    inputTipo.value = ""
    inputPlaca.value = ""
    inputCor.value = ""
    inputModelo.value = ""
    inputVaga.value = ""
    inputSaida.value = ""
}