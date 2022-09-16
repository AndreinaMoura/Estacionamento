var linha
var nome = document.querySelector("#nome");
var telefone = document.querySelector("#telefone");
var endereco = document.querySelector("#endereco");
var dd = []
function carregar() {
    fetch('http://localhost:5000/estacionamento/clientes')
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
        linha = document.createElement('tr') 
        nome = document.createElement('td')
        endereco = document.createElement('td')
        telefone = document.createElement('td')
        nome.innerHTML = cada.nome;
        endereco.innerHTML = cada.endereco;
        telefone.innerHTML = cada.telefone;
        linha.append(nome, endereco, telefone);
        document.querySelector("#corpo").appendChild(linha);
    })
}