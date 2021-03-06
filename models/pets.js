const conexao = require('../infraestrutura/database/conexao')
const uploadDeArquivo = require('../infraestrutura/arquivos/uploadDeArquivos')
class Pet {
    adiciona(pet, res) {
        const quey = 'INSERT INTO Pets SET ?;'

        uploadDeArquivo(pet.imagem, pet.nome, (erro, novoCaminho) => {
            if (erro) {
                res.status(400).json({ erro })
            } else {
                const novoPet = { nome: pet.nome, imagem: novoCaminho }
                conexao.query(quey, novoPet, erro => {
                    if (erro) {
                        console.log(erro)
                        res.status(400).json(erro)
                    }
                    else {
                        res.status(200).json(novoPet)
                    }
                })
            }

        })

    }
}
module.exports = new Pet