var fs=require('fs')

function error(res){
    res.writeHead(418,{'Content-Type':'text/html;charset=utf-8'})
    res.end()
}

function send(url,res){
    fs.readFile(url,function(err,data){
        res.writeHead(200,{'Content-Type':'text/html;charset=iso-8859-1'})
        res.write(data)
        res.end()
    })
}

function welcome(res){
    send('.\/site\/index.html',res)
}

function redirect(res){
    res.writeHead(301, {Location: 'http://localhost:7777/home'});
    res.end();
}

function sendArq(n,res){
    send('.\/site\/' + n + '.html',res)
}

function valid(str){
    var arq = /^\/arqs\/([1-9]|[1-9][0-9]|[1]([0-1][0-9]|[2][0-2]))$/ // /1...122 
    var empty = /^\/$/
    var home = /^\/home$/

    return (str.match(arq) || str.match(empty) || str.match(home)) // retorna null | objeto a conter o que foi matched
}

function favicon(res){
    fs.readFile("bone.ico",function(err,data){
        res.writeHead(200,{'Content-Type':'image/x-icon'})
        res.write(data)
        res.end()
    })
}

function teste(){
    var arq = /^\/arqs\/([1-9]|[1-9][0-9]|[1]([0-1][0-9]|[2][0-2]))$/ 
    for(var i = 0; i < 1000 ; i++){
        var str = "\/arqs\/" + i
        if(str.match(arq)) {
            console.log(str)
        }
    }
}

module.exports = {
    welcome,
    redirect,
    sendArq,
    valid,
    favicon,
    error
}
