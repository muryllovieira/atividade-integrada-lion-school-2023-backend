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
app.get('/v1/lion-school/cursos', cors(), async function (request, response, next) {

    //Chamada da função que vai listar todos os cursos
    let cursos2 = cursos.getCursos()

    //Tratamento para validar o sucesso da requisição
    if (cursos2) {
        response.status(200)
        response.json(cursos2)
    } else {
        response.status(500)
    }
})
//EndPoint para listar todos os alunos - VERSÃO CERTA
// app.get('/v1/lion-school/alunos', cors(), async function (request, response, next) {

//     //Chamada da função que vai listar todos os cursos
//     let alunos2 = alunos.getAlunos()

//     //Tratamento para validar o sucesso da requisição
//     if (alunos2) {
//         response.status(200)
//         response.json(alunos2)
//     } else {
//         response.status(500)
//     }
// })
//EndPoint para listar todos os alunos - VERSÃO ERRADA
app.get('/v1/lion-school/alunos', cors(), async function (request, response, next) {

    let statusCode
    let curso = request.query.curso
    let status = request.query.status
    let dados = {}

    console.log("curso");
    if (status != null) {
            //Chamada da função para listar os dados de um aluno filtrando pelo status
            let dadosAlunos1 = alunos.getAlunosStatus(status)
            if (dadosAlunos1) {
                statusCode = 200
                dados = dadosAlunos1
            } else {
                statusCode = 404
                dados.message = 'Status inválido'
            }

    } else if (curso != null) {
            //Chamada da função para listar os dados de um aluno filtrando pelo curso
            let dadosAlunos = alunos.getAlunosCurso(curso)

            if (dadosAlunos) {
                statusCode = 200
                dados = dadosAlunos
            } else {
                statusCode = 404
            }

    } else {
        //Chamada da função que vai listar todos os cursos
        let alunos2 = alunos.getAlunos()

        //Tratamento para validar o sucesso da requisição
        if (alunos2) {
            statusCode = 200
            dados = alunos2
        } else {
            statusCode = 404
            dados.message = 'Aluno invalido'
        }

    }
    response.status(statusCode)
    response.json(dados)
})

//EndPoint para listar os dados de um aluno filtrando pela matricula
app.get('/v1/lion-school/alunos/:matricula', cors(), async function (request, response, next) {

    let statusCode
    let numeroMatricula = request.params.matricula
    let dados = {}

    if (numeroMatricula === undefined || numeroMatricula === "" || isNaN(numeroMatricula)) {
        statusCode = 400
        dados.message = 'Não foi possivel processar, pois os dados de entrada (matricula) que foi enviado não corrensponde ao que foi exigido. Confira o valor, pois não pode ser vazio, precisa ser numeros';
    } else {
        //Chamada da função para listar os dados de um aluno filtrando pela matricula
        let dadosAluno = alunos.getAlunosMatricula(numeroMatricula)

        if (dadosAluno) {
            statusCode = 200
            dados = dadosAluno
        } else {
            statusCode = 404
        }
    }
    //Retorna o codigo e o JSON
    response.status(statusCode)
    response.json(dados)

})
//EndPoint para listar os dados de todos os alunos filtrando pela sigla do curso
// app.get('/v1/lion-school/alunes', cors(), async function (request, response, next) {

//     let statusCode
//     let siglaCurso = request.query.curso
//     let dados = {}

//     if (siglaCurso === undefined || siglaCurso === "" || !isNaN(siglaCurso)) {
//         statusCode = 400
//         dados.message = 'Não foi possivel processar, pois os dados de entrada (siglaCurso) que foi enviado não corrensponde ao que foi exigido. Confira o valor, pois não pode ser vazio e precisa ser caracteres';
//     } else {
//         //Chamada da função para listar os dados de um aluno filtrando pela matricula
//         let dadosAlunos = alunos.getAlunosCurso(siglaCurso)

//         if (dadosAlunos) {
//             statusCode = 200
//             dados = dadosAlunos
//         } else {
//             statusCode = 404
//         }
//     }
//     //Retorna o codigo e o JSON
//     response.status(statusCode)
//     response.json(dados)

// })

// //EndPoint para listar todos os alunos que estao com o status cursando ou finalizado filtrando pelo status
// app.get('/v1/lion-school/alunus', cors(), async function (request, response, next) {

//     let statusCode
//     let statusAl = request.query.status
//     let dados = {}

//     if (statusAl === undefined || statusAl === "" || !isNaN(statusAl)) {
//         statusCode = 400
//         dados.message = 'Não foi possivel processar, pois os dados de entrada (statusAl) que foi enviado não corrensponde ao que foi exigido. Confira o valor, pois não pode ser vazio e precisa ser caracteres';
//     } else {
//         //Chamada da função para listar os dados de um aluno filtrando pela matricula
//         let dadosAlunos = alunos.getAlunosStatus(statusAl)

//         if (dadosAlunos) {
//             statusCode = 200
//             dados = dadosAlunos
//         } else {
//             statusCode = 404
//         }
//     }
//     //Retorna o codigo e o JSON
//     response.status(statusCode)
//     response.json(dados)
// })
//Roda o serviço da API para ficar aguardando requisições
app.listen(8080, function () {
    console.log('Servidor aguardando requisições na porta 8080.');
})