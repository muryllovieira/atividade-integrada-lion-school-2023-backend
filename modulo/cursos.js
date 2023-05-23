var cursos = [
    {
        "nome": "Técnico em Desenvolvimento de Sistemas",
        "sigla": "DS",
        "icone": "https://image.shutterstock.com/image-vector/api-interface-vector-icon-600w-659203513.jpg",
        "carga": "1200",
    },
    {
        "nome": "Técnico em Redes de Computadores",
        "sigla": "RDS",
        "icone": "https://img.icons8.com/ultraviolet/344/thin-client.png",
        "carga": "1200"
    }
    
];
const getCursos = function () {

    let arrayCursos = [];
    let jsonCursos = {};

    jsonCursos.cursos = arrayCursos

    cursos.forEach(function (sigla) {
        let jsonCurso = {}
        jsonCurso.sigla = sigla.sigla
        jsonCurso.icone = sigla.icone
        jsonCurso.nome = sigla.nome
       
        arrayCursos.push(jsonCurso)

    })

    return jsonCursos
}
//console.log(getCursos());

module.exports = {
    getCursos
}

