const modalFechar = document.querySelector(".excluir");
const modal = document.querySelector(".cadastrar");
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
        entrada_data = document.createElement("td");
        entrada_hora = document.createElement("td");
        saida_data = document.createElement("td");
        saida_hora = document.createElement("td");
        valor = document.createElement("td");
        nome.innerHTML = cada.nome_cli;
        placa.innerHTML = cada.placa;
        modelo.innerHTML = cada.modelo;
        cor.innerHTML = cada.cor;
        tipo.innerHTML = cada.tipo;
        vaga.innerHTML = cada.vaga;
        entrada_data.innerHTML = cada.data_entrada.slice(0, 10);
        let datae = new Date(cada.data_entrada);
        let datas = new Date(cada.data_saida);
        entrada_hora.innerHTML = cada.data_entrada.slice(11, 19);
        saida_data.innerHTML = (cada.data_saida !== null) ? cada.data_saida.slice(0, 10) : "";
        saida_hora.innerHTML = (cada.data_saida !== null) ? cada.data_saida.slice(11, 19) : "";
        valor.innerHTML = (cada.valor==null) ? cada.valor :(convertMsToHM(datas.getTime() - datae.getTime()) * 15).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        linha.append(nome, placa, modelo, cor, tipo, vaga, entrada_data, entrada_hora, saida_data, saida_hora, valor);
        document.querySelector("#corpo").appendChild(linha);
    })
}

function editar() {
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
        "method": "PUT",
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
    modal.classList.add("model");
}

function abrirModal() {
    modal.classList.remove("model");
    inputNome.value = ""
    inputTipo.value = ""
    inputPlaca.value = ""
    inputCor.value = ""
    inputModelo.value = ""
    inputVaga.value = ""
    inputSaida.value = ""
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function convertMsToHM(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    // 👇️ if seconds are greater than 30, round minutes up (optional)
    minutes = seconds >= 30 ? minutes + 1 : minutes;

    minutes = minutes % 60;

    // 👇️ If you don't want to roll hours over, e.g. 24 to 00
    // 👇️ comment (or remove) the line below
    // commenting next line gets you `24:00:00` instead of `00:00:00`
    // or `36:15:31` instead of `12:15:31`, etc.
    hours = hours % 24;

    //return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
    return hours;
}
