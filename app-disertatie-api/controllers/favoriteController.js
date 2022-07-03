const Favorite = require("../models/favorite");

getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({});
    !favorites.length
      ? res
          .status(402)
          .json({ success: false, message: "There are no favorites to display" })
      : res.status(200).json({ success: true, data: favorites });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err,
      message: "Could not display favorites",
    });
  }
};

addFavorite = async (req, res) => {
  try {
    const body = req.body;
    if (body !== null) {
      const favorite = new Favorite(body);
      
      await favorite.save();
      return res.status(201).json({
        success: true,
        id: favorite._id,
        addedFavorite: favorite,
        message: "Favorite created!",
      });
    } else {
      throw new Error("You must provide favorite information");
    }
  } catch (error) {
    return res.status(400).json({
      errorMessage: error.message,
      error,
      message: "Favorite could not be created!",
    });
  }
};

deleteFavorite = async (req, res) => {
  try {
    const favorite = await Favorite.findOneAndDelete({ _id: req.params.id });
    return res.status(200).json({ success: true, data: favorite });
  } catch (err) {
    return res.status(404).json({
      errorMessage: error.message,
      error,
      message: "Favorite deletion did not succeed!",
    });
  }
};
module.exports = {
  getFavorites,
  addFavorite,
  deleteFavorite,
};
