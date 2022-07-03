import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import {
  addRating,
  editRating,
  deleteRating,
  setRatings,
} from "../store/actions/ratings";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../Utils/context";

const RatingsPage = ({ currentProduct, sendRating, ratingToEdit }) => {
  const auth = useAuth();
  const dispatch = useDispatch();

  const [recenzie, setRecenzie] = useState(ratingToEdit ? ratingToEdit.comentariu : "");

  const changeRecenzie = (event) => {
    setRecenzie(event.target.value);
  };

  const selectRatings = (state) => state.ratings;
  const { ratings } = useSelector(selectRatings);

  const [givenRating, setGivenRating] = useState(ratingToEdit ? ratingToEdit.rating : 3);

  const getProductRating = (product) => {
    let ratingProdus = 0;
    ratings
      .filter((review) => review.idProdus === product._id)
      .map((review) => {
        ratingProdus += review.rating;
      });
    if (getNrReviews(product) > 0)
      return (ratingProdus / getNrReviews(product)).toFixed(1);
    else return 0
  };

  const getNrReviews = (product) => {
    const nrReviewsProduct = ratings.filter(
      (review) => review.idProdus === product._id
    ).length;
    return nrReviewsProduct;
  };

  const addNewReview = () => {
    if (auth && auth._id) {
      const review = {
        idProdus: currentProduct._id,
        comentariu: recenzie,
        idUtilizator: auth._id,
        rating: parseInt(givenRating),
        data: new Date(),
      };
      dispatch(addRating("https://backend-r4zkv.ondigitalocean.app/ratings", review));
    } else {
      const review = {
        idProdus: currentProduct._id,
        comentariu: recenzie,
        rating: parseInt(givenRating),
        data: new Date(),
      };
      dispatch(addRating("https://backend-r4zkv.ondigitalocean.app/ratings", review));
    }
    sendRating()
  };

  const cancelModal = () => {
    sendRating()
  }

  const editCurrentReview = () => {
    const review = {
      idProdus: currentProduct._id,
      comentariu: recenzie,
      rating: parseInt(givenRating),
      data: new Date(),
    };
    dispatch(
      editRating(
        `https://backend-r4zkv.ondigitalocean.app/ratings/${ratingToEdit._id}`,
        review
      )
    );
    sendRating()
  };


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: "22px",
          fontWeight: "780",
          marginBottom: "40px",
        }}
      >
        {ratingToEdit ? "Editează recenzia" : "Scrie o recenzie"}
      </Typography>
      <Rating
        size="large"
        value={givenRating}
        onChange={(event, newRating) => {
          setGivenRating(newRating);
        }}
        sx={{
          color: "#485165",
          marginRight: "10px",
          marginBottom: "15px",
        }}
      />
      <TextField
        sx={{ width: "30%", maxWidth: "350px" }}
        id="filled-multiline-flexible"
        multiline
        maxRows={4}
        value={recenzie}
        onChange={changeRecenzie}
      />
      <div style={{ display: "flex", flexDirection: "row" }}>
        {!ratingToEdit ? (
          <Button
            variant="text"
            sx={{
              color: "rgb(46, 59, 85)",
              marginLeft: "50%",
              marginTop: "5px",
              fontWeight: "750",
            }}
            onClick={addNewReview}
          >
            Salvează
          </Button>
        ) : (
          <Button
            variant="text"
            sx={{
              color: "rgb(46, 59, 85)",
              marginLeft: "50%",
              marginTop: "5px",
              fontWeight: "750",
            }}
            onClick={editCurrentReview}
          >
            Editează
          </Button>
        )}
        <Button
          variant="text"
          sx={{
            color: "rgb(46, 59, 85)",
            marginLeft: "20%",
            marginTop: "5px",
            fontWeight: "750",
          }}
          onClick={cancelModal}
        >
          Renunță
        </Button>
      </div>
    </div>
  );
};
export default RatingsPage;
