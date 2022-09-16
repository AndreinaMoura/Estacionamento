const modalExcluir = document.querySelector(".excluir");
const modalCadastrar = document.querySelector(".cadastrar");
var corpo = document.querySelector("#corpo")
var nome = document.querySelector("#nome");
var telefone = document.querySelector("#telefone");
var endereco = document.querySelector("#endereco");
var inputNome = document.querySelector("#inputNome");
var inputTelefone = document.querySelector("#inputTelefone");
var inputEndereco = document.querySelector("#inputEndereco");
var dd = []
function carregar() {
    fetch('http://localhost:5000/estacionamento/vagas')
        .then((response) => {
            return response.json();
        })
        .then((dados) => {
            dd = dados
            preencherDiv()
        })
}
function preencherDiv() {
    dd.forEach(cada => {
        var linha = document.querySelector(".linha").cloneNode(true)
        var id = document.querySelector("#id_vaga").innerHTML = cada.id;
        var disponivel
        if (cada.disponivel) {
           disponivel = document.querySelector(".vagas").style = "background-color: #2fd659"
        } else {
           disponivel = document.querySelector(".vagas").style = "background-color: #fa2828"
        }
        linha.append(id, disponivel);
        corpo.appendChild(linha);
    })
}