import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../Utils/context";
import { setProducts } from "../store/actions/products";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import RatingsPage from "./RatingsPage";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ListItemText from "@mui/material/ListItemText";
import ImageGallery from "react-image-gallery";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { months } from "../constant";
import {
  addRating,
  editRating,
  deleteRating,
  setRatings,
} from "../store/actions/ratings";

const MyReviews = () => {
  const auth = useAuth();
  const dispatch = useDispatch();

  const selectRatings = (state) => state.ratings;
  const { ratings } = useSelector(selectRatings);

  const currentRatings = () => {
    return ratings.filter(rating => rating.idUtilizator === auth?._id)
  }

  const getCorrectFormatOfDate = (date) => {
    const dateConverted = new Date(date);
    const day = dateConverted.getDate().toString();
    const correctDay = day.length === 1 ? "0" + day : day;
    const month = dateConverted.getMonth().toString();
    const correctMonth = months[month];
    const year = dateConverted.getFullYear();
    return correctDay + " " + correctMonth.slice(0, 3) + ". " + year;
  };

  const [displayAddReview, setDisplayAddReview] = useState(false);
  const [ratingToEdit, setRatingToEdit] = useState("");
  const [currentProduct, setCurrentProduct] = useState("");

  const sendRating = () => {
    setDisplayAddReview(false);
    setRatingToEdit("");
  };

  const displayEditModal = (rating) => {
    setRatingToEdit(rating);
    setDisplayAddReview(true);
  };

  const goToEditMode = (rating, product) => {
    displayEditModal(rating);
    setCurrentProduct(product)
  };

  const selectProducts = (state) => state.products;
  const { products } = useSelector(selectProducts);

  const deleteCurrentRating = (rating) => {
    dispatch(
      deleteRating(`http://localhost:8080/ratings/${rating._id}`, rating)
    );
  };

  const getProduct = (id) => {
    return products.find(prod => prod._id === id)
  }

  const hideAddReview = () => {
    setDisplayAddReview(false);
    setRatingToEdit("");
  };

  useEffect(() => {
    dispatch(setProducts("http://localhost:8080/products"));
    dispatch(setRatings("http://localhost:8080/ratings"));
  }, []);

  return (
    <Grid sx={firstDivStyle}>
      <Typography
        sx={{
          fontWeight: "700",
          fontSize: "30px",
          marginTop: "30px",
          marginLeft: "40px",
          textAlign: "left",
        }}
      >
        Recenziile mele
      </Typography>
      <Grid sx={{ marginLeft: "20px", marginTop: "30px" }}>
        <List
          sx={{
            marginTop: "15px",
          }}
        >
          {currentRatings().length > 0 ? (
            currentRatings().map((rating) => (
              <Box
                // display="flex"
                justifyContent="center"
                alignItems="center"
                key={rating._id} style={{ display: 'inline-flex', flexDirection: 'row', width: '50%' }}
              >
                <Card
                  sx={{
                    width: 350,
                    border: "none",
                    boxShadow: "none",
                    marginTop: "10px",
                    marginRight: "20px",
                  }}
                >
                  <CardActionArea as={Link} to={`/produse/${getProduct(rating.idProdus)._id}`}>
                    <CardMedia
                      component="img"
                      height="340"
                      image={Object.values(getProduct(rating.idProdus).imagini[0])[0][0]}
                      alt={getProduct(rating.idProdus).denumire}
                      style={{
                        display: "inline - block",
                        position: "relative",
                        cursor: "pointer",
                      }}
                    />
                  </CardActionArea>
                  <CardActionArea
                    as={Link}
                    to={`/produse/${getProduct(rating.idProdus)._id}`}
                    sx={{ textDecoration: "none", color: "black" }}
                  >
                    <CardContent
                      sx={{ textAlign: "justify", marginLeft: "7px" }}
                    >
                      <Typography sx={{ fontSize: "16px" }}>
                        {getProduct(rating.idProdus).denumire}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
                <ListItem sx={{ paddingLeft: "0px" }} alignItems="flex-start">
                  <ListItemText sx={{ alignSelf: 'center' }}
                    primary={
                      <div>
                        <Rating
                          name="read-only"
                          value={rating.rating}
                          precision={0.5}
                          readOnly
                          size="large"
                          sx={{ color: "#485165", marginRight: "10px" }}
                        />
                        <Typography
                          sx={{ fontSize: "14px" }}
                        >{`${getCorrectFormatOfDate(rating.data)}`}</Typography>
                      </div>
                    }
                    secondary={
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          marginTop: "7px",
                        }}
                      >
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <Typography
                            sx={{ textAlign: "justify", marginLeft: "5px" }}
                          >
                            {rating.comentariu}
                          </Typography>
                          {auth && auth._id === rating.idUtilizator ? (
                            <div
                              style={{ display: "flex", flexDirection: "row" }}
                            >
                              <Button
                                variant="text"
                                sx={{
                                  color: "rgb(46, 59, 85)",
                                  fontWeight: "750",
                                }}
                                onClick={() => goToEditMode(rating, getProduct(rating.idProdus))}
                              >
                                Editează
                              </Button>
                              <Button
                                variant="text"
                                sx={{
                                  color: "rgb(46, 59, 85)",
                                  marginLeft: "20px",
                                  fontWeight: "750",
                                }}
                                onClick={() => deleteCurrentRating(rating)}
                              >
                                Șterge
                              </Button>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    }
                  />
                </ListItem>
              </Box>
            ))
          ) : (
            <Typography sx={{ fontSize: '25px' }}>Nu ai acordat nicio recenzie</Typography>
          )}
        </List>
      </Grid>
      <Modal
        sx={{ overflow: "scroll" }}
        open={displayAddReview}
        onClose={hideAddReview}
      >
        <Box sx={boxStyle}>
          <RatingsPage
            currentProduct={currentProduct}
            sendRating={sendRating}
            ratingToEdit={ratingToEdit}
          />
        </Box>
      </Modal>
    </Grid>
  );
};

const firstDivStyle = {
  "@media (min-width: 2100px)": {
    width: "65%",
    margin: "auto",
  },
};

const boxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  border: "1.5px solid #000",
  boxShadow: 24,
  p: 4,
  "@media (min-width: 2100px)": {
    width: "45%",
  },
};

export default MyReviews;
