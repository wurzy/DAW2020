var http = require('http')
var axios = require('axios')
var url = require('url')
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
        else if (req.url.match(/^\/alunos\?_page=[1-9][0-9]*$/)){
            var page = url.parse(req.url,true).query['_page']
            api.sendAlunosPage(axios,res,page)
        }
        else if (req.url.match(/^\/alunos\/A[^/]*$/)){
            var id = req.url.split("/",3)[2]
            api.sendAluno(axios,res,id)
        }
        else if (req.url == '/cursos') {
            api.sendCursos(axios,res)
        }
        else if (req.url.match(/^\/cursos\?_page=[1-9][0-9]*$/)){
            var page = url.parse(req.url,true).query['_page']
            api.sendCursosPage(axios,res,page)
        }
        else if (req.url.match(/^\/cursos\/C[^/]*$/)){
            var id = req.url.split("/",3)[2]
            api.sendCurso(axios,res,id)
        }
        else if (req.url == '/instrumentos') {
            api.sendInstrumentos(axios,res)
        }
        else if (req.url.match(/^\/instrumentos\?_page=[1-9][0-9]*$/)){
            var page = url.parse(req.url,true).query['_page']
            api.sendInstrumentosPage(axios,res,page)
        }
        else if (req.url.match(/^\/instrumentos\/[XI][^/ \?\n]*$/)){
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