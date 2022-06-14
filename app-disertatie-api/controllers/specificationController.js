const Specification = require("../models/specification");

getSpecifications = async (req, res) => {
  try {
    const specifications = await Specification.find({});
    !specifications.length
      ? res.status(402).json({
          success: false,
          error: "There are no specifications to display",
        })
      : res.status(200).json({ success: true, data: specifications });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err,
      message: "Cannot display specifications",
    });
  }
};

addSpecification = async (req, res) => {
  try {
    const body = req.body;
    if (body !== null) {
      const specification = new Specification(body);
      await specification.save();
      return res.status(201).json({
        success: true,
        id: specification._id,
        addedSpecification: specification,
        message: "Specification created!",
      });
    } else {
      throw new Error("You must introduce specification information");
    }
  } catch (error) {
    return res.status(400).json({
      errorMessage: error.message,
      error,
      message: "Specification could not be created!",
    });
  }
};

updateSpecification = async (req, res) => {
  try {
    const body = req.body;
    const specification = await Specification.findOne({ _id: req.params.id });
    if (body !== null) {
      Object.assign(specification, body);
      await specification.save();
      return res.status(200).json({
        success: true,
        id: specification._id,
        editedSpecification: specification,
        message: "Specification updated!",
      });
    } else {
      throw new Error("You must introduce specification information");
    }
  } catch (error) {
    return res.status(404).json({
      errorMessage: error.message,
      error,
      message: "Could not update specification!",
    });
  }
};

module.exports = {
  getSpecifications,
  addSpecification,
  updateSpecification,
};
