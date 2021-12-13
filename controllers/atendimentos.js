// app.get('/atendimentos', (req, res) => res.send('Você está na rota de atendimentos e está realizando um GET'))
const Atendimento = require('../models/atendimentos')
module.exports = app => {
    app.get('/atendimentos', (req, res) => res.send('Você está na rota de atendimentos e está realizando um GET'))

    app.post('/atendimentos', (req, res) => {
       const atendimento = req.body
       Atendimento.adiciona(atendimento)
        //console.log(req.body);
        res.send('Você está na rota de atendimentos e está realizando um POST')
    
    })

    
}
