function badRequest(req,res){
    res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
    res.write("<p> Pedido não suportado: " + req.method + ", " + req.url + "</p>")
    res.end()
}

function sendIndex(res){
    res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
    res.write('<h2><span style="color:#2196F3">Escola de Música</span></h2>')
    res.write('<ul>')
    res.write('<li><a href="/alunos">Lista de Alunos</a></li>')
    res.write('<li><a href="/cursos">Lista de Cursos</a></li>')
    res.write('<li><a href="/instrumentos">Lista de Instrumentoss</a></li>')
    res.write('</ul>')
    res.end()
}

function sendAlunos(axios,res){
    axios.get('http://localhost:3001/alunos?_sort=nome&_order=asc')
            .then(resp => { 
                alunos = resp.data
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.write('<h2><span style="color:#2196F3">Alunos</span></h2>')
                res.write('<address>[<a href="/">Ínicio</a>]</address>')
                res.write('<ul>')
                
                alunos.forEach(a => {
                    var addr = `<a name="${a.id}"></a><a href="http://localhost:4000/alunos/${a.id}">[${a.id}] - ${a.nome}</a>`
                    res.write('<li>' + addr + '</li>')
                })
                res.write('</ul>')
                res.write('<address>[<a href="/">Ínicio</a>]</address>')
                res.end()
            })
            .catch(error => {
                console.log("Erro na obtenção da lista de alunos: " + error)
            })
}

function sendAluno(axios,res,id){
    axios.get('http://localhost:3001/alunos/' + id)
        .then(resp => {
            a = resp.data
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
            
            res.write(`<p><b><span style="color:#2196F3">Nº de Aluno:</span></b> ${a.id} </p>
                      <p><b><span style="color:#2196F3">Nome:</span></b> ${a.nome} </p>
                      <p><b><span style="color:#2196F3">Data de Nascimento:</span></b> ${a.dataNasc} </p>
                      <p><b><span style="color:#2196F3">Curso:</span></b> ${a.curso} </p>
                      <p><b><span style="color:#2196F3">Ano:</span></b> ${a.anoCurso} </p>
                      <p><b><span style="color:#2196F3">Instrumento:</span></b> ${a.instrumento} </p>`)

            res.write(`<address>[<a href="/alunos#${a.id}">Alunos</a>]</address> <address>[<a href="/">Ínicio</a>]</address>`)
            res.end()
        })
        .catch(error => {
            console.log("Erro na obtenção do aluno: " + error)
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
            res.write("<p> Aluno não existe: " + id + "</p>")
            res.end()
        })
}

function sendCursos(axios,res){
    axios.get('http://localhost:3001/cursos?_sort=id&_order=asc')
            .then(resp => { 
                cursos = resp.data
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.write('<h2><span style="color:#2196F3">Cursos</span></h2>')
                res.write('<address>[<a href="/">Ínicio</a>]</address>')
                res.write('<ul>')
                
                cursos.forEach(c => {
                    var addr = `<a name="${c.id}"></a><a href="http://localhost:4000/cursos/${c.id}">[${c.id}] - ${c.designacao}</a>`
                    res.write('<li>' + addr + '</li>')
                })
                res.write('</ul>')
                res.write('<address>[<a href="/">Ínicio</a>]</address>')
                res.end()
            })
            .catch(error => {
                console.log("Erro na obtenção da lista de alunos: " + error)
            })
}

function sendCurso(axios,res,id){
    axios.get('http://localhost:3001/cursos/' + id)
        .then(resp => {
            c = resp.data
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
            
            res.write(`<p><b><span style="color:#2196F3">Identificador:</span></b> ${c.id} </p>
                      <p><b><span style="color:#2196F3">Designação:</span></b> ${c.designacao} </p>
                      <p><b><span style="color:#2196F3">Duração:</span></b> ${c.duracao} </p>
                      <p><b><span style="color:#2196F3">Instrumento:</span></b></p>
                      <ul><li><b>Identificador</b>:<a name="${c.instrumento['id']}"></a><a href="http://localhost:4000/instrumentos/${c.instrumento['id']}">${c.instrumento['id']}</a></li><li><b>Nome</b>: ${c.instrumento['#text']}</li></ul>`)

            res.write(`<address>[<a href="/cursos#${c.id}">Cursos</a>]</address><address>[<a href="/">Ínicio</a>]</address>`)
            res.end()
        })
        .catch(error => {
            console.log("Erro na obtenção do curso: " + error)
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
            res.write("<p> Curso não existe: " + id + "</p>")
            res.end()
        })
}

function sendInstrumentos(axios,res){
    axios.get('http://localhost:3001/instrumentos?_sort=id&_order=asc')
            .then(resp => { 
                insts = resp.data
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.write('<h2><span style="color:#2196F3">Instrumentos</span></h2>')
                res.write('<address>[<a href="/">Ínicio</a>]</address>')
                res.write('<ul>')
                
                insts.forEach(i => {
                    var addr = `<a name="${i.id}"></a><a href="http://localhost:4000/instrumentos/${i.id}">[${i.id}] - ${i['#text']}</a>`
                    res.write('<li>' + addr + '</li>')
                })
                res.write('</ul>')
                res.write('<address>[<a href="/">Ínicio</a>]</address>')
                res.end()
            })
            .catch(error => {
                console.log("Erro na obtenção da lista de alunos: " + error)
            })
}

function sendInstrumento(axios,res,id){
    axios.get('http://localhost:3001/instrumentos/' + id)
        .then(resp => {
            i = resp.data
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
            
            res.write(`<p><b><span style="color:#2196F3">Identificador:</span></b> ${i['id']} </p>
                      <p><b><span style="color:#2196F3">Nome:</span></b> ${i['#text']} </p>`)

            res.write(`<address>[<a href="/instrumentos#${i.id}">Instrumentos</a>]</address><address>[<a href="/">Ínicio</a>]</address>`)
            res.end()
        })
        .catch(error => {
            console.log("Erro na obtenção do instrumento: " + error)
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
            res.write("<p> Instrumento não existe: " + id + "</p>")
            res.end()
        })
}

module.exports = {
    badRequest,
    sendIndex,
    sendAlunos,
    sendAluno,
    sendCursos,
    sendCurso,
    sendInstrumentos,
    sendInstrumento
}