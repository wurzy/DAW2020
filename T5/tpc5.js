var http= require('http')
var axios = require('axios')
var api = require('./api.js')

http.createServer(function(req,res){
    console.log(req.method + ' ' + req.url)
    if(req.method == 'GET'){
        if(req.url=='/'){
            api.sendIndex(res)
        }
        else if (req.url == '/alunos') {
            api.sendAlunos(axios,res)
        }
        else if (req.url.match(/^\/alunos\/A[^/]*$/)){
            var id = req.url.split("/",3)[2]
            api.sendAluno(axios,res,id)
        }
        else if (req.url == '/cursos') {
            api.sendCursos(axios,res)
        }
        else if (req.url.match(/^\/cursos\/C[^/]*$/)){
            var id = req.url.split("/",3)[2]
            api.sendCurso(axios,res,id)
        }
        else if (req.url == '/instrumentos') {
            api.sendInstrumentos(axios,res)
        }
        else if (req.url.match(/^\/instrumentos\/[XI][^/]*$/)){
            var id = req.url.split("/",3)[2]
            api.sendInstrumento(axios,res,id)
        }
        else {
            api.badRequest(req,res)
        }
    }
    else {
        api.badRequest(req,res)
    }
}).listen(4000)

console.log("Servidor localhost:4000")