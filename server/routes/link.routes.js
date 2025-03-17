const linkRoutes = require("express").Router()
const { link } = require("../db/models")

linkRoutes.get("/link", async (req,res) => {
    try {
        const allLinks = await link.findAll()
        res.status(200).json(allLinks)
    }catch(err){
        res.status(400).json({ message: err})
    }
})

module.exports = linkRoutes;
