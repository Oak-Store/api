const fs = require('fs')
const path = require('path')

module.exports.existFolder = (folder) => {
  return new Promise((resolve, reject) => {
    const folderPath = process.cwd() + `/${folder}`
    if (fs.existsSync(folderPath)) {
      resolve('Folder exist'); return
    }
    try {
      fs.mkdirSync(folderPath, {
        recursive: true
      });
      resolve(`Created folder: ${folder}`)
    } catch (error) {
      reject(`Error ao criar pasta ${folder}`)
    }
  })
}

module.exports.createFilesNotExist = (file) => {
  try {
    
    const filePath = process.cwd() + `/database/${file}`

    const exist = fs.existsSync(filePath)
    if (exist) return
    fs.writeFileSync(
      filePath, JSON.stringify({}, null, 2)
    );
  } catch (error) {
    throw new Error(
      'Falha ao criar arquivo JSON, Error: ', error
    )
  }
}

module.exports.loadFile = (file) => {
  try {
    const filePath = process.cwd() + `/database/${file}`

    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
  } catch (error) {
    throw new Error(`Error ao carregar arquivo ${file}, error: ${error}`)
  }
}

module.exports.saveJSON = (file, data) => {
  try {
    const filePath = process.cwd() +`/database/${file}`

    fs.writeFileSync(
      filePath, JSON.stringify(data, null, 2)
    );
  } catch (error) {
    throw new Error('Ocorreu um error ao salvar dados')
  }
}