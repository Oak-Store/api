const express = require('express');
const cors = require('cors')
const helmet = require('helmet')
const errorHandler = require('./middlewares/error')

const routes = require('./routes')

const app = express();

const {
  createFilesNotExist,
  existFolder
} = require('./utils/files')

app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());

app.use(cors( {
  origin: '*'
}))
app.use(helmet())
app.use(errorHandler)
app.use(routes)

app.listen(process.env.PORT ?? 3000, async () => {
  try {
    await existFolder('database')
    createFilesNotExist('users.json')
    createFilesNotExist('projects.json')
    console.log('TrindadeAPI is running');
  } catch (error) {
    console.log('Error: ', error)
    
  }
})

module.exports = app