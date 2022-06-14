const Brand = require("../models/brand");

getBrands = async (req, res) => {
  try {
    const brands = await Brand.find({});
    !brands.length
      ? res
          .status(402)
          .json({ success: false, error: "There are no brands to display" })
      : res.status(200).json({ success: true, data: brands });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err,
      message: "Cannot display brands",
    });
  }
};

addBrand = async (req, res) => {
  try {
    const body = req.body;
    if (body !== null) {
      const brand = new Brand(body);
      await brand.save();
      return res.status(201).json({
        success: true,
        id: brand._id,
        addedBrand: brand,
        message: "Brand created!",
      });
    } else {
      throw new Error("You must introduce brand information");
    }
  } catch (error) {
    return res.status(400).json({
      errorMessage: error.message,
      error,
      message: "Brand could not be created!",
    });
  }
};

updateBrand = async (req, res) => {
  try {
    const body = req.body;
    const brand = await Brand.findOne({ _id: req.params.id });
    if (body !== null) {
      Object.assign(brand, body);
      await brand.save();
      return res.status(200).json({
        success: true,
        id: brand._id,
        editedBrand: brand,
        message: "Brand updated!",
      });
    } else {
      throw new Error("You must introduce brand information");
    }
  } catch (error) {
    return res.status(404).json({
      errorMessage: error.message,
      error,
      message: "Could not update brand!",
    });
  }
};

module.exports = {
  getBrands,
  addBrand,
  updateBrand,
};
