const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const path = require('path')
// подключаем роуты
const todoRoutes = require('./routes/todos')

// если есть системная переменная с портом
const PORT = process.env.PORT || 3000

const app = express()
const uri =
  'mongodb+srv://fnaticshy:123456qwe@cluster-fns-ropdc.mongodb.net/todos'

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
})

// передаем шаблонизатор в движок
app.engine('hbs', hbs.engine)
// по умолчанию будем использовать handlebars
app.set('view engine', 'hbs')
// регистрируем папку c шаблонами
app.set('views', 'views')
// создаем статический путь
app.use(express.static(path.join(__dirname, 'public')))
// добавляем возможность считывать body из запросов
app.use(express.urlencoded({ extended: true }))
// добавляем роуты
app.use(todoRoutes)

async function start() {
  try {
    // конектимся к базе
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useFindAndModify: false,
    })
    // запускаем зервер
    // если сервер запущен, вызываем колбек
    app.listen(PORT, () => {
      console.log('Server has been started...')
    })
  } catch (error) {
    console.log(error)
  }
}

start()
