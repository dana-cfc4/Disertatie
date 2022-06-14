const SubCategory = require("../models/subcategory");

getSubCategories = async (req, res) => {
  try {
    const subcategories = await SubCategory.find();
    !subcategories.length
      ? res
          .status(402)
          .json({
            success: false,
            error: "There are no subcategories to display",
          })
      : res.status(200).json({ success: true, data: subcategories });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err,
      message: "Cannot display subcategories",
    });
  }
};

addSubCategory = async (req, res) => {
  try {
    const body = req.body;
    if (body !== null) {
      const subcategory = new SubCategory(body);
      await subcategory.save();
      return res.status(201).json({
        success: true,
        id: subcategory._id,
        addedSubCategory: subcategory,
        message: "Subcategory created!",
      });
    } else {
      throw new Error("You must introduce subcategory information");
    }
  } catch (error) {
    return res.status(400).json({
      errorMessage: error.message,
      error,
      message: "Subcategory could not be created!",
    });
  }
};

updateSubCategory = async (req, res) => {
  try {
    const body = req.body;
    const subcategory = await SubCategory.findOne({ _id: req.params.id });
    if (body !== null) {
      Object.assign(subcategory, body);
      await subcategory.save();
      return res.status(200).json({
        success: true,
        id: subcategory._id,
        editedSubCategory: subcategory,
        message: "Subcategory updated!",
      });
    } else {
      throw new Error("You must introduce subcategory information");
    }
  } catch (error) {
    return res.status(404).json({
      errorMessage: error.message,
      error,
      message: "Could not update subcategory!",
    });
  }
};

module.exports = {
  getSubCategories,
  addSubCategory,
  updateSubCategory,
};
