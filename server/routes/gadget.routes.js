const gadgetRoutes = require("express").Router()
const { gadget } = require("../db/models")

gadgetRoutes.get("/", async (req,res) => {
    try {
        const allGadget = await gadget.findAll()
        res.status(200).json(allGadget)
    }catch(err){
        res.status(400).json({ message: error });
    }
})

module.exports = gadgetRoutes;