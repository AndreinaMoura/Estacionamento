var dd = []
function carregar() {
    fetch('http://localhost:5000/estacionamento/vagas')
        .then((response) => {
            return response.json();
        })
        .then(dados => {
            dados.forEach(cada => {

                var linha = document.querySelector(".linha");
                var vagas = document.createElement("div");
                vagas.setAttribute('class', 'vagas')
                id = document.createElement("p");
                tipo = document.createElement("img");

                id.innerHTML = cada.id;
                tipo.setAttribute('src', '../assets/vaga.png')
                tipo.setAttribute('class', 'icone')
                if (cada.disponivel == 0) {
                    vagas.style = 'background-color: #2fd659;'
                } else {
                    vagas.style = 'background-color: #fa2828;'
                }
                vagas.append(id, tipo);
                linha.append(vagas);
                document.querySelector(".corpo").append(linha);
            })
        })
}