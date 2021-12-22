const conexao = require('../infraestrutura/database/conexao')
const moment = require('moment')
const e = require('express')
const { default: axios } = require('axios')
class Atendimento {
    adiciona(atendimento, res) {
        var dataCriacao =  moment().format('YYYY-MM-DD HH:MM:SS')
        var data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        var dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        var clienteEhValido = atendimento.cliente.length > 4
       console.log(dataEhValida)
        console.log(atendimento.cliente.length)
        var validacoes = [    
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },

            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)

        const existemErros = erros.length

        if (existemErros) {
            res.status(400).json(erros)
        }
        else {
            const atendimentoDatado = { ...atendimento, dataCriacao, data }
            const sql = 'INSERT INTO Atendimentos \
            SET ?'

            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if (erro) {
                    res.status(400).json(erro)
                }
                else {
                    res.status(201).json({ atendimento })
                }

            })
        }


    }

    lista(res) {
        const sql = 'SELECT * FROM atendimentos'
        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            }
            else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM atendimentos WHERE id=${id};`
        conexao.query(sql, async (erro, resultados) => {
            const atendimento = resultados[0]
            const cpf = atendimento.cliente
            if (erro) {
                res.status(400).json(erro)
            }
            else {
                const { data } = await axios.get(`http://localhost:8082/${cpf}`)
                atendimento.cliente = data
                res.status(200).json(atendimento)
            }

        })
    }

    altera(id, valores, res) {
        if (valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        }

        const sql = 'UPDATE atendimentos SET ? WHERE id=?;'
        conexao.query(sql, [valores, id], (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            }
            else {
                res.status(200).json(...valores, id)
            }

        })
    }

    deleta(id, res) {
        const sql = 'DELETE FROM atendimentos WHERE id = ?;'
        conexao.query(sql, id, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            }
            else {
                res.status(200).json({ id })
            }
        })
    }
}
module.exports = new Atendimento