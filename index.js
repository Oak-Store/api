var express = require('express');
var app = express();

const fs = require('fs').promises;
const USERS_FILE_PATH = 'database/users.json';
const PROJECTS_FILE_PATH = 'database/projects.json';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

let users = {};
let projects = {};
loadUsersFromFile();
loadProjectsFromFile();

async function loadUsersFromFile() {
  try {
    const data = await fs.readFile(USERS_FILE_PATH);
    users = JSON.parse(data);
    console.log('Usuários carregados do arquivo.');
    console.log(users);
  } catch (error) {
    console.error('Erro ao carregar usuários do arquivo:', error);
  }
}

async function loadProjectsFromFile() {
  try {
    const data = await fs.readFile(PROJECTS_FILE_PATH);
    projects = JSON.parse(data);
    console.log('Projetos carregados do arquivo.');
    console.log(projects);
  } catch (error) {
    console.error('Erro ao carregar projetos do arquivo\n', error);
  }
}

async function saveUsersToFile() {
  try {
    await fs.writeFile(USERS_FILE_PATH, JSON.stringify(users, null, 2));
    console.log('Usuários salvos no arquivo.');
    console.log(users);
  } catch (error) {
    console.error('Erro ao salvar usuários no arquivo:', error);
  }
}

async function saveProjectsToFile() {
  try {
    await fs.writeFile(PROJECTS_FILE_PATH, JSON.stringify(projects, null, 2));
    console.log('Projetos salvos no arquivo.');
    console.log(projects);
  } catch (error) {
    console.error('Erro ao salvar projetos no arquivo:', error);
  }
}

app.post('/newuser', async (req, res) => {
  const newUser = req.body;
  const userId = newUser.uid;
  users.PiotAccounts = users.PiotAccounts || {};
  users.PiotAccounts[userId] = {
    name: newUser.name,
    email: newUser.email,
    password: newUser.password,
    profile_icon: newUser.profile_icon,
    uid: newUser.uid,
    dateBirth: newUser.dateBirth
  };
  await saveUsersToFile();
  res.status(201).json(newUser);
  console.log("New user: " + newUser);
});

app.post('/newproject', async (req, res) => {
  const newProject = req.body;
  const projectUID = newProject.projectUID;
  projects.Projects = projects.Projects || {};
  projects.Projects[projectUID] = {
    projectName: newProject.projectName,
    projectPackage: newProject.projectPackage,
    projectUID: newProject.projectUID,
    projectURL: newProject.projectURL,
    projectOwner: newProject.projectOwner
  };
  await saveProjectsToFile();
  res.status(201).json(newProject);
  console.log("New project: " + newProject);
});

app.get('/user/:uid', (req, res) => {
  const userId = req.params.uid;
  const user = users.PiotAccounts[userId];
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send('<b>Piot User</b> not found');
  }
});

app.get('/project/:uid', (req, res) => {
  const projectUID = req.params.uid;
  const projectData = projects.Projects[projectUID];
  if (projectData) {
    res.status(200).json(projectData);
  } else {
    res.status(404).send('<b>Piot Project</b> not found');
  }
});

app.get('/', function (req, res) {
  res.send('api home');
});

app.get('/users', function (req, res) {
  res.json(users);
});

app.get('/projects', function (req, res) {
  res.json(projects);
});

app.delete('/user/:uid', (req, res) => {
  const userId = req.params.uid;
  delete users.PiotAccounts[userId];
  saveUsersToFile();
  res.status(200).send('User deleted successfully');
});

app.listen(3000, function () {
  console.log('TrindadeAPI is running');
});

module.exports = app