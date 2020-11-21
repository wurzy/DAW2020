var http = require('http')
var axios = require('axios')
var static = require('./static')

var {parse} = require('querystring')

// Aux. Functions
// Retrieves json info from request body --------------------------------
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

function formatDate(date){
    const months = {
        0: 'Jan',
        1: 'Feb',
        2: 'Mar',
        3: 'Apr',
        4: 'May',
        5: 'Jun',
        6: 'Jul',
        7: 'Aug',
        8: 'Sep',
        9: 'Oct',
        10: 'Nov',
        11: 'Dec'
    }
    return `${date.getDate()}-${months[date.getMonth()]}-${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`
}

function generateRows(tasks,type){
    var i = 0
    let rows = `<table class="w3-table w3-bordered">
                <tr>
                    <th>ID</th>
                    <th>Data de Criação</th>
                    <th>Data Limite</th>
                    <th>Responsável</th>
                    <th>Descrição</th>
                    <th>Tipo</th>
                    <th></th>
                `  
                if(type=="undone") rows+=
                `
                    <th></th>
                `
                rows += `</tr>`
    tasks.forEach( t => {
        i++
        rows += `
            <tr id = ${i}>
                <td style="width=150px;overflow:hidden">${t.id}</td>
                <td style="width=150px;overflow:hidden">${formatDate(new Date(t.created))}</td>
                <td contenteditable='true' style="width=150px;overflow:hidden"><input id="a${i}" type="datetime-local" value="${t.due}"/></td>
                <td contenteditable='true' style="width=150px;overflow:hidden">${t.assigned}</td>
                <td contenteditable='true' style="width=150px;overflow:hidden">${t.description}</td>
                <td contenteditable='true' style="width=150px;overflow:hidden">${t.type}</td>`
                if(type=="undone") rows+=
                `
                <td style="width=150px;overflow:hidden"><button type="submit" onclick="sendTaskAlteration(${t.id},${i},'a${i}')">&#8635;</button></td> 
                `
                rows += `<td style="width=150px;overflow:hidden"><button type="submit" onclick=`
                rows += type==""?`"deleteTask(${t.id})">&#10005;`:`"doneTask(${t.id})">&#10003;`
                rows +=`</button></td>
                          </tr>`
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
            ${generateRows(undoneTasks,"undone")}
            <div class="w3-container w3-blue-gray">
                <h2>Lista de tarefas realizadas</h2>
            </div>
            ${generateRows(doneTasks,"")}  
            <div class="w3-container w3-blue-gray">
                <address>Lista atualizada em ${d}</address>
            </div>
            <script>
                function fixDate(date){
                    return new Date(date).toISOString().substring(0,16)
                }

                function generateRowJson(id,trid,iid){
                    let tr = document.getElementById(trid)
                    let data = {}

                    data["id"]=parseInt(tr.cells[0].innerHTML)
                    data["created"]=fixDate(tr.cells[1].innerHTML)
                    data["due"]=document.getElementById(iid).value
                    data["assigned"]=tr.cells[3].innerHTML 
                    data["description"]=tr.cells[4].innerHTML 
                    data["type"]=tr.cells[5].innerHTML 
                    data["status"]=false
                    return data
                }
                
                function sendRequest(id,req,json){
                    let xhr = new XMLHttpRequest()
                    xhr.open(req, 'http://localhost:7777/tasks/'+id)
                    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                    xhr.send(JSON.stringify(json))
                }

                function sendTaskAlteration(id,trid,iid){
                    let json = generateRowJson(id,trid,iid)
                    sendRequest(id,"PUT",json)
                    document.location.href='/'
                }

                function doneTask(id){
                    let json = {}
                    json["id"] = id
                    json["status"] = true
                    sendRequest(id,"PATCH",json)
                    document.location.href='/'
                }

                function deleteTask(id){
                    let json = {}
                    json["id"] = id
                    sendRequest(id,"DELETE",json)
                    document.location.href='/'
                }
            </script>
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
                    <input class="w3-input w3-border w3-light-grey" type="number" name="id">

                    <label class="w3-text-blue-gray"><b>Data Limite</b></label>
                    <input class="w3-input w3-border w3-light-grey" type="datetime-local" name="due">

                    <label class="w3-text-blue-gray"><b>Responsável</b></label>
                    <input class="w3-input w3-border w3-light-grey" type="text" name="assigned">

                    <label class="w3-text-blue-gray"><b>Descrição</b></label>
                    <input class="w3-input w3-border w3-light-grey" type="text" name="description">

                    <label class="w3-text-blue-gray"><b>Tipo</b></label>
                    <input class="w3-input w3-border w3-light-grey" type="text" name="type">

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
            console.log("Error no SendTasks: " + error)
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write("<p>Não foi possível obter a lista de tarefas completa...")
            res.end()
        })
}

function restfulData(req,res,d,method){
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    })
    req.on('end', () => {
        data = JSON.parse(data)
        var axiosreq
        switch(method){
            case "PUT":
                axiosreq = axios.put('http://localhost:3000/tasks/'+data["id"], data)
                break
            case "PATCH":
                axiosreq = axios.patch('http://localhost:3000/tasks/'+data["id"], data)
                break
            case "DELETE":
                axiosreq = axios.delete('http://localhost:3000/tasks/'+data["id"])
                break  
            default:
                break           
        }
        axiosreq
            .then(resp => {
                sendTasks(res,d)
                console.log(resp.data)
            })
            .catch(erro => {
                console.log("Erro no request" + method +": " + erro)
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write('<p>Erro no ' + method + ' de tarefa: ' + erro + '</p>')
                res.write('<p><a href="/">Voltar</a></p>')
                res.end()
            })
    })     
}

function badRequest(res,method){
    console.log("Error no request: " + method)
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
    res.write('<p>Recebi um ' + method + ' não suportado.</p>')
    res.write('<p><a href="/">Voltar</a></p>')
    res.end()    
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
                badRequest(res,"GET")
            }
            break
        case "POST":
            if(req.url == '/tasks'){
                recuperaInfo(req, resultado => {
                    resultado["status"] = false
                    resultado["created"] = d
                    let json = JSON.stringify(resultado)
                    console.log('POST de tarefa:' + json)
                    axios.post('http://localhost:3000/tasks', resultado)
                        .then(resp => {
                            sendTasks(res,d)
                            console.log(resp.data)
                        })
                        .catch(erro => {
                            console.log("Error nos posts: " + erro)
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write('<p>Já existe uma tarefa com esse ID: ' + erro + '</p>')
                            res.write('<p><a href="/">Voltar</a></p>')
                            res.end()
                        })
                })
            }
            else{
                badRequest(res,"POST")
            }
            break
        case "PUT":
            if(req.url.match(/^\/tasks\/[0-9]+$/)){
                restfulData(req,res,d,"PUT")
            }
            else {
                badRequest(res,"PUT")
            }
            break
        case "PATCH":
            if(req.url.match(/^\/tasks\/[0-9]+$/)){
                restfulData(req,res,d,"PATCH")
            }
            else{
                badRequest(res,"PATCH")
            }
            break
        case "DELETE":
            if(req.url.match(/^\/tasks\/[0-9]+$/)){
                restfulData(req,res,d,"DELETE")
            }
            else{
                badRequest(res,"DELETE")
            }
            break        
        default: 
            badRequest(res,req.method)
            break
    }
    }
})

todoServer.listen(7777)
console.log('Servidor à escuta na porta 7777...')