const announcementRoutes = require("express").Router()
const { announcement } = require("../db/models")

announcementRoutes.get("/", async (req,res) => {
    try {
        const allAnnounc = await announcement.findAll()
        res.status(200).json(allAnnounc)
    }catch(err){
        res.status(400).json({ message: error });
    }
})

module.exports = announcementRoutes;

