const fs = require('fs')
const path = require('path');
module.exports = (caminho, nomeDoArquivo, callbackImagemCriada) => {
    const tiposValidos = ['jpg', 'png', 'jpeg', 'gif']
    const tipo = path.extname(caminho)
    const tipoEhValido = tiposValidos.indexOf(tipo.substring(1)) !== -1
    const novoCaminho = `../../assets/imagens/${nomeDoArquivo}${tipo}`
   //const novoCaminho = `./assets/imagens/${nomeDoArquivo}`
   if(!tipoEhValido){
       const erro = "Tipo é invalido"
       console.log('Erro! Tipo inválido')
       callbackImagemCriada(erro)
   }
   else{
     fs.createReadStream(caminho)
        .pipe(fs.createWriteStream(novoCaminho))
        .on('finish', () => callbackImagemCriada(false, novoCaminho))
   }
   
}