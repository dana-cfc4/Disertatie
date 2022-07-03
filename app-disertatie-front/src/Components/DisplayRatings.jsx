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

const DisplayRatings = ({
  currentRatings,
  currentProduct,
  users,
  displayEditModal,
}) => {
  const ratings = currentRatings.filter(
    (currentRating) => currentRating.idProdus === currentProduct._id
  );

  const auth = useAuth();
  const params = useParams();
  const dispatch = useDispatch();

  const getCorrectFormatOfDate = (date) => {
    const dateConverted = new Date(date);
    const day = dateConverted.getDate().toString();
    const correctDay = day.length === 1 ? "0" + day : day;
    const month = dateConverted.getMonth().toString();
    const correctMonth = months[month];
    const year = dateConverted.getFullYear();
    return correctDay + " " + correctMonth.slice(0, 3) + ". " + year;
  };

  const findUtilizator = (id) => {
    const utilizator = users.find((user) => user._id === id);
    return utilizator
      ? `${utilizator.firstName} ${utilizator.lastName}`
      : "Utilizator anonim";
  };

  const goToEditMode = (rating) => {
    displayEditModal(rating);
  };

  const deleteCurrentRating = (rating) => {
    dispatch(
      deleteRating(`https://backend-r4zkv.ondigitalocean.app/ratings/${rating._id}`, rating)
    );
  };

  return (
    <>
      <List
        sx={{
          width: "fit-content",
          marginTop: "15px",
        }}
      >
        {ratings.length > 0 ? (
          ratings.map((rating) => (
            <div key={rating._id}>
              <ListItem sx={{ paddingLeft: "0px" }} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar>
                    {findUtilizator(rating.idUtilizator)
                      .split(" ")[0][0]
                      .toUpperCase()}
                    {findUtilizator(rating.idUtilizator)
                      .split(" ")[1][0]
                      .toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
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
                      <Typography
                        sx={{ display: "inline", minWidth: "fit-content" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {findUtilizator(rating.idUtilizator)}
                      </Typography>
                      &nbsp;&nbsp;
                      {"—"}
                      &nbsp;&nbsp;
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
                              onClick={() => goToEditMode(rating)}
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
              <Divider variant="inset" component="li" />
            </div>
          ))
        ) : (
          <Typography>Nu ai acordat nicio recenzie</Typography>
        )}
      </List>
    </>
  );
};

export default DisplayRatings;
