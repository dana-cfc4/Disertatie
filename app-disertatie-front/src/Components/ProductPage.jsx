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
import Tooltip from "@mui/material/Tooltip";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import SortIcon from "@mui/icons-material/Sort";
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

const ProductPage = () => {
  const auth = useAuth();
  const params = useParams();
  const dispatch = useDispatch();

  const selectProducts = (state) => state.products;
  const { products } = useSelector(selectProducts);

  const currentProduct = products.find(
    (product) => product._id === params.idProdus
  );

  const selectSubSubCategories = (state) => state.subsubcategories;
  const { subsubcategories } = useSelector(selectSubSubCategories);

  const currentSubSubCategory = currentProduct
    ? subsubcategories.find(
        (subsubcategory) =>
          subsubcategory._id === currentProduct.idSubSubCategorie
      )
    : "";

  const selectSubCategories = (state) => state.subcategories;
  const { subcategories } = useSelector(selectSubCategories);

  const currentSubCategory = currentSubSubCategory
    ? subcategories.find(
        (subcategory) =>
          subcategory._id === currentSubSubCategory.idSubCategorie
      )
    : "";

  const selectCategories = (state) => state.categories;
  const { categories } = useSelector(selectCategories);

  const currentCategory = currentSubCategory
    ? categories.find(
        (category) => category._id === currentSubCategory.idCategorie
      )
    : "";

  const selectUsers = (state) => state.users;
  const { usersList } = useSelector(selectUsers);

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedColor2, setSelectedColor2] = useState("");

  let images = [];
  if (currentProduct) {
    if (selectedColor)
      currentProduct.imagini
        .filter(
          (imagine) =>
            Object.values(selectedColor)[0] === Object.keys(imagine)[0]
        )
        .map((imagine) => {
          Object.values(imagine)[0].map((img) => {
            let imageObj = {};
            imageObj["original"] = img;
            imageObj["thumbnail"] = img;
            images.push(imageObj);
          });
        });
    else
      currentProduct.imagini
        .filter(
          (imagine) =>
            Object.values(currentProduct.culoriDisponibile[0])[0] ===
            Object.keys(imagine)[0]
        )
        .map((imagine) => {
          Object.values(imagine)[0].map((img) => {
            let imageObj = {};
            imageObj["original"] = img;
            imageObj["thumbnail"] = img;
            images.push(imageObj);
          });
        });
  }
  const selectColor = (color) => {
    if (selectedColor)
      document.getElementById(Object.keys(selectedColor)[0]).style.border =
        "0px solid black";
    document.getElementById(Object.keys(color)[0]).style.border =
      "1.5px solid black";
    setSelectedColor(color);
  };
  const selectColor2 = (color) => {
    if (selectedColor2)
      document.getElementById(
        Object.keys(selectedColor2)[0] + "2"
      ).style.border = "0px solid black";
    document.getElementById(Object.keys(color)[0] + "2").style.border =
      "1.5px solid black";
    setSelectedColor2(color);
  };

  const selectBrand = (state) => state.brands;
  const { brands } = useSelector(selectBrand);

  const selectRatings = (state) => state.ratings;
  const { ratings } = useSelector(selectRatings);

  const getProductRating = (product) => {
    let ratingProdus = 0;
    ratings
      .filter((review) => review.idProdus === product._id)
      .map((review) => {
        ratingProdus += review.rating;
      });
    if (getNrReviews(product) > 0)
      return (ratingProdus / getNrReviews(product)).toFixed(1);
    else return 0;
  };

  const getNrReviews = (product) => {
    const nrReviewsProduct = ratings.filter(
      (review) => review.idProdus === product._id
    ).length;
    return nrReviewsProduct;
  };

  const [quantity, setQuantity] = useState(1);
  const changeQuantity = (event) => {
    setQuantity(event.target.value);
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

  const [idProductInCart, setIdProductInCart] = useState("");
  const [colorProductInCart, setColorProductInCart] = useState("");

  const [openMiniCartModal, setOpenMiniCartModal] = useState(false);
  const handleCloseMiniCartModal = () => {
    setOpenMiniCartModal(false);
  };

  const getFavProductModal = (product) => {
    if (
      (auth &&
        favorites
          .filter((fav) => fav.idUtilizator === auth._id)
          .map((favorite) => favorite.idProdus)
          .includes(product._id)) ||
      (!auth &&
        currentSessionFavorites
          .map((favorite) => favorite.idProdus)
          .includes(product._id))
    )
      return (
        <Button
          variant="contained"
          aria-label="add to favorites"
          onClick={() => deleteNewFavoriteNoUser(product)}
          sx={buttonStyleFavs}
          startIcon={
            <FavoriteIcon sx={{ color: "red" }} size="small" fontSize="large" />
          }
        >
          Șterge favorit
        </Button>
      );
    else
      return (
        <Button
          variant="contained"
          aria-label="add to favorites"
          onClick={() => addNewFavoriteNoUser(product)}
          sx={buttonStyleFavs}
          startIcon={<FavoriteBorderIcon size="small" fontSize="large" />}
        >
          Adaugă favorit
        </Button>
      );
  };

  const addNewFavoriteNoUser = (product) => {
    if (auth) {
      const favoriteWithUser = {
        idProdus: product._id,
        idUtilizator: auth._id,
      };
      dispatch(
        addFavorite("http://localhost:8080/favorites", favoriteWithUser)
      );
    } else {
      const favorite = {
        idProdus: product._id,
      };
      dispatch(addFavoriteNoUser(favorite));
    }
  };

  const deleteNewFavoriteNoUser = (product) => {
    if (auth) {
      const fav = favorites.find(
        (favorite) =>
          favorite.idProdus === product._id &&
          favorite.idUtilizator === auth._id
      );
      dispatch(
        deleteFavorite(`http://localhost:8080/favorites/${fav._id}`, fav)
      );
    } else {
      const favorite = {
        idProdus: product._id,
      };
      dispatch(deleteFavoriteNoUser(favorite));
    }
  };

  const adaugaInCos = (product, color) => {
    if (!color) {
      color = currentProduct.culoriDisponibile[0];
    }
    if (quantity > 0) {
      let produs = {};
      produs["idProdus"] = product._id;
      produs["culoare"] = Object.keys(color)[0];
      produs["cantitate"] = quantity;

      if (auth) {
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
              `http://localhost:8080/shoppingCart/${currentUserCart._id}`,
              cartOfUser
            )
          );
          setOpenMiniCartModal(true);
        } else {
          let produseToAdd = [];
          produseToAdd.push(produs);

          const cartOfUser = {
            produse: produseToAdd,
            idUtilizator: auth._id,
          };
          dispatch(addCart("http://localhost:8080/shoppingCart", cartOfUser));
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
          const cartOfUser = [{
            produse: produseToAdd,
          }];
          dispatch(editCartNoUser(cartOfUser));
          setOpenMiniCartModal(true);
        } else {
          let produseToAdd = [];
          produseToAdd.push(produs);

          const cartOfUser = {
            produse: produseToAdd,
          };
          dispatch(addCartNoUser(cartOfUser));
          setOpenMiniCartModal(true);
        }
      }
      setIdProductInCart(product._id);
      setColorProductInCart(color);
    }
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

  const getBrand = () => {
    const product = products.find((product) => product._id === idProductInCart);
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

  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  };

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  const [currentTab, setCurrentTab] = useState(0);

  const changeInfoTab = (event, newTab) => {
    setCurrentTab(newTab);
  };

  const responsive = {
    extraextraLargeDesktop: {
      breakpoint: { max: 4000, min: 2700 },
      items: 4,
    },
    extraLargeDesktop: {
      breakpoint: { max: 2700, min: 2100 },
      items: 3,
    },
    superLargeDesktop: {
      breakpoint: { max: 2100, min: 1800 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1800, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
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
      product.taguri.filter((tag) => Object.keys(tag).includes("New")).length >
      0
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

  const displayQuicklook = (id) => {
    document.getElementById(id).style.visibility = "visible";
  };

  const hideQuicklook = (id) => {
    document.getElementById(id).style.visibility = "hidden";
  };

  const [idForModal, setIdForModal] = useState("");

  const quicklook = (product) => {
    setQuantity(1);
    setIdForModal(product._id);
    setSelectedColor2(product.culoriDisponibile[0]);
    setOpenQuickViewModal(true);
  };

  const [openQuickViewModal, setOpenQuickViewModal] = useState(false);
  const handleCloseQuickViewModal = () => {
    setOpenQuickViewModal(false);
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

  const [displayAddReview, setDisplayAddReview] = useState(false);
  const [ratingToEdit, setRatingToEdit] = useState("");

  const changeDisplayAddReview = () => {
    setDisplayAddReview(true);
  };

  const hideAddReview = () => {
    setDisplayAddReview(false);
    setRatingToEdit("");
  };

  const sendRating = () => {
    setDisplayAddReview(false);
    setRatingToEdit("");
  };

  const displayEditModal = (rating) => {
    setRatingToEdit(rating);
    setDisplayAddReview(true);
  };

  const [isSorted, setIsSorted] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);

  const changeIsFiltered = () => {
    setIsFiltered(!isFiltered);
  };

  const changeIsSorted = () => {
    setIsSorted(!isSorted);
  };

  const enableFilterByUser = () => {
    return auth
      ? ratings.filter((rating) => rating.idUtilizator === auth._id)
      : [];
  };

  const enableSort = () => {
    return ratings.sort((rating1, rating2) =>
      rating1.rating > rating2.rating ? -1 : 1
    );
  };

  const enableBoth = () => {
     return auth && ratings.length > 0
      ? ratings.filter((rating) => rating.idUtilizator === auth._id).sort((rating1, rating2) =>
      rating1.rating > rating2.rating ? -1 : 1
    )
      : [];
  }

  const getCurrentRatings = () => {
      if (isFiltered && !isSorted) return enableFilterByUser();
      else if (isSorted && !isFiltered) return enableSort();
      else if (isSorted && isFiltered) return enableBoth();
      else if (!isSorted && !isFiltered) return ratings; 
  };

  useEffect(() => {
    dispatch(setProducts("http://localhost:8080/products"));
    dispatch(setRatings("http://localhost:8080/ratings"));
    dispatch(setBrands("http://localhost:8080/brands"));
    dispatch(setFavorites("http://localhost:8080/favorites"));
    dispatch(setCarts("http://localhost:8080/shoppingCart"));
    dispatch(setUsers("http://localhost:8080/users"));
  }, []);

  return (
    <>
      {currentProduct &&
      currentCategory &&
      currentSubCategory &&
      currentSubSubCategory ? (
        <>
          <Grid sx={firstDivStyle}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "20px",
                marginLeft: "10px",
              }}
            >
              <Typography
                sx={{
                  marginLeft: "20px",
                  p: 1,
                  textDecoration: "none",
                  textColor: "black",
                }}
                as={Link}
                to={`/categorii/${currentCategory._id}`}
              >
                {currentCategory.nume}
              </Typography>
              <Typography sx={{ p: 1 }}>{">"}</Typography>
              <Typography
                sx={{
                  p: 1,
                  textDecoration: "none",
                  textColor: "black",
                }}
                as={Link}
                to={`/categorii/${currentSubCategory._id}`}
              >
                {currentSubCategory.nume}
              </Typography>
              <Typography sx={{ p: 1 }}>{">"}</Typography>
              <Typography
                sx={{
                  p: 1,
                  textDecoration: "none",
                  textColor: "black",
                }}
                as={Link}
                to={`/categorii/${currentSubSubCategory._id}`}
              >
                {currentSubSubCategory.nume}
              </Typography>
            </div>
          </Grid>
          <Grid container sx={secondGridStyle}>
            <Grid item xs={6}>
              <ImageGallery
                additionalClass={"styles.image"}
                items={images}
                showIndex={true}
                showThumbnails={true}
                thumbnailPosition={"left"}
                lazyLoad={true}
                showPlayButton={false}
                showFullscreenButton={false}
              />
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "justify" }}>
              <div style={{ marginLeft: "10%" }}>
                <Typography sx={{ fontWeight: "800" }}>
                  {brands.length > 0
                    ? brands.filter(
                        (brand) => brand._id === currentProduct.idBrand
                      )[0].nume
                    : null}
                </Typography>
                <Typography sx={{ fontSize: "22px" }}>
                  {currentProduct.denumire}
                </Typography>
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
                    value={parseFloat(getProductRating(currentProduct))}
                    precision={0.5}
                    readOnly
                    sx={{ color: "#485165", marginRight: "5px" }}
                  />
                  <Typography>
                    <strong>|</strong>
                    {"  "}
                    {
                      ratings.filter(
                        (review) => review.idProdus === currentProduct._id
                      ).length
                    }
                    {""}
                    {ratings.filter(
                      (review) => review.idProdus === currentProduct._id
                    ).length === 1
                      ? " recenzie"
                      : " recenzii"}
                  </Typography>
                </div>
                <br />
                <Typography sx={{ fontWeight: "780", fontSize: "18px" }}>
                  {currentProduct.pret} lei
                </Typography>
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
                  <Typography sx={{ fontSize: "18px" }}>
                    {selectedColor
                      ? Object.keys(selectedColor)[0]
                      : Object.keys(currentProduct.culoriDisponibile[0])[0]}
                  </Typography>
                </div>
                <br />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  {currentProduct.culoriDisponibile.map((culoare, i) => (
                    <Avatar
                      key={Object.keys(culoare)[0]}
                      id={Object.keys(culoare)[0]}
                      sx={{
                        marginRight: "12px",
                        border: selectedColor
                          ? selectedColor ===
                              currentProduct.culoriDisponibile[0] && i === 0
                            ? "1.5px solid black"
                            : null
                          : i === 0
                          ? "1.5px solid black"
                          : null,
                      }}
                      alt="Not available"
                      src={Object.values(culoare)[0]}
                      onClick={() => selectColor(culoare)}
                    />
                  ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginRight: "10px",
                    marginTop: "30px",
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
                      onClick={() => adaugaInCos(currentProduct, selectedColor)}
                    >
                      Adaugă în coș
                    </Button>
                    {getFavProductModal(currentProduct)}
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>{" "}
          <Box sx={thirdGridStyle}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={currentTab}
                onChange={changeInfoTab}
                TabIndicatorProps={{
                  style: { background: "#000000" },
                }}
              >
                <Tab
                  style={{ color: "black" }}
                  label="Despre produs"
                  {...a11yProps(0)}
                />
                <Tab
                  style={{ color: "black" }}
                  label="Caracteristici"
                  {...a11yProps(1)}
                />
                <Tab
                  style={{ color: "black" }}
                  label="Ingrediente"
                  {...a11yProps(2)}
                />
                <Tab
                  style={{ color: "black" }}
                  label="Recenzii"
                  {...a11yProps(3)}
                />
              </Tabs>
            </Box>
            <TabPanel value={currentTab} index={0}>
              <Typography sx={{ textAlign: "justify" }}>
                {currentProduct.descriere}
              </Typography>
            </TabPanel>
            <TabPanel value={currentTab} index={1}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  {currentProduct.taguri
                    .filter((tag) => Object.values(tag)[0])
                    .slice(
                      0,
                      currentProduct.taguri.filter(
                        (tag) => Object.values(tag)[0]
                      ).length / 2
                    )
                    .map((tag, i) => {
                      return (
                        <div key={i}>
                          <ListItem
                            alignItems="flex-start"
                            sx={{ alignItems: "center" }}
                          >
                            <ListItemAvatar>
                              <Avatar
                                alt="Not available"
                                src={`${Object.values(tag)[0]}`}
                              />
                            </ListItemAvatar>
                            <ListItemText primary={Object.keys(tag)[0]} />
                          </ListItem>
                          {i !==
                          currentProduct.taguri.filter(
                            (tag) => Object.values(tag)[0]
                          ).length /
                            2 -
                            1 ? (
                            <Divider variant="inset" component="li" />
                          ) : null}
                        </div>
                      );
                    })}
                </List>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  {currentProduct.taguri
                    .filter((tag) => Object.values(tag)[0])
                    .slice(
                      currentProduct.taguri.filter(
                        (tag) => Object.values(tag)[0]
                      ).length / 2,
                      currentProduct.taguri.filter(
                        (tag) => Object.values(tag)[0]
                      ).length
                    )
                    .map((tag, i) => {
                      return (
                        <div key={i}>
                          <ListItem
                            alignItems="flex-start"
                            sx={{ alignItems: "center" }}
                          >
                            <ListItemAvatar>
                              <Avatar
                                alt="Not available"
                                src={`${Object.values(tag)[0]}`}
                              />
                            </ListItemAvatar>
                            <ListItemText primary={Object.keys(tag)[0]} />
                          </ListItem>
                          {i !==
                          currentProduct.taguri.filter(
                            (tag) => Object.values(tag)[0]
                          ).length /
                            2 -
                            1 ? (
                            <Divider variant="inset" component="li" />
                          ) : null}
                        </div>
                      );
                    })}
                </List>
              </div>
            </TabPanel>
            <TabPanel value={currentTab} index={2}>
              <Typography sx={{ textAlign: "justify" }}>
                {currentProduct.ingrediente}
              </Typography>
            </TabPanel>
            <TabPanel value={currentTab} index={3}>
              <div style={{ textAlign: "justify" }}>
                <div style={{ textAlign: "justify" }}>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: "800",
                      marginBottom: "20px",
                    }}
                  >
                    Recenzii {currentProduct.denumire}
                  </Typography>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <Typography
                      style={{
                        marginRight: "10px",
                        alignText: "center",
                        fontSize: "20px",
                        fontWeight: "800",
                      }}
                    >
                      {getProductRating(currentProduct) > 0
                        ? getProductRating(currentProduct)
                        : 0}
                    </Typography>
                    <Rating
                      name="read-only"
                      value={parseFloat(getProductRating(currentProduct))}
                      precision={0.5}
                      readOnly
                      size="large"
                      sx={{ color: "#485165", marginRight: "10px" }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "20px",
                      marginBottom: "40px",
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        marginRight: "80px",
                        background: "rgb(46, 59, 85)",
                        "&:hover": {
                          background: "rgb(72, 81, 101)",
                        },
                      }}
                      onClick={changeDisplayAddReview}
                    >
                      Scrie o recenzie
                    </Button>
                    <Tooltip
                      arrow
                      title={
                        isFiltered ? "Toate recenziile" : "Recenziile mele"
                      }
                    >
                      <FilterAltIcon
                        onClick={changeIsFiltered}
                        sx={{ marginRight: "10px" }}
                        fontSize="large"
                      />
                    </Tooltip>
                    <Tooltip arrow title="Sortează după rating">
                      <SortIcon fontSize="large" onClick={changeIsSorted} />
                    </Tooltip>
                  </div>
                </div>
                <DisplayRatings
                  currentRatings={getCurrentRatings()}
                  currentProduct={currentProduct}
                  users={usersList}
                  displayEditModal={displayEditModal}
                />
              </div>
            </TabPanel>
          </Box>
          <Typography sx={fourthGridStyle}>Produse similare</Typography>
          <Carousel
            containerClass="image-item"
            responsive={responsive}
            autoPlay={false}
            shouldResetAutoplay={false}
          >
            {products
              .filter(
                (produs) =>
                  produs.idSubSubCategorie ===
                    currentProduct.idSubSubCategorie &&
                  produs._id !== currentProduct._id
              )
              .slice(0, 7)
              .map((product) => {
                return (
                  <Card
                    key={product._id}
                    sx={{
                      width: "75%",
                      height: "100%",
                      border: "none",
                      boxShadow: "none",
                      marginTop: "10px",
                      marginRight: "10px",
                    }}
                  >
                    <div
                      onMouseOver={() => displayQuicklook(product._id)}
                      onMouseLeave={() => hideQuicklook(product._id)}
                    >
                      <CardActionArea as={Link} to={`/produse/${product._id}`}>
                        <CardMedia
                          component="img"
                          height="360"
                          image={Object.values(product.imagini[0])[0][0]}
                          alt={product.denumire}
                          style={{
                            display: "inline - block",
                            position: "relative",
                            cursor: "pointer",
                            maxWidth: "390px",
                          }}
                        />
                      </CardActionArea>
                      <Button
                        variant="contained"
                        id={product._id}
                        sx={{
                          visibility: "hidden",
                          width: "85%",
                          textTransform: "none",
                          fontSize: "15px",
                          background: "#00000060",
                          "&:hover": {
                            background: "#00000080",
                          },
                        }}
                        onClick={() => quicklook(product)}
                      >
                        Quicklook
                      </Button>
                    </div>
                    <CardActionArea
                      as={Link}
                      to={`/produse/${product._id}`}
                      sx={{ textDecoration: "none", color: "black" }}
                    >
                      <CardContent
                        sx={{ textAlign: "justify", marginLeft: "7px" }}
                      >
                        <Typography sx={{ fontWeight: "700" }}>
                          {brands.length > 0
                            ? brands.filter(
                                (brand) => brand._id === product.idBrand
                              )[0].nume
                            : null}
                        </Typography>
                        <Typography sx={{ fontSize: "18px" }}>
                          {product.denumire}
                        </Typography>
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
                        <Typography
                          sx={{ fontWeight: "780", fontSize: "18px" }}
                        >
                          {product.pret} lei
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                );
              })}
          </Carousel>
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
                      <Grid
                        item
                        xs={"auto"}
                        sx={{ textAlign: "-webkit-center" }}
                      >
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
                                    Object.values(selectedColor2)[0]
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
                        <Typography
                          sx={{ fontWeight: "700", fontSize: "23px" }}
                        >
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
                          <Typography>
                            {Object.keys(selectedColor2)[0]}
                          </Typography>
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
                              id={Object.keys(culoare)[0] + "2"}
                              sx={{
                                marginRight: "12px",
                                border:
                                  selectedColor2 ===
                                    product.culoriDisponibile[0] && i === 0
                                    ? "1.5px solid black"
                                    : null,
                              }}
                              alt="Not available"
                              src={Object.values(culoare)[0]}
                              onClick={() => selectColor2(culoare)}
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
                              onClick={() =>
                                adaugaInCos(product, selectedColor)
                              }
                            >
                              Adaugă în coș
                            </Button>
                            {getFavProductModal(product)}
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
                sx={{
                  fontWeight: "780",
                  textAlign: "center",
                  fontSize: "20px",
                }}
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
        </>
      ) : null}
    </>
  );
};

const firstDivStyle = {
  "@media (min-width: 2100px)": {
    width: "65%",
    margin: "auto",
  },
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
};
const secondGridStyle = {
  "@media (min-width: 2100px)": {
    width: "65%",
    margin: "auto",
  },
};

const thirdGridStyle = {
  width: "100%",
  marginLeft: "20px",
  marginTop: "25px",
  "@media (min-width: 2100px)": {
    width: "65%",
    marginLeft: "auto",
    marginRight: "auto",
  },
};

const fourthGridStyle = {
  fontWeight: "800",
  fontSize: "20px",
  textAlign: "justify",
  marginLeft: "50px",
  marginTop: "25px",
  marginBottom: "30px",
  "@media (min-width: 2100px)": {
    width: "65%",
    marginLeft: "auto",
    marginRight: "auto",
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

const buttonStyleFavs2 = {
  color: "black",
  background: "white",
  border: "2px solid black",
  "&:hover": {
    background: "#FFFFFF80",
  },
  width: "fit-content",
};

const gridStyleModal = {
  display: "flex",
  flexDirection: "row",
  alignItems: "space-between",
};

export default ProductPage;
