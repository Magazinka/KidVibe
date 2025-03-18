const linkRoutes = require("express").Router()
const { link } = require("../db/models")

linkRoutes.get("/", async (req,res) => {
    try {
        const allLinks = await link.findAll()
        console.log("Alllinks: ",allLinks);
        
        res.status(200).json(allLinks)
    }catch(err){
        res.status(400).json({ message: err})
    }
})

module.exports = linkRoutes;
