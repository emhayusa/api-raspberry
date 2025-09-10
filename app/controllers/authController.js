const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config");

const { User, Role } = require("../../models");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Cari user berdasarkan email, termasuk relasi ke Role
    const user = await User.findOne({
      where: { email },
      include: [{ model: Role }],
    });

    //console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Cek password
    const isPasswordValid = await bcrypt.compareSync(
      password,
      user.password_hash
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const roles = user.Roles ? user.Roles.map((r) => r.name) : ["user"];

    // Buat JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        //role: user.Role?.name || "user",
        roles,
      },
      config.secret,
      { expiresIn: "1h" }
    );
    // res.json({
    //   message: "Login successful",
    //   token,
    // });
    let authorities = [];
    user.getRoles().then(async (roles) => {
      for (let i = 0; i < roles.length; i++) {
        authorities.push("ROLE_" + roles[i].name.toUpperCase());
      }
      if (authorities.length > 0) {
        res.status(200).send({
          message: "Login successful",
          uuid: user.uuid,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
          //refreshToken: refreshToken,
        });
      } else {
        return res.status(401).send({
          accessToken: null,
          message: "Role not found",
        });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "email", "name"],
      include: [{ model: Role, attributes: ["name"] }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.Role?.name,
    });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving profile" });
  }
};
