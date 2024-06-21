var express = require('express');
var app = express();

const fs = require('fs').promises;
const USERS_FILE_PATH = 'database/users.json';
const PROJECTS_FILE_PATH = 'database/apps.json';

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

let users = [];
let apps = [];
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
    apps = JSON.parse(data);
    console.log('Projetos carregados do arquivo.');
    console.log(apps);
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
    await fs.writeFile(PROJECTS_FILE_PATH, JSON.stringify(apps, null, 2));
    console.log('Projetos salvos no arquivo.');
    console.log(apps);
  } catch (error) {
    console.error('Erro ao salvar projetos no arquivo:', error);
  }
}

app.post('/newuser', async (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  await saveUsersToFile();
  res.status(201).json(newUser);
  console.log("New user: " + newUser);
});

app.post('/newapp', async (req, res) => {
  const newProject = req.body;
  apps.push(newProject);
  await saveProjectsToFile();
  res.status(201).json(newProject);
  console.log("New app: " + newProject);
});

app.get('/user/:uid', (req, res) => {
  const userId = req.params.uid;
  const user = users.find(u => u.uid === userId);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send('<b>Piot User</b> not found');
  }
});

app.get('/app/:dev_name/:app_name', (req, res) => {
  const { dev_name, app_name } = req.params;
  const appData = apps.find(a => a.app_dev_name === dev_name && a.app_name === app_name);
  if (appData) {
    res.status(200).json(appData);
  } else {
    res.status(404).send('<b>Oak Project</b> not found');
  }
});

app.get('/', function (req, res) {
  res.send('api home');
});

app.get('/users', function (req, res) {
  res.json(users);
});

app.get('/apps', function (req, res) {
  res.json(apps);
});

app.delete('/user/:uid', async (req, res) => {
  const userId = req.params.uid;
  users = users.filter(u => u.uid !== userId);
  await saveUsersToFile();
  res.status(200).send('User deleted successfully');
});

app.listen(3000, function () {
  console.log('TrindadeAPI is running');
});

module.exports = app;