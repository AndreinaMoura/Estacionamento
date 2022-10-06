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

DELIMITER $

CREATE TRIGGER alterarVaga after insert
ON entradas
FOR EACH ROW
BEGIN
    UPDATE vagas set disponivel = !disponivel where id = NEW.id_vaga;
END $

DELIMITER ;

CREATE VIEW vw_entradas as
SELECT c.nome as nome_cli, v.placa as placa, v.modelo as modelo, v.cor as cor, v.tipo as tipo, vg.id as vaga, e.data_entrada as data_entrada, e.data_saida as data_saida, e.valor as valor
FROM entradas e
INNER JOIN clientes c
ON e.id_cliente = c.id
INNER JOIN veiculos v
on e.placa = v.placa
INNER JOIN vagas vg
on e.id_vaga = vg.id;


INSERT INTO clientes
VALUES
(DEFAULT, 'Miguel Ferreira Pereira', '19 98708-7490', 'Rua das Palmeiras 231 Centro - Jundiaí SP'),
(DEFAULT, 'Luiza Silva', '19 92145-4523', 'Rua Roseira 25 Triunfo - Joanópolis SP'),
(DEFAULT, 'Felipe Alves', '11 96812-8510', 'Rua dos Bandeirantes 34 - Jarinu SP'),
(DEFAULT, 'Paulo Moreira', '11 95424-9984', 'Rua Branda 455 - Santos SP'),
(DEFAULT, 'Jéssica Helena Gonçalves', '11 95501-9898', 'Rua José Bonifácio 227 - Guarulhos SP');

INSERT INTO veiculos
VALUES
('EBD5V98', 'Renault Sandero', 'Prata', 'Carro'),
('AJP4T45', 'Peugeot 308', 'Azul', 'Carro'),
('POT8V25', 'Yamaha MT03', 'Cinza', 'Moto'),
('LKC7A43', 'Fiat Uno', 'Vermelho', 'Carro'),
('MOZ9F28', 'BMW 1200R', 'Preta', 'Moto');

INSERT INTO vagas
VALUES
('A1', false),
('A2', false),
('A3', false),
('A4', false),
('A5', false),
('A6', false),
('A7', false),
('A8', false),
('A9', false),
('B1', false),
('B2', false),
('B3', false),
('B4', false),
('B5', false),
('B6', false),
('B7', false),
('B8', false),
('B9', false);

INSERT INTO entradas
VALUES
(DEFAULT, 5, 'AJP4T45', 'A7', '2022-09-26 18:02:00', '2022-09-27 06:02:00', 180),
(DEFAULT, 2, 'POT8V25', 'B3', '2022-09-26 23:35:00', NULL, NULL),
(DEFAULT, 1, 'LKC7A43', 'A7', '2022-09-27 07:10:00', NULL, NULL),
(DEFAULT, 4, 'EBD5V98', 'A2', '2022-09-27 05:25:00', '2022-09-27 06:25:00', 15),
(DEFAULT, 3, 'MOZ9F28', 'A3', '2022-09-27 02:00:00', NULL, NULL);