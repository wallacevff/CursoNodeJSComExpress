class Tabelas {
    init(conexao) {
        this.conexao = conexao
        this.criarAtendimentos()
        this.criarPets()
    }

    criarAtendimentos() {
        const sql = 'CREATE TABLE if not exists Atendimentos(\
            id int NOT NULL AUTO_INCREMENT PRIMARY KEY,\
            cliente varchar(11) NOT NULL,\
            pet varchar(20),\
            servico varchar(20) NOT NULL,\
            `data` datetime NOT NULL,\
            dataCriacao datetime NOT NULL,\
            status varchar(20) NOT NULL,\
            observacoes text);'
        this.conexao.query(sql, (erro) => {
            if (erro) {
                console.log(erro)
            }
            else {
                console.log('Tabela atedimentos criada com sucesso')
            }
        })
    }

    criarPets() {
        const query = 
        'CREATE TABLE IF NOT EXISTS pets(\
            id int not null auto_increment primary key,\
            nome varchar(50),\
            imagem varchar(200)\
        );'

        this.conexao.query(query, erro => {
            if(erro) {
                console.log(erro)

            }
            else{
                console.log('Tabela Pets criada com ucesso')
            }
        })
    }
}

module.exports = new Tabelas