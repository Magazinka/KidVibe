const signupEvent = require("express").Router();
const { userEvent } = require("../db/models");

signupEvent.post("/", async (req, res) => {
    try {
        const {user_id, event_id} = req.body
    } catch (error) {
        console.log('error: ', error);
        
    }
});

module.exports = signupEvent