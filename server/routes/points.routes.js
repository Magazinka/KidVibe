const pointRoutes = require("express").Router()
const { MapPoint } = require("../db/models")

pointRoutes.get('/points', async (req, res) => {
    try {
      const points = await MapPoint.findAll();
      res.json(points);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

pointRoutes.get('/saved-points', async (req, res) => {
    try {
        const points = await SavedPoint.findAll();
        res.json(points);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

pointRoutes.post('/map/save-point', async (req, res) => {
    try {
      const savedPoint = await SavedPoint.create(req.body);
      res.status(201).json(savedPoint);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
});





module.exports = pointRoutes;
