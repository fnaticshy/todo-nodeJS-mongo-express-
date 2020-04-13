const { Schema, model } = require('mongoose')

// передаем конфигурацию
const schema = new Schema({
    // id задается по дефолту
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

// экспортируем модель
module.exports = model('Todo', schema)