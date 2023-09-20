const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const { Server } = require("socket.io");
const handlebars = require('express-handlebars');

const fs = require("fs");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 3000

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

// app.post('/realTimeProducts', (req, res) => {
//     let productos = JSON.parse(fs.readFileSync("productos.json", "utf-8"))
//     let nuevoProducto = req.body
//     productos.push(nuevoProducto)
//     fs.writeFileSync("productos.json", JSON.stringify(productos));
// });

io.on('connection', (socket) => {
    console.log('Usuario conectado')

    socket.on('productList', (product) => {
        io.emit('product', product);
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado')
    });
});


server.listen(PORT, () =>{
    console.log(`Servidor escuchando en ${PORT}`)
})