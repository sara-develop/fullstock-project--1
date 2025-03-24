const express = require("express")
const router = express.Router()

const User = require("../Controllers/UserController")

router.post("/", User.addUser)          //C
router.get("/:id", User.getById)        //R (id)
router.get("/", User.getAll)            //R (all)
router.put("/:id", User.updateUser)     //U
router.delete("/:id", User.deleteById)  //D (id)

module.exports = router
