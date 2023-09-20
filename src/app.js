const express = require('express');
const app = express();
const PORT = 3000;
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const { Server } = require("socket.io");
const handlebars = require('express-handlebars');
const fs = require("fs");
const server = http.createServer(app);
const io = new Server(server);

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")
app.use(express.static(__dirname, + "/views"))
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const productRouter = require("./routes/products.router")
app.use("/", productRouter)

app.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts.hbs');
});


io.on('connection', (socket) => {
    console.log('Usuario conectado')
    socket.on('productList', (product) => {
        let productos = JSON.parse(fs.readFileSync("productos.json", "utf-8"))
        productos.push(product)
        fs.writeFileSync("productos.json", JSON.stringify(productos));
        io.emit('product', product);
    });
    socket.on('disconnect', () => {
        console.log('Usuario desconectado')
    });
});

server.listen(PORT, () =>{
    console.log(`Servidor escuchando en ${PORT}`)
})