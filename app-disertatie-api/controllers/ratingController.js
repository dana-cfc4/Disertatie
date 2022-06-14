const Rating = require("../models/rating");

getRatings = async (req, res) => {
  try {
    const ratings = await Rating.find({});
    !ratings.length
      ? res
          .status(402)
          .json({ success: false, message: "There are no ratings to display" })
      : res.status(200).json({ success: true, data: ratings });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err,
      message: "Could not display ratings",
    });
  }
};

addRating = async (req, res) => {
  try {
    const body = req.body;
    if (body !== null) {
      const rating = new Rating(body);

      await rating.save();
      return res.status(201).json({
        success: true,
        id: rating._id,
        addedRating: rating,
        message: "Rating created!",
      });
    } else {
      throw new Error("You must provide rating information");
    }
  } catch (error) {
    return res.status(400).json({
      errorMessage: error.message,
      error,
      message: "Rating could not be created!",
    });
  }
};

updateRating = async (req, res) => {
  try {
    const body = req.body;
    const rating = await Rating.findOne({ _id: req.params.id });
    if (body !== null) {
      Object.assign(rating, body);
      await rating.save();
      return res.status(200).json({
        success: true,
        id: rating._id,
        editedRating: rating,
        message: "Rating updated!",
      });
    } else {
      throw new Error("You must provide rating information");
    }
  } catch (error) {
    return res.status(404).json({
      errorMessage: error.message,
      error,
      message: "Rating update did not succeed!",
    });
  }
};

deleteRating = async (req, res) => {
  try {
    const rating = await Rating.findOneAndDelete({ _id: req.params.id });
    return res.status(200).json({ success: true, data: rating });
  } catch (err) {
    return res.status(404).json({
      errorMessage: error.message,
      error,
      message: "Rating deletion did not succeed!",
    });
  }
};
module.exports = {
  getRatings,
  addRating,
  updateRating,
  deleteRating,
};
