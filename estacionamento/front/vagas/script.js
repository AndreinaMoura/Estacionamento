function carregar() {
    fetch('http://localhost:5000/estacionamento/vagas')
        .then((response) => {
            return response.json();
        })
        .then(dados => {
            dados.forEach((cada) => {

                var linha = document.querySelector(".linha");
                var vagas = document.createElement("div");
                vagas.setAttribute('class', 'vagas');
                vagas.setAttribute('onClick', 'preencher(this.id)')
                id = document.createElement("p");
                tipo = document.createElement("img");
                vagas.id = cada.id
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

            fetch('http://localhost:5000/estacionamento/clientes')
            .then(response => response.json())
            .then(clientes => {
                clientes.forEach(cliente => {
                    let op = document.createElement("option")
                    op.value = cliente.id
                    op.innerHTML = cliente.nome

                    document.querySelector('select').appendChild(op)
                });
            })

            fetch('http://localhost:5000/estacionamento/veiculos')
            .then(response => response.json())
            .then(veiculos => {
                veiculos.forEach(veiculo => {
                    let op = document.createElement("option")
                    op.value = veiculo.placa
                    op.innerHTML = veiculo.placa

                    document.querySelector('#selPlaca').appendChild(op)
                });
            })
        })
}

function preencher(id) {
    document.querySelector("#inpVaga").value = id
    toggleModal()
}

function toggleModal() {
    document.querySelector(".modal").classList.toggle("escondido")
}

function cadastrar() {
    let entrada = JSON.stringify({
        id_cliente: document.querySelector("#selCli").value,
        placa: document.querySelector("#selPlaca").value,
        id_vaga: document.querySelector("#inpVaga").value
    })

    const options = {method: 'POST', headers: {'Content-Type': 'application/json'}, body: entrada};

    fetch('http://localhost:5000/estacionamento/entradas', options)
      .then(response => response.json())
      .then(response => {
        console.log(response)
        if (response.placa != null) {
            alert('sucesso')
        }else{
            alert('vacilemo')
        }
      })
      .catch(err => console.error(err));

      toggleModal()
      window.location.reload();
}