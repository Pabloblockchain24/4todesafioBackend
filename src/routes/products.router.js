const express = require("express")
const router = express.Router()
const fs = require("fs");

let productos = JSON.parse(fs.readFileSync("productos.json", "utf-8"))

router.get("/", (req,res)=>{
    res.render("index.hbs",{
        productos
    })
})

module.exports = router