const {
  loadFile,
  saveJSON
} = require('../utils/files')

class ProjectController {

  getProjects(req, res) {
    try {

      const projects = loadFile('projects.json')

      return res.status(200).json(projects)

    } catch (error) {
      return res.status(400).json({
        message: 'Ocorreu un error desconhecido.'
      })
    }
  }

  getProject(req, res) {
    try {

      const projectUID = req.params.uid

      const projects = loadFile('projects.json')

      const projectData = projects.Projects[projectUID]

      if (!projectData) {
        return res.status(400).json({
          message: 'Projeto não encontrado'
        })
      }

      return res.status(200).json(projectData)

    } catch (error) {
      return res.status(400).json({
        message: 'Ocorreu un error desconhecido.'
      })
    }
  }

  newProject(req, res) {
    try {

      const body = req.body;

      const projects = loadFile('projects.json')

      projects.Projects = projects.Projects ?? {}

      projects.Projects[body.projectUID] = {
        projectName: body.projectName,
        projectPackage: body.projectPackage,
        projectUID: body.projectUID,
        projectURL: body.projectURL,
        projectOwner: body.projectOwner
      }

      saveJSON('projects.json', projects)

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

module.exports = new ProjectController