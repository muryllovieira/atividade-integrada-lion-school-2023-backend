/** 
 * Objetivo: Criar uma API para disponibilizar dados de um sistema escolar
 * Autor: Muryllo / Matheus
 * Data: 24/03
 * Versão: 1.0
**/

//Import das dependencias do projeto

//Dependencia para criar as requisições de API
const express = require('express');
//Dependencia para gerenciar as permissões da API
const cors = require('cors');
//Dependencia para gerenciar o corpo das requisições da API
const bodyParser = require('body-parser');
//Import do arquivo modulo (funções)
const cursos = require('./modulo/cursos.js');
const alunos = require('./modulo/alunos.js');

//Cria um objeto com as caracteristicas do express
const app = express();

app.use((request, response, next) => {
    //API publica - fica disponivel para utilização de qualquer aplicação
    //API privada - fica disponivel somente para o IP informado poder consumir dados da API
    //Define se a API é publica ou privada
    response.header('Access-Control-Allow-Origin', '*');

    //Permite definir quais metodos poderão ser utilizados nas requisições da API
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    //Envia para o cors() as regras de permissões
    app.use(cors());

    next();
})

// EndPoints

    //EndPoint para listar os cursos
    app.get('/v1/lion-school/cursos', cors(), async function (request, response, next){

        //Chamada da função que vai listar todos os cursos
        let cursos2 = cursos.getCursos()

        //Tratamento para validar o sucesso da requisição
        if(cursos2){
            response.status(200)
            response.json(cursos2)
        } else {
            response.status(500)
        }
    })

    //EndPoint para listar todos os alunos
    app.get('/v1/lion-school/alunos', cors(), async function (request, response, next){

        //Chamada da função que vai listar todos os cursos
        let alunos2 = alunos.getAlunos()

        //Tratamento para validar o sucesso da requisição
        if(alunos2){
            response.status(200)
            response.json(alunos2)
        } else {
            response.status(500)
        }
    })
//Roda o serviço da API para ficar aguardando requisições
app.listen(8080, function () {
    console.log('Servidor aguardando requisições na porta 8080.');
})