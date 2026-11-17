// EL MISMO PROYECTO DE INDEX.JS PERO ESCRITO EN EXPRESS

const express = require("express");
const path = require("node:path");

const app = express()
const PORT = 8080;

const links = [
    { href: "/", text: "Home" },
    { href: "/about", text: "About" },
];
const users = ["Rose", "Cake", "Biff"];

const desc = "somos una empresa dedicada a la venta de videojuegos retro por encargo a través de la web y la organización de eventos"

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// Una ruta por página
app.get("/", (req, res) => {
    // res.sendFile(path.join(__dirname, "index.html"));
    // res.render("index", { message: "EJS rocks!" });
    res.render("index", { links: links, users: users });
});

app.get("/about", (req, res) => {
    // res.sendFile(path.join(__dirname, "about.html"));
    res.render("about", { desc: desc });
});

app.get("/contact-me", (req, res) => {
    res.sendFile(path.join(__dirname, "contact-me.html"));
});

// Atrapa todo lo que no coincidió arriba
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "404.html"));
});

app.listen(PORT, () => { // Inicia las escuchas del servidor http 8080 a conexiones
    console.log(`Servidor Express en http://localhost:${PORT}`);
});