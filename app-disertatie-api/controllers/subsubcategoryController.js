const SubSubCategory = require("../models/subsubcategory");

getSubSubCategories = async (req, res) => {
  try {
    const subsubcategories = await SubSubCategory.find();
    !subsubcategories.length
      ? res.status(402).json({
          success: false,
          error: "There are no subsubcategories to display",
        })
      : res.status(200).json({ success: true, data: subsubcategories });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err,
      message: "Cannot display subsubcategories",
    });
  }
};

addSubSubCategory = async (req, res) => {
  try {
    const body = req.body;
    if (body !== null) {
      const subsubcategory = new SubSubCategory(body);
      await subsubcategory.save();
      return res.status(201).json({
        success: true,
        id: subsubcategory._id,
        addedSubSubCategory: subsubcategory,
        message: "Subsubcategory created!",
      });
    } else {
      throw new Error("You must introduce subsubcategory information");
    }
  } catch (error) {
    return res.status(400).json({
      errorMessage: error.message,
      error,
      message: "Subsubcategory could not be created!",
    });
  }
};

updateSubSubCategory = async (req, res) => {
  try {
    const body = req.body;
    const subsubcategory = await SubSubCategory.findOne({ _id: req.params.id });
    if (body !== null) {
      Object.assign(subsubcategory, body);
      await subsubcategory.save();
      return res.status(200).json({
        success: true,
        id: subsubcategory._id,
        editedSubSubCategory: subsubcategory,
        message: "Subsubcategory updated!",
      });
    } else {
      throw new Error("You must introduce subsubcategory information");
    }
  } catch (error) {
    return res.status(404).json({
      errorMessage: error.message,
      error,
      message: "Could not update subsubcategory!",
    });
  }
};

module.exports = {
  getSubSubCategories,
  addSubSubCategory,
  updateSubSubCategory,
};
