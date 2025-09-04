// controllers/observationController.js
const { Observation } = require("../../models");

exports.getAll = async (req, res) => {
  try {
    const data = await Observation.findAll({ order: [["datetime", "ASC"]] });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const obs = await Observation.findByPk(req.params.id);
    if (!obs) return res.status(404).json({ message: "Not found" });
    res.json(obs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const obs = await Observation.create(req.body);
    res.status(201).json(obs);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
