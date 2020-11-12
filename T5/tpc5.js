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
        else if (req.url.match(/^\/alunos\?_page=[1-9][0-9]*\/A[^/ \?\n]*$/)){
            var split = req.url.split("/",3)
            var page = url.parse(split[1],true).query['_page']
            api.sendAluno(axios,res,split[2],page)
        }
        else if (req.url == '/cursos') {
            api.sendCursos(axios,res)
        }
        else if (req.url.match(/^\/cursos\?_page=[1-9][0-9]*$/)){
            var page = url.parse(req.url,true).query['_page']
            api.sendCursosPage(axios,res,page)
        }
        else if (req.url.match(/^\/cursos\?_page=[1-9][0-9]*\/C[^/ \?\n]*$/)){
            var split = req.url.split("/",3)
            var page = url.parse(split[1],true).query['_page']
            api.sendCurso(axios,res,split[2],page)
        }
        else if (req.url == '/instrumentos') {
            api.sendInstrumentos(axios,res)
        }
        else if (req.url.match(/^\/instrumentos\?_page=[1-9][0-9]*$/)){
            var page = url.parse(req.url,true).query['_page']
            api.sendInstrumentosPage(axios,res,page)
        }
        else if (req.url.match(/^\/instrumentos\?_page=[1-9][0-9]*&_curso=C[^/ \?\n]*\/[XI][^/ \?\n]*$/)){
            var split = req.url.split("/",3)
            var parse = url.parse(split[1],true)
            var page = parse.query['_page']
            var curso = parse.query['_curso']
            api.sendInstrumentoCurso(axios,res,split[2],page,curso)
        }
        else if (req.url.match(/^\/instrumentos\?_page=[1-9][0-9]*\/[XI][^/ \?\n]*$/)){
            var split = req.url.split("/",3)
            var page = url.parse(split[1],true).query['_page']
            api.sendInstrumento(axios,res,split[2],page)
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