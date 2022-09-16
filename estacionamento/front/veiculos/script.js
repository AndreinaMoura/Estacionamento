var linha
var placa = document.querySelector("#placa");
var modelo = document.querySelector("#modelo");
var cor = document.querySelector("#cor");
var tipo = document.querySelector("#tipo");
var dd = []
function carregar() {
    fetch('http://localhost:5000/estacionamento/veiculos')
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
        console.log(dd)
        linha = document.createElement('tr') 
        placa = document.createElement('td')
        cor = document.createElement('td')
        modelo = document.createElement('td')
        tipo = document.createElement('td')
        placa.innerHTML = cada.placa;
        cor.innerHTML = cada.cor;
        modelo.innerHTML = cada.modelo;
        tipo.innerHTML = cada.tipo;
        linha.append(placa, cor, modelo, tipo);
        document.querySelector("#corpo").appendChild(linha);
    })
}