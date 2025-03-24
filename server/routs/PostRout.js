const express = require("express")
const router = express.Router()

const Post = require("../Controllers/PostController")

router.post("/", Post.addPost)          //C
router.get("/:id", Post.getById)        //R (id)
router.get("/", Post.getAll)            //R (all)
router.put("/:id", Post.updatePost)        //U
router.delete("/:id", Post.deleteById)  //D (id)

module.exports = router
