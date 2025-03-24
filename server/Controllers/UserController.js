const User = require("../modules/User")

//C
const addUser = async (req, res) => {
    const { name, username, email, address, phone } = req.body
    if (!name || !username || !email || !address)
        return res.status(400).json({ message: "Error! name, username, email and address are required" })
    if (phone) {
        const newUser = await User.create({ name, username, email, address, phone })
        return res.json(newUser)
    }
    else {
        const newUser = await User.create({ name, username, email, address })
        return res.json(newUser)
    }
}

//R (id)
const getById = async (req, res) => {
    const { id } = req.params
    const returnUser = await User.findById(id).lean()
    if (!returnUser)
        return res.status(404).json({ message: "Error! User not found" })
    res.json(returnUser)
}

//R (all)
const getAll = async (req, res) => {
    const allUsers = await User.find().lean()
    if (!allUsers.length)
        return res.status(200).json({ message: "Error! no Users" })
    res.json(allUsers)
}

//U (id)
const updateUser = async (req, res) => {
    const { id } = req.params
    const { name, username, email, address, phone } = req.body
    if (!name || !username || !email || !address)
        return res.status(400).json({ message: "Error! name, username, email and address are required" })
    const returnUser = await User.findById(id)
    if (!returnUser)
        return res.status(404).json({ message: "Error! User not found" })
    returnUser.name = name
    returnUser.username = username
    returnUser.email = email
    returnUser.address = address
    if (phone)
        returnUser.phone = phone
    const updatedUser = await returnUser.save()
    res.json(`${updatedUser.name} updated`)
}
//D (id)
const deleteById = async (req, res) => {
    const { id } = req.params
    const deleteUser = await User.findById(id).exec()
    if (!deleteUser)
        return res.status(404).json({ message: "Error! User not found" })
    const deletedUser = await deleteUser.deleteOne()
    res.json(`${deletedUser.name} deleted`)
}

module.exports = { addUser, getById, getAll, updateUser, deleteById }
