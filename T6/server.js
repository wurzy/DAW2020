var http = require('http')
var axios = require('axios')
var static = require('./static')

var {parse} = require('querystring')

// Aux. Functions
// Retrieves student info from request body --------------------------------
function recuperaInfo(request, callback){
    if(request.headers['content-type'] == 'application/x-www-form-urlencoded'){
        let body = ''
        request.on('data', bloco => {
            body += bloco.toString()
        })
        request.on('end', ()=>{
            console.log(body)
            callback(parse(body))
        })
    }
}

function generateRows(tasks){
    let rows = `<table class="w3-table w3-bordered">
                <tr>
                    <th>ID</th>
                    <th>Data de Entrega</th>
                    <th>Responsável</th>
                    <th>Descrição</th>
                    <th>Status</th>
                </tr>`
    tasks.forEach( t => {
        rows += `
            <tr>
                <td style="width=150px;overflow:hidden">${t.id}</td>
                <td style="width=150px;overflow:hidden">${t.due}</td>
                <td style="width=150px;overflow:hidden">${t.assigned}</td>
                <td style="width=150px;overflow:hidden">${t.description}</td>
                <td style="width=150px;overflow:hidden">${t.status}</td>
            </tr>
        `
      })
      rows += `</table>`
      return rows
}

// Task List HTML Page Template  -----------------------------------------
function wrapTasks(undoneTasks,doneTasks,d){
    return `
    <html>
        <head>
            <title>To-Do List</title>
            <meta charset="utf-8"/>
            <link rel="icon" href="favicon.ico"/>
            <link rel="stylesheet" href="w3.css"/>
        </head>
        <body>
            ${taskForm()}
            <div class="w3-container w3-blue-gray">
                <h2>Lista de tarefas por realizar</h2>
            </div>
            ${generateRows(undoneTasks)}
            <div class="w3-container w3-blue-gray">
                <h2>Lista de tarefas realizadas</h2>
            </div>
            ${generateRows(doneTasks)}  
            <div class="w3-container w3-blue-gray">
                <address>Lista atualizada em ${d}</address>
            </div>
        </body>
    </html>
  `
}

function taskForm(){
    return `<div class="w3-container w3-blue-gray">
                <h2>Registar tarefa</h2>
            </div>
            <p><label class="w3-text-blue-gray"></label></p>
                <form class="w3-container" action="/tasks" method="POST">
                    <label class="w3-text-blue-gray"><b>Identificador</b></label>
                    <input class="w3-input w3-border w3-light-grey" type="text" name="id">

                    <label class="w3-text-blue-gray"><b>Data Limite</b></label>
                    <input class="w3-input w3-border w3-light-grey" type="datetime-local" name="due">

                    <label class="w3-text-blue-gray"><b>Responsável</b></label>
                    <input class="w3-input w3-border w3-light-grey" type="text" name="assigned">

                    <label class="w3-text-blue-gray"><b>Descrição</b></label>
                    <input class="w3-input w3-border w3-light-grey" type="text" name="description">

                    <p><label class="w3-text-blue-gray"></label></p>
                    <input class="w3-btn w3-blue-grey" type="submit" value="Registar"/>
                    <input class="w3-btn w3-blue-grey" type="reset" value="Limpar valores"/> 
                </form> `
}

function sendTasks(res,d){
    axios.all([axios.get("http://localhost:3000/tasks?status=false"),
               axios.get("http://localhost:3000/tasks?status=true")])
        .then(axios.spread((undoneTasks, doneTasks) => {  
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(wrapTasks(undoneTasks.data,doneTasks.data,d))
                        res.end()
        }))
        .catch(error => {
            console.log(error)
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write("<p>Não foi possível obter a lista de tarefas completa...")
            res.end()
        })
}

// Server setup

var todoServer = http.createServer(function (req, res) {
    // Logger: que pedido chegou e quando
    var d = new Date().toISOString().substr(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Request processing
    // Tests if a static resource is requested
    if(static.recursoEstatico(req)){
        static.sirvoRecursoEstatico(req, res)
    }
    else{
    // Normal request
    switch(req.method){
        case "GET": 
            // GET /tasks --------------------------------------------------------------------
            if((req.url == "/") || (req.url == "/tasks")){
                sendTasks(res,d)
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " " + req.url + " não suportado neste servidor.</p>")
                res.end()
            }
            break
        case "POST":
            if(req.url == '/tasks'){
                recuperaInfo(req, resultado => {
                    resultado["status"] = false
                    let json = JSON.stringify(resultado)
                    console.log('POST de tarefa:' + json)
                    axios.post('http://localhost:3000/tasks', resultado)
                        .then(resp => {
                            sendTasks(res,d)
                            console.log("resultado: "+resp.data)
                        })
                        .catch(erro => {
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write('<p>Já existe uma tarefa com esse ID: ' + erro + '</p>')
                            res.write('<p><a href="/">Voltar</a></p>')
                            res.end()
                        })
                })
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write('<p>Recebi um POST não suportado.</p>')
                res.write('<p><a href="/">Voltar</a></p>')
                res.end()
            }
            break
        default: 
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write("<p>" + req.method + " não suportado neste servidor.</p>")
            res.end()
    }
    }
})

todoServer.listen(7777)
console.log('Servidor à escuta na porta 7777...')