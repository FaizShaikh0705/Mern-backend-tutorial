const http = require("http");

const server = http.createServer((req,res)=>{
    if(req.url=='/'){

        res.writeHead(200,{'Content-Type':'text/html'});
        res.end('<h1 style="color:blue;">Hello World</h1>');

    } else if(req.url=='/test'){

        res.writeHead(500,{'Content-Type':'application/json'});
        res.end(JSON.stringify({
            code: 500,
            remark: 'Internal server error',
            data: null
        }));

    } else {

        res.writeHead(404,{'Content-Type':'application/json'});
        res.end(JSON.stringify({
            code: 404,
            remark: 'Not found',
            data: null
        }));

    }
})

const PORT = 5000;
server.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});