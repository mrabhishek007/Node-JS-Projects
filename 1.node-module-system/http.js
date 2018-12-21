const http = require('http');

const server = http.createServer((request, response) => {
   if(request.url === '/'){
       response.write("Hello World..");
       response.end();
    }

    if (request.url === '/api/courses'){
        response.write(JSON.stringify(['1, 22, 3']));
        response.end();
    }
});

server.listen(3000);

console.log("Server listening to port 3000...") ;