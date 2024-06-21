const {
  loadFile,
  saveJSON
} = require('../utils/files')

class appController {

  getapps(req, res) {
    try {

      const apps = loadFile('apps.json')

      return res.status(200).json(apps)

    } catch (error) {
      return res.status(400).json({
        message: 'Ocorreu un error desconhecido.'
      })
    }
  }

  getapp(req, res) {
    try {

      const appUID = req.params.uid

      const apps = loadFile('apps.json')

      const appData = apps.apps[appUID]

      if (!appData) {
        return res.status(400).json({
          message: 'Projeto não encontrado'
        })
      }

      return res.status(200).json(appData)

    } catch (error) {
      return res.status(400).json({
        message: 'Ocorreu un error desconhecido.'
      })
    }
  }

  newapp(req, res) {
    try {

      const body = req.body;

      const apps = loadFile('apps.json')

      apps.apps = apps.apps ?? {}

      apps.apps[body.appUID] = {
        appName: body.appName,
        appPackage: body.appPackage,
        appUID: body.appUID,
        appURL: body.appURL,
        appOwner: body.appOwner
      }

      saveJSON('apps.json', apps)

      return res.status(201).json(
        body
      )
    } catch (error) {
      return res.status(400).json({
        message: 'Ocorreu um erro ao add usuário'
      })
    }
  }

}

module.exports = new appController