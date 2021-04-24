const express = require("express")
const server = express()
const routes = require('./routes')
const path = require('path')

//template engine ejs
server.set('view engine', 'ejs')

//Mudar a localização da pasta views
server.set('views', path.join(__dirname, 'views'))

//habilitar arquivos estaticos
server.use(express.static('public'))

//usar o request.body
server.use(express.urlencoded({ extended: true }))

//rotas
server.use(routes)
server.listen(3000, () => console.log('servidor rodando'))
