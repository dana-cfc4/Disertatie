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
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../styles.css";
import DisplayRatings from "./DisplayRatings";

const ShoppingCart = () => {
  const auth = useAuth();
  const dispatch = useDispatch();

  const selectProducts = (state) => state.products;
  const { products } = useSelector(selectProducts);

  const selectBrand = (state) => state.brands;
  const { brands } = useSelector(selectBrand);

  const [quantity, setQuantity] = useState({});
  const changeQuantity = (event, idProdus, culoare) => {
    const currentCart = [...getCurrentCart()];
    currentCart.map((cart) => {
      const produs = cart.produse.find(
        (produs) => produs.idProdus === idProdus && produs.culoare === culoare
      );
      if (produs) {
        produs.cantitate = event.target.value;
      }
    });
    if (auth) {
      dispatch(
        editCart(
          `http://localhost:8080/shoppingCart/${currentCart[0]._id}`,
          currentCart[0]
        )
      );
    } else {
      dispatch(editCartNoUser(currentCart));
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
      (auth &&
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
    if (auth) {
      const favoriteWithUser = {
        idProdus: product,
        idUtilizator: auth._id,
      };
      dispatch(
        addFavorite("http://localhost:8080/favorites", favoriteWithUser)
      );
    } else {
      const favorite = {
        idProdus: product,
      };
      dispatch(addFavoriteNoUser(favorite));
    }
  };

  const deleteNewFavoriteNoUser = (product) => {
    if (auth) {
      const fav = favorites.find(
        (favorite) =>
          favorite.idProdus === product && favorite.idUtilizator === auth._id
      );
      dispatch(
        deleteFavorite(`http://localhost:8080/favorites/${fav._id}`, fav)
      );
    } else {
      const favorite = {
        idProdus: product,
      };
      dispatch(deleteFavoriteNoUser(favorite));
    }
  };

  const getProductInCartImage = (productInCart) => {
    const product = products.find(
      (product) => product._id === productInCart.idProdus
    );
    if (product) {
      const colorSample = product.culoriDisponibile.find(
        (culoare) => Object.keys(culoare)[0] === productInCart.culoare
      );
      const imagine = product.imagini.find(
        (imagine) => Object.keys(imagine)[0] === Object.values(colorSample)[0]
      );
      return Object.values(imagine)[0][0];
    }
  };

  const getBrand = (productInCart) => {
    const product = products.find(
      (product) => product._id === productInCart.idProdus
    );
    if (product) {
      const brand = brands.find((brand) => brand._id === product.idBrand);
      if (brand) return brand.nume;
    }
    return "";
  };

  const getCartContent = () => {
    let nrProducts = 0;
    let valoareCos = 0;
    if (auth && auth._id) {
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

  const getCurrentCart = () => {
    if (auth) {
      return carts.filter((cart) => cart.idUtilizator === auth._id);
    } else return currentSessionCarts;
  };

  const getCurrentProduct = (produsInCart) => {
    const product = products.find(
      (product) => product._id === produsInCart.idProdus
    );
    if (product) return product;
    else return {};
  };

  const deleteProductFromCart = (idProdus, culoare) => {
    const currentCart = [...getCurrentCart()];
    currentCart.map((cart) => {
      cart.produse = cart.produse.filter(
        (produs) => produs.idProdus !== idProdus || produs.culoare !== culoare
      );
    });
    if (auth) {
      dispatch(
        editCart(
          `http://localhost:8080/shoppingCart/${currentCart[0]._id}`,
          currentCart[0]
        )
      );
    } else {
      dispatch(editCartNoUser(currentCart));
    }
  };

  const [promoCode, setPromoCode] = useState("");
  const [promoCodeFinal, setPromoCodeFinal] = useState("nue");

  const changePromoCode = (event) => {
    setPromoCode(event.target.value);
  };

  const aplicaCodPromotional = () => {
    if (promoCode !== "dana") setPromoCodeFinal("nueok");
    else setPromoCodeFinal("eok");
  };

  const getCostLivrare = () => {
    if (getCartContent()[1] > 200)
      return 0
    else return 15
  }

  const getDiscount = () => {
    if (promoCodeFinal === 'eok')
      return (0.1 * (getCartContent()[1] + getCostLivrare())).toFixed(2)
    else return 0
  }

  const getValoareTotala = () => {
return getCartContent()[1] + getCostLivrare() - getDiscount()
  }

  useEffect(() => {
    dispatch(setProducts("http://localhost:8080/products"));
    dispatch(setRatings("http://localhost:8080/ratings"));
    dispatch(setBrands("http://localhost:8080/brands"));
    dispatch(setFavorites("http://localhost:8080/favorites"));
    dispatch(setCarts("http://localhost:8080/shoppingCart"));
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
          Coșul meu
        </Typography>
        <Grid sx={{ marginLeft: "20px", marginTop: "30px" }}>
          {getCurrentCart().length > 0 &&
          getCurrentCart()[0].produse.length > 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                // justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                    width: "50%",
                  marginRight: '15%'
                }}
              >
                {getCurrentCart()[0].produse.map((produsInCart, index) => {
                  return (
                    <div key={produsInCart._id} style={{ textAlign: "left" }}>
                      <Box
                        sx={{
                          bgcolor: "#ffffff",
                          height: "fit-content",
                        }}
                      >
                        <Card
                          sx={{
                            display: "flex",
                            paddingBottom: "15px",
                            paddingTop: "15px",
                          }}
                        >
                          <CardActionArea
                            as={Link}
                            to={`/produse/${produsInCart.idProdus}`}
                            sx={{ width: "fit-content" }}
                          >
                            <CardMedia
                              component="img"
                              sx={{ width: 151 }}
                              image={getProductInCartImage(produsInCart)}
                              alt="product image"
                            />
                          </CardActionArea>
                          <Box
                            sx={{ display: "flex", flexDirection: "column" }}
                          >
                            <CardContent
                              sx={{ flex: "1 0 auto", textAlign: "left" }}
                            >
                              <Typography
                                variant="subtitle1"
                                color="text.secondary"
                                component="div"
                                sx={{ textAlign: "left" }}
                              >
                                {getBrand(produsInCart)}
                              </Typography>
                              <Typography
                                component="div"
                                variant="h6"
                                as={Link}
                                to={`/produse/${produsInCart.idProdus}`}
                                sx={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                              >
                                {getCurrentProduct(produsInCart)
                                  ? getCurrentProduct(produsInCart).denumire
                                  : ""}
                              </Typography>
                              <Typography
                                sx={{
                                  textAlign: "left",
                                  marginTop: "20px",
                                  fontWeight: "800",
                                }}
                              >
                                {getCurrentProduct(produsInCart)
                                  ? getCurrentProduct(produsInCart).pret
                                  : ""}{" "}
                                lei
                              </Typography>
                              <Typography sx={{ textAlign: "left" }}>
                                Culoare: {produsInCart.culoare}
                              </Typography>
                              <TextField
                                sx={{
                                  width: "85px",
                                  marginTop: "18px",
                                  marginLeft: "150px",
                                }}
                                id="outlined-number"
                                size="small"
                                label="Cantitate"
                                type="number"
                                value={produsInCart.cantitate}
                                onChange={(event) =>
                                  changeQuantity(
                                    event,
                                    produsInCart.idProdus,
                                    produsInCart.culoare
                                  )
                                }
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                            </CardContent>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              {getFavProductModal(produsInCart.idProdus) ===
                              "isFav" ? (
                                <Button
                                  sx={{ width: "fit-content" }}
                                  type="text"
                                  onClick={() =>
                                    deleteNewFavoriteNoUser(
                                      produsInCart.idProdus
                                    )
                                  }
                                >
                                  Sterge de la favorite
                                </Button>
                              ) : (
                                <Button
                                  sx={{ width: "fit-content" }}
                                  type="text"
                                  onClick={() =>
                                    addNewFavoriteNoUser(produsInCart.idProdus)
                                  }
                                >
                                  Adauga la favorite
                                </Button>
                              )}
                              <Typography>|</Typography>
                              <Button
                                sx={{ width: "fit-content" }}
                                type="text"
                                onClick={() =>
                                  deleteProductFromCart(
                                    produsInCart.idProdus,
                                    produsInCart.culoare
                                  )
                                }
                              >
                                Elimina din cos
                              </Button>
                            </div>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                pl: 1,
                                pb: 1,
                              }}
                            ></Box>
                          </Box>
                        </Card>
                      </Box>
                      <Divider sx={{ width: "50%" }} />
                    </div>
                  );
                })}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginRight: "100px",
                }}
              >
                <Card sx={{ minWidth: 280 }}>
                  <CardContent sx={{ textAlign: "left", minWidth: 280 }}>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "25px",
                        marginBottom: "10px",
                      }}
                      component="div"
                    >
                      Sumar comanda
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        sx={{ marginTop: "20px" }}
                        variant="h6"
                        component="div"
                      >
                        Cost produse:
                      </Typography>
                      <Typography
                        sx={{
                          marginTop: "15px",
                          fontWeight: 700,
                          marginBottom: "8px",
                        }}
                        variant="h6"
                        component="div"
                      >
                        {getCartContent()[1]} lei
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        sx={{ marginTop: "15px" }}
                        variant="h6"
                        component="div"
                      >
                        Cost livrare:
                      </Typography>
                      <Typography
                        sx={{
                          marginTop: "15px",
                          fontWeight: 700,
                          marginBottom: "8px",
                        }}
                        variant="h6"
                        component="div"
                      >
                        {getCostLivrare()} lei
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        sx={{ marginTop: "15px" }}
                        variant="h6"
                        component="div"
                      >
                        Discount:
                      </Typography>
                      <Typography
                        sx={{
                          marginTop: "15px",
                          fontWeight: 700,
                          marginBottom: "15px",
                        }}
                        variant="h6"
                        component="div"
                      >
                        {getDiscount()} lei
                      </Typography>
                      </div>
                      <Divider/>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        sx={{ marginTop: "15px", fontWeight: 700 }}
                        variant="h6"
                        component="div"
                      >
                        Valoare totala:
                      </Typography>
                      <Typography
                        sx={{
                          marginTop: "15px",
                          fontWeight: 700,
                          marginBottom: "12px",
                        }}
                        variant="h6"
                        component="div"
                      >
                        {getValoareTotala()} lei
                      </Typography>
                    </div>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button component={Link} to={"/finalizarecomanda"}>
                      Finalizeaza comanda
                    </Button>
                  </CardActions>
                </Card>

                <Card sx={{ minWidth: 280, marginTop: "40px" }}>
                  <CardContent>
                    <TextField
                      label="Cod promotional"
                      type="text"
                      variant="standard"
                      value={promoCode}
                      onChange={changePromoCode}
                    />
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button onClick={aplicaCodPromotional}>
                      Aplica cod promotional
                    </Button>
                  </CardActions>
                  {promoCodeFinal !== "eok" && promoCodeFinal !== 'nue' ? (
                    <Typography sx={{ color: "red" }}>
                      Acest cod promotional nu exista
                    </Typography>
                  ) : null}
                </Card>

                <Card sx={{ minWidth: 280, marginTop: "40px" }}>
                  <CardContent sx={{textAlign: 'left'}}>
                    <Typography sx={{marginBottom: '18px', fontWeight: 700, fontSize: '20px'}} component="div">
                      Ai nevoie de asistenta?
                    </Typography>
                      <Typography sx={{ marginBottom: '7px', fontSize: '19px' }} component="div">
                      0723629223
                    </Typography>
                      <Typography sx={{ fontSize: '19px' }} component="div">
                     dabeauty@gmail.com
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <Typography sx={{ fontSize: "25px", padding: "30px" }}>
              Nu ai produse in cos
            </Typography>
          )}
        </Grid>
      </Grid>
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

export default ShoppingCart;
