import http from "http";

const PORT = 3000;
const server = http.createServer((req, res) => {
    res.writeHead(200, {"content-type":"text/plain"});
    res.end(
        
    );
});

server.listen(PORT, () => {
    console.log("servidor em execução");
});
 