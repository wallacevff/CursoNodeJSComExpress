const fs = require('fs')

fs.readFile('./assets/takashi.jpg', (erro, buffer) => {
    console.log('Imagem bufferizada')
   //console.log(buffer)

    fs.writeFile('./assets/t.jpg', buffer, (erro) => {
        console.log('imagem foi escrita')
    })
})