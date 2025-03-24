const express = require("express")
const router = express.Router()

const Todo = require("../Controllers/TodoController")

router.post("/", Todo.addTodo)              //C
router.get("/:id", Todo.getById)            //R (id)
router.get("/", Todo.getAll)                //R (all)
router.put("/:id", Todo.updateTodo)         //U
router.put("/updateComplete/:id", Todo.updateTodoComplete) //U
router.delete("/:id", Todo.deleteById)      //D (id)

module.exports = router
