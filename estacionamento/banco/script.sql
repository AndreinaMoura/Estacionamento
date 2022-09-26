drop database if exists estacionamento;
create database estacionamento charset=UTF8 collate utf8_general_ci;
use estacionamento;
create table clientes(
    id integer not null primary key auto_increment,
    nome varchar(80) not null,
    telefone varchar(15) not null,
    endereco varchar(100) not null
);

CREATE TABLE veiculos(
    placa varchar(9) not null PRIMARY KEY,
    modelo varchar(30) not null,
    cor varchar(10) not null,
    tipo varchar(10) not null
);

CREATE TABLE vagas(
    id varchar(3) not null PRIMARY KEY,
    disponivel boolean NOT NULL
);

CREATE TABLE entradas(
    id_entrada integer not null PRIMARY KEY auto_increment,
    id_cliente integer not null,
    placa varchar(9) not null,
    id_vaga varchar(3) not null,
    data_entrada DATETIME not null,
    data_saida DATETIME,
    valor float(5,2),
    FOREIGN KEY (id_cliente) REFERENCES clientes(id),
    FOREIGN KEY (placa) REFERENCES veiculos(placa),
    FOREIGN KEY (id_vaga) REFERENCES vagas(id)
); 

CREATE VIEW vw_entradas as
SELECT c.nome as nome_cli, v.placa as placa, v.modelo as modelo, v.cor as cor, v.tipo as tipo, vg.id as vaga, e.data_entrada as data_entrada, e.data_saida as data_saida, e.valor as valor
FROM entradas e
INNER JOIN clientes c
ON e.id_cliente = c.id
INNER JOIN veiculos v
on e.placa = v.placa
INNER JOIN vagas vg
on e.id_vaga = vg.id;

insert into clientes values (default,"Ana","(19) 99837-7898","Rua Bueno"),(default,"José","(19) 99845-7835","Rua Amâncio"),(default,"Rodrigo","(19) 99837-2435","Rua Maracuja");
insert into veiculos values ("CMA1234","Honda","Azul","Moto"),("DOS4321","Fiat","Cinza","Carro"),("KAD7890","Chevrolet","Preto","Carro");
insert into vagas values ("A1",0),("A2",0),("A3",1),("A4",0),("A5",1),("A6",0),("A7",1),("A8",0),("A9",0),("B1",0),("B2",0),("B3",0),("B4",0),("B5",0),("B6",0),("B7",0),("B8",0),("B9",0);
insert into entradas values (default, 1, "CMA1234", "A5", curdate(),curdate(),30.00),(default, 2, "DOS4321", "A3", curdate(),curdate(),30.00),(default, 3, "KAD7890", "A7", curdate(),curdate(),30.00);