const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const { Server } = require("socket.io");
const handlebars = require('express-handlebars');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 3000

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")
app.use(express.static(__dirname, + "/views"))
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.render('home.hbs');
});

app.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts.hbs');
});


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