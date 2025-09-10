// controllers/observationController.js
const { Gnss } = require("../../models");

exports.getAll = async (req, res) => {
  try {
    const data = await Gnss.findAll({ order: [["datetime", "ASC"]] });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const obs = await Gnss.findByPk(req.params.id);
    if (!obs) return res.status(404).json({ message: "Not found" });
    res.json(obs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLast = async (req, res) => {
  try {
    const data = await Gnss.findOne({
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
    const data = await Gnss.findAll({
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
