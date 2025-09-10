const { User, Project, Device } = require("../../models");

exports.getListMyDevice = async (req, res) => {
  try {
    const userId = req.user.id; // dari JWT payload

    // Cari user + project yg dia punya akses
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Project,
          as: "projects",
          include: [
            {
              model: Device,
              as: "devices",
              attributes: ["uuid", "name", "serialNumber"],
            },
          ],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Kumpulkan semua device dari project yg di-assign
    const devices = [];
    user.projects.forEach((project) => {
      project.devices.forEach((device) => {
        devices.push({
          projectUuid: project.uuid,
          projectName: project.name,
          ...device.toJSON(),
        });
      });
    });

    res.json(devices);
  } catch (err) {
    console.error("Error getListMyDevice:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
