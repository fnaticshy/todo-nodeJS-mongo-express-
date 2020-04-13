const { Router } = require('express')
const router = Router()
const Todo = require('../models/Todo')

// для обработки get запросов
router.get('/', async (req, res) => {
    const todos = await Todo.find({}).lean()

    // рендерим index.hbs
    res.render('index', {
        title: 'Todos list',
        // передаем флаг для выделения активной ссылки
        isIndex: true,
        todos
    })
})

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create todo',
        isCreate: true
    })
})

// обрабатываем post запрос
router.post('/create', async (req, res) => {
    const todo = new Todo({
        // забираем title из запроса
        title: req.body.title
    })

    await todo.save()

    res.redirect('/')
})

router.post('/complete', async (req, res) => {
    const todo = await Todo.findById(req.body.id)

    todo.completed = !!req.body.completed
    await todo.save()

    res.redirect('/')
})

module.exports = router