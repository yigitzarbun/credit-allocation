const usersModel = require("./users-model");

const userUnique = async (req, res, next) => {
  const { email } = req.body;
  const userExists = await usersModel.findByFilter({ email });
  if (userExists) {
    res.status(400).json({ message: "Kullanıcı zaten mevcut" });
  } else {
    next();
  }
};
const infoExists = (req, res, next) => {
  const { fname, lname, email, role_name } = req.body;
  const roles = ["analyst", "admin"];
  if (!fname || !lname || !email || !role_name || !roles.includes(role_name)) {
    res.status(400).json({ message: "Gerekli bilgiler eksik" });
  } else {
    next();
  }
};

const loginCredentialsExist = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Gerekli bilgiler eksik" });
  } else {
    next();
  }
};

module.exports = { userUnique, infoExists, loginCredentialsExist };
