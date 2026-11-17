// ESCRITO EN NODE.JS PURO

const http = require("node:http")
const fs = require("node:fs");
const path = require("node:path");

const PORT = 8080;

const pages = {
    "/": "index.html",
    "/about": "about.html",
    "/contact-me": "contact-me.html",
};

function sendPage(res, status, fileName) {
    fs.readFile(path.join(__dirname, fileName), (err, content) => {
        if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Error del servidor");
            return;
        }
    res.writeHead(status, { "Content-Type": "text/html" });
    res.end(content);
    });
}

const server = http.createServer((req, res) => { // Crea un nuevo servidor del cual recibir datos
    const { pathname } = new URL(req.url, `http://${req.headers.host}`);
    const fileName = pages[pathname];

    if (fileName){
        sendPage(res, 200, fileName)
    } else {
        sendPage(res, 404, "404.html")
    }
});

server.listen(PORT, () => { // Inicia las escuchas del servidor http 8080 a conexiones
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});