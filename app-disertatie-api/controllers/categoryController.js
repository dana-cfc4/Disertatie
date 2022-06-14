const Category = require("../models/category");

getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    !categories.length
      ? res
          .status(402)
          .json({ success: false, error: "There are no categories to display" })
      : res.status(200).json({ success: true, data: categories });
  } catch (err) {
    return res
      .status(400)
      .json({
        success: false,
        error: err,
        message: "Cannot display categories",
      });
  }
};

addCategory = async (req, res) => {
  try {
    const body = req.body;
    if (body !== null) {
      const category = new Category(body);
      await category.save();
      return res.status(201).json({
        success: true,
        id: category._id,
        addedCategory: category,
        message: "Category created!",
      });
    } else {
      throw new Error("You must introduce category information");
    }
  } catch (error) {
    return res.status(400).json({
      errorMessage: error.message,
      error,
      message: "Category could not be created!",
    });
  }
};

updateCategory = async (req, res) => {
  try {
    const body = req.body;
    const category = await Category.findOne({ _id: req.params.id });
    if (body !== null) {
      Object.assign(category, body);
      await category.save();
      return res.status(200).json({
        success: true,
        id: category._id,
        editedCategory: category,
        message: "Category updated!",
      });
    } else {
      throw new Error("You must introduce category information");
    }
  } catch (error) {
    return res.status(404).json({
      errorMessage: error.message,
      error,
      message: "Could not update category!",
    });
  }
};

module.exports = {
  getCategories,
  addCategory,
  updateCategory,
};
