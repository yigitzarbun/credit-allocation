const customersModel = require("./customers-model");

const customerUnique = async (req, res, next) => {
  const { landing_id } = req.body;
  const customerExists = await customersModel.getByFilter({ landing_id });
  if (customerExists) {
    res.status(400).json({ message: "Yeni müşteri kaydı bulunmamaktadır" });
  } else {
    next();
  }
};
module.exports = { customerUnique };
