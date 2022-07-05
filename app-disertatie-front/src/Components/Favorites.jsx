import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../Utils/context";
import { setProducts } from "../store/actions/products";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import SortIcon from "@mui/icons-material/Sort";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Container from "@mui/material/Container";
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
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { setBrands } from "../store/actions/brands";
import RatingsPage from "./RatingsPage";
import {
  addFavorite,
  setFavorites,
  deleteFavorite,
  addFavoriteNoUser,
  setFavoritesNoUser,
  deleteFavoriteNoUser,
} from "../store/actions/favorites";
import {
  addCart,
  setCarts,
  deleteCart,
  editCart,
  addCartNoUser,
  setCartsNoUser,
  editCartNoUser,
  deleteCartNoUser,
} from "../store/actions/shoppingCarts";
import {
  addRating,
  editRating,
  deleteRating,
  setRatings,
} from "../store/actions/ratings";
import { setUsers } from "../store/actions/users";
import "react-image-gallery/styles/css/image-gallery.css";
import "../styles.css";
import DisplayRatings from "./DisplayRatings";

const Favorites = () => {
  const auth = useAuth();
  const dispatch = useDispatch();

  const selectProducts = (state) => state.products;
  const { products } = useSelector(selectProducts);

  const selectBrand = (state) => state.brands;
  const { brands } = useSelector(selectBrand);

  const selectRatings = (state) => state.ratings;
  const { ratings } = useSelector(selectRatings);

  const [quantity, setQuantity] = useState(1);
  const changeQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const selectColor = (color) => {
    if (selectedColor)
      document.getElementById(Object.keys(selectedColor)[0]).style.border =
        "0px solid black";
    document.getElementById(Object.keys(color)[0]).style.border =
      "1.5px solid black";
    setSelectedColor(color);
  };

  const [idProductInCart, setIdProductInCart] = useState("");
  const [colorProductInCart, setColorProductInCart] = useState("");

  const adaugaInCos = (product, color) => {
    if (quantity > 0) {
      let produs = {};
      produs["idProdus"] = product._id;
      produs["culoare"] = Object.keys(color)[0];
      produs["cantitate"] = quantity;

      if (auth && auth._id && carts) {
        const currentUserCart = carts.find(
          (cart) => cart.idUtilizator === auth._id
        );
        if (currentUserCart) {
          let produseToAdd = [];
          let currentProduct = currentUserCart.produse.find(
            (produs) =>
              produs.idProdus === product._id &&
              produs.culoare === Object.keys(color)[0]
          );

          if (currentProduct) {
            currentProduct["cantitate"] =
              parseInt(currentProduct["cantitate"]) + parseInt(quantity);

            let filteredProducts = currentUserCart.produse.filter(
              (produs) =>
                produs.idProdus !== currentProduct.idProdus ||
                produs.culoare !== currentProduct.culoare
            );
            filteredProducts.push(currentProduct);
            produseToAdd = filteredProducts.map((product) => product);
          } else {
            produseToAdd = [...currentUserCart.produse, produs];
          }
          const cartOfUser = {
            produse: produseToAdd,
            idUtilizator: auth._id,
          };
          dispatch(
            editCart(
              `https://backend-r4zkv.ondigitalocean.app/shoppingCart/${currentUserCart._id}`,
              cartOfUser
            )
          );
          handleCloseQuickViewModal();
          setOpenMiniCartModal(true);
        } else {
          let produseToAdd = [];
          produseToAdd.push(produs);

          const cartOfUser = {
            produse: produseToAdd,
            idUtilizator: auth._id,
          };
          dispatch(addCart("https://backend-r4zkv.ondigitalocean.app/shoppingCart", cartOfUser));
          handleCloseQuickViewModal();
          setOpenMiniCartModal(true);
        }
      } else {
        if (currentSessionCarts && currentSessionCarts.length === 1) {
          let produseToAdd = [];
          let currentProduct = currentSessionCarts[0].produse.find(
            (produs) =>
              produs.idProdus === product._id &&
              produs.culoare === Object.keys(color)[0]
          );

          if (currentProduct) {
            currentProduct["cantitate"] =
              parseInt(currentProduct["cantitate"]) + parseInt(quantity);

            let filteredProducts = currentSessionCarts[0].produse.filter(
              (produs) =>
                produs.idProdus !== currentProduct.idProdus ||
                produs.culoare !== currentProduct.culoare
            );
            filteredProducts.push(currentProduct);
            produseToAdd = filteredProducts.map((product) => product);
          } else {
            produseToAdd = [...currentSessionCarts[0].produse, produs];
          }
          const cartOfUser = [
            {
              produse: produseToAdd,
            },
          ];
          dispatch(editCartNoUser(cartOfUser));
          handleCloseQuickViewModal();
          setOpenMiniCartModal(true);
        } else {
          let produseToAdd = [];
          produseToAdd.push(produs);

          const cartOfUser = {
            produse: produseToAdd,
          };
          dispatch(addCartNoUser(cartOfUser));
          handleCloseQuickViewModal();
          setOpenMiniCartModal(true);
        }
      }
      setIdProductInCart(product._id);
      setColorProductInCart(color);
    }
  };

  const selectFavoriteNoUser = (state) =>
    state.favorites.currentSessionFavorites;
  const currentSessionFavorites = useSelector(selectFavoriteNoUser);

  const selectFavorites = (state) => state.favorites;
  const { favorites } = useSelector(selectFavorites);

  const selectCartNoUser = (state) => state.shoppingCarts.currentSessionCarts;
  const currentSessionCarts = useSelector(selectCartNoUser);

  const selectCarts = (state) => state.shoppingCarts;
  const { carts } = useSelector(selectCarts);

  const getFavProductModal = (product) => {
    if (
      (auth && auth._id &&
        favorites
          .filter((fav) => fav.idUtilizator === auth._id)
          .map((favorite) => favorite.idProdus)
          .includes(product)) ||
      (!auth &&
        currentSessionFavorites
          .map((favorite) => favorite.idProdus)
          .includes(product))
    )
      return "isFav";
    else return "isNotFav";
  };

  const addNewFavoriteNoUser = (product) => {
    if (auth && auth._id) {
      const favoriteWithUser = {
        idProdus: product,
        idUtilizator: auth._id,
      };
      dispatch(
        addFavorite("https://backend-r4zkv.ondigitalocean.app/favorites", favoriteWithUser)
      );
    } else {
      const favorite = {
        idProdus: product,
      };
      dispatch(addFavoriteNoUser(favorite));
    }
  };

  const deleteNewFavoriteNoUser = (product) => {
    if (auth && auth._id) {
      const fav = favorites.find(
        (favorite) =>
          favorite.idProdus === product && favorite.idUtilizator === auth._id
      );
      dispatch(
        deleteFavorite(`https://backend-r4zkv.ondigitalocean.app/favorites/${fav._id}`, fav)
      );
    } else {
      const favorite = {
        idProdus: product,
      };
      dispatch(deleteFavoriteNoUser(favorite));
    }
  };

  const getTextWidth = (tagText) => {
    let text = document.createElement("span");
    document.body.appendChild(text);
    text.style.fontSize = 18 + "px";
    text.innerHTML = tagText;

    const width = Math.ceil(text.offsetWidth) + 20;
    const formattedWidth = width + "px";

    document.body.removeChild(text);
    return formattedWidth;
  };

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

  const getTagAvatar = (product) => {
    if (
      product.taguri.filter((tag) => Object.keys(tag).includes("Bestseller"))
        .length > 0
    )
      return (
        <Avatar
          sx={{
            width: `${getTextWidth("Bestseller")}`,
            height: "32px",
            backgroundColor: "#485165",
          }}
          variant="rounded"
        >
          <Typography sx={{ fontSize: "18px" }}>Bestseller</Typography>
        </Avatar>
      );
    else if (
      product.taguri.filter((tag) => Object.keys(tag).includes("New")).length > 0
    )
      return (
        <Avatar
          sx={{
            width: `${getTextWidth("New")}`,
            height: "32px",
            backgroundColor: "#485165",
          }}
          variant="rounded"
        >
          <Typography sx={{ fontSize: "18px" }}>New</Typography>
        </Avatar>
      );
    else return "";
  };

  const getProductInCartImage = () => {
    const product = products.find((product) => product._id === idProductInCart);
    if (product) {
      const imagine = product.imagini.find(
        (imagine) =>
          Object.keys(imagine)[0] === Object.values(colorProductInCart)[0]
      );
      return Object.values(imagine)[0][0];
    }
  };

  const getBrand = (idProdus) => {
    const product = products.find((product) => product._id === idProdus);
    if (product) {
      const brand = brands.find((brand) => brand._id === product.idBrand);
      if (brand) return brand.nume;
    }
    return "";
  };

  const getCartContent = () => {
    let nrProducts = 0;
    let valoareCos = 0;
    if (auth && auth._id && carts) {
      let currentUserCarts = carts.find(
        (cart) => cart.idUtilizator === auth._id
      );
      if (currentUserCarts)
        currentUserCarts.produse.map((produs) => {
          nrProducts += parseInt(produs.cantitate);
          products
            .filter((product) => product._id === produs.idProdus)
            .map((product) => {
              valoareCos += parseInt(product.pret) * parseInt(produs.cantitate);
            });
        });
    } else if (currentSessionCarts.length === 1) {
      currentSessionCarts[0].produse.map((produs) => {
        nrProducts += parseInt(produs.cantitate);
        products
          .filter((product) => product._id === produs.idProdus)
          .map((product) => {
            valoareCos += parseInt(product.pret) * parseInt(produs.cantitate);
          });
      });
    }
    return [nrProducts, valoareCos];
  };

  const getCurrentFavorites = () => {
    if (auth) {
      return favorites.filter((favorite) => favorite.idUtilizator === auth._id);
    } else return currentSessionFavorites;
  };

  const getCurrentProduct = (produsId) => {
    const product = products.find((product) => product._id === produsId);
    if (product) return product;
    else return {};
  };

  const getFavProduct = (productId) => {
    return (
      <IconButton
        aria-label="add to favorites"
        sx={{ alignItems: "flex-end" }}
        onClick={() => deleteNewFavoriteNoUser(productId)}
      >
        <FavoriteIcon sx={{ color: "red" }} fontSize="large" />
      </IconButton>
    );
  }

  const [openQuickViewModal, setOpenQuickViewModal] = useState(false);
  const handleCloseQuickViewModal = () => {
    setOpenQuickViewModal(false);
  };

  const [openMiniCartModal, setOpenMiniCartModal] = useState(false);
  const handleCloseMiniCartModal = () => {
    setOpenMiniCartModal(false);
  };

  const [idForModal, setIdForModal] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const quicklook = (product) => {
    setQuantity(1);
    setIdForModal(product._id);
    setSelectedColor(product.culoriDisponibile[0]);
    setOpenQuickViewModal(true);
  };

  useEffect(() => {
    dispatch(setProducts("https://backend-r4zkv.ondigitalocean.app/products"));
    dispatch(setRatings("https://backend-r4zkv.ondigitalocean.app/ratings"));
    dispatch(setBrands("https://backend-r4zkv.ondigitalocean.app/brands"));
    dispatch(setFavorites("https://backend-r4zkv.ondigitalocean.app/favorites"));
    dispatch(setCarts("https://backend-r4zkv.ondigitalocean.app/shoppingCart"));
  }, []);

  return (
    <>
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
          Favoritele mele
        </Typography>
        <Grid sx={{ marginLeft: "20px", marginTop: "30px" }}>
          {getCurrentFavorites().length > 0 ? (
            <>
              {getCurrentFavorites().map((favorit) => {
                return (
                  <div key={favorit.idProdus} style={{ textAlign: "left" }}>
                    <Box
                      sx={{
                        bgcolor: "#ffffff",
                        height: "fit-content",
                      }}
                    >
                      <Card
                        sx={{
                          display: "flex",
                          width: "100%",
                          paddingBottom: "15px",
                          paddingTop: "15px",
                        }}
                      >
                        <CardActionArea
                          as={Link}
                          to={`/produse/${favorit.idProdus}`}
                          sx={{ width: "fit-content" }}
                        >
                          <CardMedia
                            component="img"
                            sx={{ width: 151 }}
                            image={
                              Object.values(
                                getCurrentProduct(favorit.idProdus).imagini[0]
                              )[0][0]
                            }
                            alt="product image"
                          />
                        </CardActionArea>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                          }}
                        >
                          <CardContent
                            sx={{
                              flex: "1 0 auto",
                              textAlign: "left",
                              width: "100%",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <Typography
                                  variant="subtitle1"
                                  color="text.secondary"
                                  component="div"
                                  sx={{ textAlign: "left" }}
                                >
                                  {getBrand(favorit.idProdus)}
                                </Typography>
                                <Typography
                                  component="div"
                                  variant="h6"
                                  as={Link}
                                  to={`/produse/${favorit.idProdus}`}
                                  sx={{
                                    textDecoration: "none",
                                    color: "black",
                                  }}
                                >
                                  {getCurrentProduct(favorit.idProdus)
                                    ? getCurrentProduct(favorit.idProdus)
                                      .denumire
                                    : ""}
                                </Typography>
                                <Typography
                                  sx={{
                                    textAlign: "left",
                                    marginTop: "20px",
                                    fontWeight: "800",
                                  }}
                                >
                                  {getCurrentProduct(favorit.idProdus)
                                    ? getCurrentProduct(favorit.idProdus).pret
                                    : ""}{" "}
                                  lei
                                </Typography>
                                <Typography
                                  sx={{ textAlign: "left" }}
                                ></Typography>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  marginRight: "15%",
                                  height: "fit-content",
                                  alignSelf: "center",
                                }}
                              >
                                <Button
                                  variant="contained"
                                  onClick={() => quicklook(getCurrentProduct(favorit.idProdus))}
                                  sx={{
                                    background: "#CF112C",
                                    width: "fit-content",
                                    height: "fit-content",
                                    alignSelf: "center",
                                    marginRight: "25px",
                                    "&:hover": {
                                      background: "#e2030f",
                                    },
                                  }}
                                >
                                  Adauga in cos
                                </Button>
                                {getFavProduct(favorit.idProdus)}
                              </div>
                            </div>
                          </CardContent>
                        </Box>
                      </Card>
                    </Box>
                    <Divider sx={{ width: "100%" }} />
                  </div>
                );
              })}
            </>
          ) : (
            <Typography sx={{ fontSize: "25px", padding: "30px" }}>
              Nu ai produse favorite
            </Typography>
          )}
        </Grid>
      </Grid>
      <Modal
        sx={{ overflow: "scroll" }}
        open={openQuickViewModal}
        onClose={handleCloseQuickViewModal}
      >
        <Box sx={boxStyle}>
          <Grid container>
            {products
              .filter((product) => product._id === idForModal)
              .map((product) => (
                <Grid key={product._id} sx={gridStyleModal}>
                  <Grid item xs={"auto"} sx={{ textAlign: "-webkit-center" }}>
                    <Card
                      sx={{
                        width: 320,
                        border: "none",
                        boxShadow: "none",
                      }}
                    >
                      <CardHeader avatar={getTagAvatar(product)} />
                      <CardMedia
                        component="img"
                        height="340"
                        image={
                          Object.values(
                            product.imagini.find(
                              (imagine) =>
                                Object.keys(imagine)[0] ===
                                Object.values(selectedColor)[0]
                            )
                          )[0][0]
                        }
                        alt={product.denumire}
                        style={{
                          display: "inline - block",
                          position: "relative",
                          cursor: "pointer",
                        }}
                      />
                      <CardContent
                        sx={{ textAlign: "justify", marginLeft: "7px" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            marginTop: "7px",
                            marginBottom: "5px",
                          }}
                        >
                          <Rating
                            name="read-only"
                            value={parseFloat(getProductRating(product))}
                            precision={0.5}
                            readOnly
                            sx={{ color: "#485165", marginRight: "10px" }}
                          />
                          <Typography>
                            {
                              ratings.filter(
                                (review) => review.idProdus === product._id
                              ).length
                            }{" "}
                            {ratings.filter(
                              (review) => review.idProdus === product._id
                            ).length === 1
                              ? "recenzie"
                              : "recenzii"}
                          </Typography>
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid
                    item
                    xs={9}
                    sx={{ marginLeft: "15px", alignSelf: "center" }}
                  >
                    <Typography sx={{ fontWeight: "700", fontSize: "23px" }}>
                      {brands.length > 0
                        ? brands.filter(
                          (brand) => brand._id === product.idBrand
                        )[0].nume
                        : null}
                    </Typography>
                    <Typography sx={{ fontSize: "20px" }}>
                      {product.denumire}
                    </Typography>
                    <br />
                    <Typography>{product.descriere}</Typography>
                    <br />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "baseline",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "790",
                          fontSize: "20px",
                          marginRight: "5px",
                        }}
                      >
                        Preț:
                      </Typography>
                      <Typography>{product.pret} lei</Typography>
                    </div>
                    <br />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "baseline",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "790",
                          fontSize: "20px",
                          marginRight: "5px",
                        }}
                      >
                        Culoare:
                      </Typography>
                      <Typography>{Object.keys(selectedColor)[0]}</Typography>
                    </div>
                    <br />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      {product.culoriDisponibile.map((culoare, i) => (
                        <Avatar
                          key={Object.keys(culoare)[0]}
                          id={Object.keys(culoare)[0]}
                          sx={{
                            marginRight: "12px",
                            border:
                              selectedColor === product.culoriDisponibile[0] &&
                                i === 0
                                ? "1.5px solid black"
                                : null,
                          }}
                          alt="Not available"
                          src={Object.values(culoare)[0]}
                          onClick={() => selectColor(culoare)}
                        />
                      ))}
                    </div>
                    <br />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginRight: "10px",
                        justifyContent: "right",
                      }}
                    >
                      <TextField
                        sx={{ width: "85px" }}
                        id="outlined-number"
                        size="small"
                        label="Cantitate"
                        type="number"
                        onChange={changeQuantity}
                        value={quantity}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginLeft: "25px",
                        }}
                      >
                        <Button
                          variant="contained"
                          startIcon={<AddShoppingCartIcon />}
                          sx={{
                            marginBottom: "20px",
                            background: "#CF112C",
                            "&:hover": {
                              background: "#e2030f",
                            },
                          }}
                          onClick={() => adaugaInCos(product, selectedColor)}
                        >
                          Adaugă în coș
                        </Button>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Modal>
      <Modal
        sx={{ overflow: "scroll" }}
        open={openMiniCartModal}
        onClose={handleCloseMiniCartModal}
      >
        <Box sx={boxStyle}>
          <Typography
            sx={{ fontWeight: "780", textAlign: "center", fontSize: "20px" }}
          >
            Produsul a fost adăugat cu succes în coșul de cumpărături
          </Typography>
          <Divider />
          <Grid container sx={{ textAlign: "-webkit-center" }}>
            <Grid item xs={6}>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      variant="square"
                      sx={{ width: 130, height: "80%" }}
                      alt="imagine produs"
                      src={getProductInCartImage()}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Typography
                          sx={{ fontWeight: "750", marginTop: "6px" }}
                        >
                          {getBrand()}
                        </Typography>
                        <Typography>
                          {products.find(
                            (product) => product._id === idProductInCart
                          )
                            ? products.find(
                              (product) => product._id === idProductInCart
                            ).denumire
                            : ""}
                        </Typography>
                        <Typography sx={{ color: "#979797" }}>
                          Cantitate: {quantity}
                        </Typography>
                        <Typography sx={{ fontWeight: "800" }}>
                          {products.find(
                            (product) => product._id === idProductInCart
                          )
                            ? products.find(
                              (product) => product._id === idProductInCart
                            ).pret
                            : ""}{" "}
                          lei
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={6}>
              <Grid
                sx={{
                  fontSize: "18px",
                  marginTop: "19px",
                  textAlign: "center",
                }}
              >
                <strong>Subtotal coș</strong> ({getCartContent()[0]}{" "}
                {getCartContent()[0] === 1 ? "produs" : "produse"}):{" "}
                <strong>{getCartContent()[1]} lei</strong>
              </Grid>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "10px",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  component={Link}
                  to="/cosdecumparaturi"
                  sx={{
                    marginBottom: "15px",
                    background: "#CF112C",
                    width: "fit-content",
                    "&:hover": {
                      background: "#e2030f",
                    },
                  }}
                >
                  Vezi coșul de cumpărături
                </Button>
                <Button
                  variant="contained"
                  onClick={handleCloseMiniCartModal}
                  sx={buttonStyleFavs2}
                >
                  Continuă cumpărăturile
                </Button>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

const firstDivStyle = {
  "@media (min-width: 2100px)": {
    width: "65%",
    margin: "auto",
  },
};

const buttonStyleFavs = {
  color: "black",
  background: "white",
  border: "2px solid black",
  "&:hover": {
    background: "#FFFFFF80",
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

const gridStyleModal = {
  display: "flex",
  flexDirection: "row",
  alignItems: "space-between",
};

const buttonStyleFavs2 = {
  color: "black",
  background: "white",
  border: "2px solid black",
  "&:hover": {
    background: "#FFFFFF80",
  },
  width: "fit-content",
};
export default Favorites;
