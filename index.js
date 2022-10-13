const express = require("express");
const app = express();
app.get("/", (request, response)=>{
    response.send("Hello World!!!");
    
});
app.listen(3000);

// const http = require("http");
// const express 
// const users = [{name:"user001", age:"228"}, {name:"user101", age:"223"}]
// const hostname = '127.0.0.1';
// const port = 3000;

//переписати Route
const server = http.createServer((req,res) => {
    if(req.url == "/users"){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/json');
        res.end(JSON.stringify(users));
    }
});

server.listen(port, hostname, ()=> {
    console.log(`Server running at http://${hostname}:${port}/`)
})


http.createServer(
    function(req, res){res.end("Hello World!");}
).listen(3000);


