// controllers/observationController.js
const { WaterLevel, Device } = require("../../models");
const { Op } = require("sequelize");

exports.getAll = async (req, res) => {
  try {
    const data = await WaterLevel.findAll({ order: [["datetime", "ASC"]] });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const obs = await WaterLevel.findByPk(req.params.id);
    if (!obs) return res.status(404).json({ message: "Not found" });
    res.json(obs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLast = async (req, res) => {
  try {
    const { deviceUuid } = req.params;

    // cek dulu apakah device dengan UUID tsb ada
    const device = await Device.findOne({
      where: { uuid: deviceUuid },
      attributes: ["id", "uuid", "name"],
    });

    if (!device) {
      return res.status(404).json({
        status: "error",
        message: `Device with UUID ${uuid} not found`,
      });
    }
    const data = await WaterLevel.findOne({
      where: { deviceId: device.id },
      attributes: ["timestamp", "value"],
      include: [
        {
          model: Device,
          as: "device",
          attributes: ["uuid", "name"],
        },
      ],
      order: [["timestamp", "DESC"]],
    });
    res.json(data || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRange = async (req, res) => {
  try {
    const { deviceUuid } = req.params;
    const { start, end } = req.query;

    // cek device berdasarkan UUID
    const device = await Device.findOne({
      where: { uuid: deviceUuid },
      attributes: ["id", "uuid", "name"],
    });

    if (!device) {
      return res.status(404).json({
        status: "error",
        message: `Device with UUID ${deviceUuid} not found`,
      });
    }

    const data = await WaterLevel.findAll({
      where: {
        deviceId: device.id,
        timestamp: { [Op.between]: [new Date(start), new Date(end)] },
      },
      attributes: ["timestamp", "value"],
      include: [
        {
          model: Device,
          as: "device",
          attributes: ["uuid", "name"],
        },
      ],
      order: [["timestamp", "ASC"]],
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
