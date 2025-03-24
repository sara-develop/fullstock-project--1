const Todo = require("../modules/Todos")

//C
const addTodo = async (req, res) => {
    const { title, tags, completed } = req.body
    if (!title)
        return res.status(400).json({ message: "Error! title is required" })
    const newTodo = await Todo.create({ title, ...(tags && { tags }), ...(completed && { completed }) })
    res.json(newTodo)
}

//R (id)
const getById = async (req, res) => {
    const { id } = req.params
    const returnTodo = await Todo.findById(id).lean()
    if (!returnTodo)
        return res.status(404).json({ message: "Error! Todo not found" })
    res.json(returnTodo)
}

//R (all)
const getAll = async (req, res) => {
    const allTodos = await Todo.find().lean()
    if (!allTodos.length)
        return res.status(200).json({ message: "No todos found" })
    res.json(allTodos)
}

//U (id)
const updateTodo = async (req, res) => {
    const { id } = req.params
    const { title, tags, completed } = req.body
    if (!title)
        return res.status(400).json({ message: "Error! title is required" })
    const returnTodo = await Todo.findById(id).exec()
    if (!returnTodo)
        return res.status(404).json({ message: "Error! Todo not found" })
    returnTodo.title = title
    if (tags)
        returnTodo.tags = tags
    if (completed)
        returnTodo.completed = completed
    const updatedTodo = await returnTodo.save()
    res.json(`${updatedTodo.title} updated`)
}

//U (id)
const updateTodoComplete = async (req, res) => {
    const { id } = req.params
    const todo = await Todo.findById(id).exec()
    if (!todo)
        return res.status(400).json({ message: 'Todo not found' })
    todo.completed = !todo.completed
    const updatedTodo = await todo.save()
    res.json(`'${updatedTodo.title}' updated`)
}

//D (id)
const deleteById = async (req, res) => {
    const { id } = req.params
    const deleteTodo = await Todo.findById(id).exec()
    if (!deleteTodo)
        return res.status(404).json({ message: "Error! Todo not found" })
    const deletedTodo = await deleteTodo.deleteOne()
    res.json(`${deletedTodo.title} deleted`)
}

module.exports = { addTodo, getById, getAll, updateTodo, updateTodoComplete, deleteById }
