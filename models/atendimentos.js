const conexao = require('../infraestrutura/database/conexao')
const moment = require('moment')
const e = require('express')
const { default: axios } = require('axios')
const repositorio = require('../repositorios/atendimentos')
class Atendimento {
    constructor() {
        this.validacoes = [
            {
                nome: 'data',
                valido: this.dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },

            {
                nome: 'cliente',
                valido: this.clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]
        this.dataEhValida = (data, dataCriacao) => moment(data).isSameOrAfter(dataCriacao)
        this.clienteEhValido = (tamanho) => tamanho > 4
        this.valida = (parametros) => {
            this.validacoes.filter(campo => {
                const {nome} = campo
                const parametro = parametros[nome]

                return !campo.valido(parametro)
            })
        }
    }
    adiciona(atendimento) {
        var dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        var data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const parametros = {
            data: {data, dataCriacao}
        }
        console.log(dataEhValida)
        console.log(atendimento.cliente.length)
        
        const parametros = {
            data: {data, dataCriacao},
            cliente: {tamanho: atendimento.length}
        }
        const erros = this.valida(parametros)

        const existemErros = erros.length

        if (existemErros) {
            return new Promise((resolve, reject) => reject(erros))
        }
        else {
            const atendimentoDatado = { ...atendimento, dataCriacao, data }

            return repositorio.adiciona(atendimentoDatado).then((resultados) => {
                const id = resultados.insertId
                return { id, ...atendimento,}
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