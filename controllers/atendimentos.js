// app.get('/atendimentos', (req, res) => res.send('Você está na rota de atendimentos e está realizando um GET'))
const atendimentos = require('../models/atendimentos')
const Atendimento = require('../models/atendimentos')
module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        Atendimento.lista(res)
    })

    app.get('/atendimentos/:id', (req, res) => {
        console.log(req.params)
        const id = parseInt(req.params.id)
        Atendimento.buscaPorId(id, res)
        //res.send('OK')
    })

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body
        Atendimento.adiciona(atendimento, res)
        //console.log(req.body);
        // res.send('Você está na rota de atendimentos e está realizando um POST')

    })

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Atendimento.altera(id, valores, res)
    })

    

}
