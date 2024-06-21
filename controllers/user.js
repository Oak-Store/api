const {
  loadFile,
  saveJSON
} = require('../utils/files')

class UserController {

  getUsers(req, res) {
    try {

      const users = loadFile('users.json')

      return res.status(200).json(users)

    } catch (error) {
      return res.status(400).json({
        error: error.toString(),
        message: 'Ocorreu un error desconhecido'
      })
    }
  }

  addUser (req, res) {
    try {

      const body = req.body

      const users = loadFile('users.json')

      users.PiotAccounts = users.PiotAccounts ?? {};
      users.PiotAccounts[body.uid] = {
        name: body.name,
        email: body.email,
        password: body.password,
        profile_icon: body.profile_icon,
        uid: body.uid,
        dateBirth: body.dateBirth
      }

      saveJSON('users.json', users)

      return res.status(201).json(
        body
      )
    } catch (error) {
      return res.status(400).json({
        error: error.toString(),
        message: 'Ocorreu un error desconhecido'
      })
    }
  }

  getUser(req, res) {
    try {

      const userId = req.params.uid

      const users = loadFile('users.json')

      const user = users.PiotAccounts[userId];

      if (!user) {
        return res.status(404).json({
          message: 'Usuario não existe'
        })
      }

      return res.status(200).json(user)

    } catch (error) {
      return res.status(400).json({
        message: 'Ocorreu um erro desconhecido'
      })
    }
  }

}

module.exports = new UserController