const http = require('http');
const fs = require('fs');
const path = require('path');
const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req,res) => {
    console.log("request for "+ req.url + " by meathod "+ req.method);
    
    
    if(req.method == 'GET'){
        var fileUrl;
        if(req.url == '/') fileUrl = '/index.html';
        else{
            fileUrl = req.url;
        }
        var filePath = path.resolve('./public'+fileUrl);
        const fileExt = path.extname(filePath);

        if( fileExt == '.html' ){
            fs.exists(filePath, (exists) => {
                if(!exists){
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end('<html><body><h1> ERROR : 404' + fileUrl+ ' not found </h1> </body></html>');
                    return;
                }
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/html');
                    fs.createReadStream(filePath).pipe(res);
            });
        }
        else{
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><body><h1> ERROR : 404 ' + fileUrl+ ' not html  </h1> </body></html>');
            return;
        }
    }
    else{
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1> ERROR : 404' + req.method+ ' not supported  </h1> </body></html>');
        return;
    }
   
   
    

});

server.listen(port,hostname, () => { //a function thwat will run when server starts
    console.log(`Server running at http://${hostname}:${port}`);
});