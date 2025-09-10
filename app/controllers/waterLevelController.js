// controllers/observationController.js
const { Wave } = require("../../models");

exports.getAll = async (req, res) => {
  try {
    const data = await Wave.findAll({ order: [["datetime", "ASC"]] });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const obs = await Wave.findByPk(req.params.id);
    if (!obs) return res.status(404).json({ message: "Not found" });
    res.json(obs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLast = async (req, res) => {
  try {
    const data = await Wave.findOne({
      where: { deviceId: req.params.deviceId },
      order: [["timestamp", "DESC"]],
    });
    res.json(data || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRange = async (req, res) => {
  try {
    const { start, end } = req.query;
    const data = await Wave.findAll({
      where: {
        deviceId: req.params.deviceId,
        timestamp: { [Op.between]: [start, end] },
      },
      order: [["timestamp", "ASC"]],
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
