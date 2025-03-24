const Post = require("../modules/Posts")

//C
const addPost = async (req, res) => {
    const { title, body } = req.body
    if (!title || !body)
        return res.status(400).json({ message: "Error! title and body are required" })
    const newPost = await Post.create({ title, body })
    res.json(newPost)
}

//R (id)
const getById = async (req, res) => {
    const { id } = req.params
    const returnPost = await Post.findById(id).lean()
    if (!returnPost)
        return res.status(400).json({ message: "Error! post not found" })
    res.json(returnPost)
}

//R (all)
const getAll = async (req, res) => {
    const allPosts = await Post.find().lean()
    if (!allPosts.length)
        return res.status(200).json({ message: "Error! no post" })
    res.json(allPosts)
}

//U (id)
const updatePost = async (req, res) => {
    const { id } = req.params
    const { title, body } = req.body
    if (!title && !body)
        return res.status(400).json({ message: "Error! title or body are required" })
    const returnPost = await Post.findById(id)
    if (!returnPost)
        return res.status(404).json({ message: "Error! post not found" })
    returnPost.title = title
    returnPost.body = body
    const updatedPost = await returnPost.save()
    res.json(`${updatedPost.title} updated`)
}

//D (id)
const deleteById = async (req, res) => {
    const { id } = req.params
    const deletePost = await Post.findById(id).exec()
    if (!deletePost)
        return res.status(404).json({ message: "Error! post not found" })
    const result = await deletePost.deleteOne()
    res.json(`${result.title} deleted`)
}

module.exports = { addPost, getById, getAll, updatePost, deleteById }