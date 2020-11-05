var http= require('http')
var arq=require('./arq')

http.createServer(function(req,res){
    var found = arq.valid(req.url)
    if(found){
        var aux = found[0]
        if(aux.includes("home")){
            arq.welcome(res)
        }

        else if (aux == "/") {
            arq.redirect(res)
        }

        else {
            arq.sendArq(aux.split("/",3)[2],res)
        }
    }
    else {
        if(req.url==='/favicon.ico') {
            arq.favicon(res)
        }
        else{
            console.log("Invalid URL: " + req.url)
            arq.error(res)
        } 
    }
}).listen(7777)

console.log("TPC4 node.js server @ localhost:7777 started")