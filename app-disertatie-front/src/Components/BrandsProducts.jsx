import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Rating from "@mui/material/Rating";
import ListItem from "@mui/material/ListItem";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Button from "@mui/material/Button";
import { CardActionArea } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FormGroup from "@mui/material/FormGroup";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Divider from "@mui/material/Divider";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setProducts,
} from "../store/actions/products";
import {
  setSpecifications,
} from "../store/actions/specifications";
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
import { addRating, setRatings } from "../store/actions/ratings";
import { setBrands } from "../store/actions/brands";
import { useAuth } from "../Utils/context";

const sortingOptions = [
  "Alfabetic",
  "Preț descrescător",
  "Preț crescător",
  "Rating",
  "Număr review-uri",
];

const BrandsProducts = () => {
  const auth = useAuth();

  const [anchorElSortingMenu, setAnchorElSortingMenu] = useState(null);
  const [selectedSortingMenuIndex, setSelectedSortingMenuIndex] = useState(0);

  const openSortingMenu = Boolean(anchorElSortingMenu);

  const handleClickSortingListItem = (event) => {
    setAnchorElSortingMenu(event.currentTarget);
  };

  const handleSortingMenuItemClick = (event, index) => {
    setSelectedSortingMenuIndex(index);
    setAnchorElSortingMenu(null);
  };

  const handleCloseSortingMenu = () => {
    setAnchorElSortingMenu(null);
  };

  const [openPriceFilter, setOpenPriceFilter] = useState(false);

  const handleOpenPriceFlter = () => {
    setOpenPriceFilter(!openPriceFilter);
  };

  const [openRatingFilter, setOpenRatingFilter] = useState(false);

  const handleOpenRatingFlter = () => {
    setOpenRatingFilter(!openRatingFilter);
  };

  const [openBestsellerFilter, setOpenBestsellerFilter] = useState(false);

  const handleOpenBestsellerFlter = () => {
    setOpenBestsellerFilter(!openBestsellerFilter);
  };

  const [openNewFilter, setOpenNewFilter] = useState(false);

  const handleOpenNewFlter = () => {
    setOpenNewFilter(!openNewFilter);
  };

  const [pretValue, setPretValue] = useState("");

  const changePriceValue = (event) => {
    setPretValue(event.target.value);
  };

  const [pretMinim, setPretMinim] = useState(0);
  const [pretMaxim, setPretMaxim] = useState(0);

  const handleChangePretMinim = (event) => {
    setPretMinim(event.target.value);
  };

  const handleChangePretMaxim = (event) => {
    setPretMaxim(event.target.value);
  };

  const [ratingValue, setRatingValue] = useState("");

  const changeRatingValue = (event) => {
    setRatingValue(event.target.value);
  };

  const [checkedNewProduct, setCheckedNewProduct] = useState(false);

  const changeCheckedNewProduct = (event) => {
    setCheckedNewProduct(event.target.checked);
  };

  const [checkedBestProduct, setCheckedBestProduct] = useState(false);

  const changeCheckedBestProduct = (event) => {
    setCheckedBestProduct(event.target.checked);
  };

  const params = useParams();
  const dispatch = useDispatch();

  const selectRatings = (state) => state.ratings;
  const { ratings } = useSelector(selectRatings);

  const selectBrand = (state) => state.brands;
  const { brands } = useSelector(selectBrand);

  const selectProducts = (state) => state.products;
  const { products } = useSelector(selectProducts);

  const selectFavoriteNoUser = (state) =>
    state.favorites.currentSessionFavorites;
  const currentSessionFavorites = useSelector(selectFavoriteNoUser);

  const selectFavorites = (state) => state.favorites;
  const { favorites } = useSelector(selectFavorites);

  const selectCartNoUser = (state) => state.shoppingCarts.currentSessionCarts;
  const currentSessionCarts = useSelector(selectCartNoUser);

  const selectCarts = (state) => state.shoppingCarts;
  const { carts } = useSelector(selectCarts);

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

  const orderProducts = (product1, product2) => {
    const orderCriteria = sortingOptions[selectedSortingMenuIndex];
    if (orderCriteria === "Alfabetic") {
      return product1.denumire > product2.denumire ? 1 : -1;
    } else if (orderCriteria === "Preț descrescător") {
      return product1.pret > product2.pret ? -1 : 1;
    } else if (orderCriteria === "Preț crescător") {
      return product1.pret > product2.pret ? 1 : -1;
    } else if (orderCriteria === "Rating") {
      return getProductRating(product1) > getProductRating(product2) ? -1 : 1;
    } else if (orderCriteria === "Număr review-uri") {
      return getNrReviews(product1) > getNrReviews(product2) ? -1 : 1;
    }
  };

  const filterByPret = (products, valoareFiltru) => {
    if (valoareFiltru) {
      if (valoareFiltru !== "userChoice") {
        const pretMinimRadio = valoareFiltru.split("-")[0];
        const pretMaximRadio = valoareFiltru.split("-")[1];
        return products.filter(
          (product) =>
            product.pret > pretMinimRadio && product.pret <= pretMaximRadio
        );
      } else if (pretMinim > 0 && pretMaxim > 0 && pretMinim <= pretMaxim) {
        return products.filter(
          (product) => product.pret >= pretMinim && product.pret <= pretMaxim
        );
      } else return products;
    } else return products;
  };

  const filterByRating = (products, valoareFiltru) => {
    if (valoareFiltru) {
      const ratingMinim = valoareFiltru.split("-")[0];
      const ratingMaxim = valoareFiltru.split("-")[1];
      return products.filter(
        (product) =>
          parseInt(ratingMinim) === 0 ?
            getProductRating(product) >= ratingMinim &&
            getProductRating(product) <= ratingMaxim :
            getProductRating(product) > ratingMinim &&
            getProductRating(product) <= ratingMaxim
      );
    } else return products;
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

  const getFullyFilteredProducts = () => {
    return filterByRating(
      filterByPret(products, pretValue),
      ratingValue
    )
      .filter((produs) => (params.idBrand ? produs.idBrand === params.idBrand : false))
      .filter((produs) =>
        checkedBestProduct
          ? produs.taguri.filter((tag) =>
            Object.keys(tag).includes("Bestseller")
          ).length > 0
          : true
      )
      .filter((produs) =>
        checkedNewProduct
          ? produs.taguri.filter((tag) => Object.keys(tag).includes("New"))
            .length > 0
          : true
      )
  };

  const addNewFavoriteNoUser = (product) => {
    if (auth && auth._id) {
      const favoriteWithUser = {
        idProdus: product._id,
        idUtilizator: auth._id,
      };
      dispatch(
        addFavorite("https://backend-r4zkv.ondigitalocean.app/favorites", favoriteWithUser)
      );
    } else {
      const favorite = {
        idProdus: product._id,
      };
      dispatch(addFavoriteNoUser(favorite));
    }
  };

  const deleteNewFavoriteNoUser = (product) => {
    if (auth && auth._id) {
      const fav = favorites.find(
        (favorite) =>
          favorite.idProdus === product._id &&
          favorite.idUtilizator === auth._id
      );
      dispatch(
        deleteFavorite(`https://backend-r4zkv.ondigitalocean.app/favorites/${fav._id}`, fav)
      );
    } else {
      const favorite = {
        idProdus: product._id,
      };
      dispatch(deleteFavoriteNoUser(favorite));
    }
  };

  const displayQuicklook = (id) => {
    document.getElementById(id).style.visibility = "visible";
  };

  const hideQuicklook = (id) => {
    document.getElementById(id).style.visibility = "hidden";
  };

  const [idForModal, setIdForModal] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const quicklook = (product) => {
    setQuantity(1);
    setIdForModal(product._id);
    setSelectedColor(product.culoriDisponibile[0]);
    setOpenQuickViewModal(true);
  };

  const [openQuickViewModal, setOpenQuickViewModal] = useState(false);
  const handleCloseQuickViewModal = () => {
    setOpenQuickViewModal(false);
  };

  const [openMiniCartModal, setOpenMiniCartModal] = useState(false);
  const handleCloseMiniCartModal = () => {
    setOpenMiniCartModal(false);
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

  const getCurrentBrandProducts = () => {
    return products.filter(product => product.idBrand === params.idBrand)
  }

  const getFavProduct = (product) => {
    if (
      (auth && auth._id &&
        favorites
          .filter((fav) => fav.idUtilizator === auth._id)
          .map((favorite) => favorite.idProdus)
          .includes(product._id)) ||
      (!auth &&
        currentSessionFavorites
          .map((favorite) => favorite.idProdus)
          .includes(product._id))
    ) {
      return (
        <IconButton
          aria-label="add to favorites"
          sx={{ alignItems: "flex-end" }}
          onClick={() => deleteNewFavoriteNoUser(product)}
        >
          <FavoriteIcon sx={{ color: "red" }} fontSize="large" />
        </IconButton>
      );
    } else
      return (
        <IconButton
          aria-label="add to favorites"
          sx={{ alignItems: "flex-end" }}
          onClick={() => addNewFavoriteNoUser(product)}
        >
          <FavoriteBorderIcon fontSize="large" />
        </IconButton>
      );
  };

  const getFavProductModal = (product) => {
    if (
      (auth && auth._id &&
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

  const selectColor = (color) => {
    if (selectedColor)
      document.getElementById(Object.keys(selectedColor)[0]).style.border =
        "0px solid black";
    document.getElementById(Object.keys(color)[0]).style.border =
      "1.5px solid black";
    setSelectedColor(color);
  };

  const [quantity, setQuantity] = useState(1);
  const changeQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const getList = () => {
    return (
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          marginLeft: "15px",
          textAlign: "justify",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton onClick={handleOpenPriceFlter}>
          <ListItemText
            disableTypography
            primary={
              <Typography sx={{ fontWeight: "780", fontSize: "20px" }}>
                Preț
              </Typography>
            }
          />
          {openPriceFilter ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openPriceFilter} timeout="auto" unmountOnExit>
          <Grid
            sx={{
              width: "100%",
              maxWidth: 360,
              marginLeft: "15px",
              textAlign: "justify",
            }}
          >
            <FormControl>
              <RadioGroup value={pretValue} onChange={changePriceValue}>
                <FormControlLabel
                  value="0-25"
                  control={<Radio color="default" />}
                  label={`< 25 lei (${filterByPret(getCurrentBrandProducts(), "0-25").length
                    })`}
                />
                <FormControlLabel
                  value="25-50"
                  control={<Radio color="default" />}
                  label={`25 - 50 lei (${filterByPret(getCurrentBrandProducts(), "25-50").length
                    })`}
                />
                <FormControlLabel
                  value="50-100"
                  control={<Radio color="default" />}
                  label={`50 - 100 lei (${filterByPret(getCurrentBrandProducts(), "50-100").length
                    })`}
                />
                <FormControlLabel
                  value="100-150"
                  control={<Radio color="default" />}
                  label={`100 - 150 lei (${filterByPret(getCurrentBrandProducts(), "100-150").length
                    })`}
                />
                <FormControlLabel
                  value="150-1000"
                  control={<Radio color="default" />}
                  label={`> 150 lei (${filterByPret(getCurrentBrandProducts(), "150-1000").length
                    })`}
                />
                <FormControlLabel
                  value="userChoice"
                  control={<Radio color="default" />}
                  label="Interval pret"
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: "12px",
                    marginTop: "12px",
                  }}
                >
                  <TextField
                    sx={{ marginRight: "10px" }}
                    label="Minim"
                    placeholder="Minim"
                    onChange={handleChangePretMinim}
                  />
                  <TextField
                    label="Maxim"
                    placeholder="Maxim"
                    onChange={handleChangePretMaxim}
                  />
                </div>
              </RadioGroup>
            </FormControl>
            <Button
              size="small"
              sx={{ marginBottom: "10px", color: "black" }}
              startIcon={<ClearIcon />}
              onClick={() => setPretValue("")}
            >
              Șterge filtru
            </Button>
          </Grid>
        </Collapse>
        <Divider />

        <ListItemButton onClick={handleOpenRatingFlter}>
          <ListItemText
            disableTypography
            primary={
              <Typography sx={{ fontWeight: "780", fontSize: "20px" }}>
                Rating
              </Typography>
            }
          />
          {openRatingFilter ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openRatingFilter} timeout="auto" unmountOnExit>
          <Grid
            sx={{
              width: "100%",
              maxWidth: 360,
              marginLeft: "15px",
              textAlign: "justify",
            }}
          >
            <FormControl>
              <RadioGroup value={ratingValue} onChange={changeRatingValue}>
                <FormControlLabel
                  value="4-5"
                  control={<Radio color="default" />}
                  label={
                    <Box
                      sx={{
                        width: 200,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Rating value={5} readOnly sx={{ color: "#485165" }} />
                      <Box sx={{ ml: 1 }}>
                        ({filterByRating(getCurrentBrandProducts(), "4-5").length})
                      </Box>
                    </Box>
                  }
                />
                <FormControlLabel
                  value="3-4"
                  control={<Radio color="default" />}
                  label={
                    <Box
                      sx={{
                        width: 200,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Rating value={4} readOnly sx={{ color: "#485165" }} />
                      <Box sx={{ ml: 1 }}>
                        ({filterByRating(getCurrentBrandProducts(), "3-4").length})
                      </Box>
                    </Box>
                  }
                />
                <FormControlLabel
                  value="2-3"
                  control={<Radio color="default" />}
                  label={
                    <Box
                      sx={{
                        width: 200,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Rating value={3} readOnly sx={{ color: "#485165" }} />
                      <Box sx={{ ml: 1 }}>
                        ({filterByRating(getFullyFilteredProducts(), "2-3").length})
                      </Box>
                    </Box>
                  }
                />
                <FormControlLabel
                  value="1-2"
                  control={<Radio color="default" />}
                  label={
                    <Box
                      sx={{
                        width: 200,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Rating value={2} readOnly sx={{ color: "#485165" }} />
                      <Box sx={{ ml: 1 }}>
                        ({filterByRating(getCurrentBrandProducts(), "1-2").length})
                      </Box>
                    </Box>
                  }
                />
                <FormControlLabel
                  value="0-1"
                  control={<Radio color="default" />}
                  label={
                    <Box
                      sx={{
                        width: 200,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Rating value={1} readOnly sx={{ color: "#485165" }} />
                      <Box sx={{ ml: 1 }}>
                        ({filterByRating(getCurrentBrandProducts(), "0-1").length})
                      </Box>
                    </Box>
                  }
                />
              </RadioGroup>
            </FormControl>
            <Button
              size="small"
              sx={{ marginBottom: "10px", color: "black" }}
              startIcon={<ClearIcon />}
              onClick={() => setRatingValue("")}
            >
              Șterge filtru
            </Button>
          </Grid>
        </Collapse>
        <Divider />

        <ListItemButton onClick={handleOpenBestsellerFlter}>
          <ListItemText
            disableTypography
            primary={
              <Typography sx={{ fontWeight: "780", fontSize: "20px" }}>
                Bestsellers
              </Typography>
            }
          />
          {openBestsellerFilter ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openBestsellerFilter} timeout="auto" unmountOnExit>
          <FormGroup
            sx={{
              width: "100%",
              maxWidth: 360,
              marginLeft: "15px",
              textAlign: "justify",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  color="default"
                  checked={checkedBestProduct}
                  onChange={changeCheckedBestProduct}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label={`Bestsellers (${getCurrentBrandProducts().filter(
                (produs) =>
                  produs.taguri.filter((tag) =>
                    Object.keys(tag).includes("Bestseller")
                  ).length > 0
              ).length
                })`}
            />
          </FormGroup>
        </Collapse>
        <Divider />

        <ListItemButton onClick={handleOpenNewFlter}>
          <ListItemText
            disableTypography
            primary={
              <Typography sx={{ fontWeight: "780", fontSize: "20px" }}>
                Noutăți
              </Typography>
            }
          />
          {openNewFilter ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openNewFilter} timeout="auto" unmountOnExit>
          <FormGroup
            sx={{
              width: "100%",
              maxWidth: 360,
              marginLeft: "15px",
              textAlign: "justify",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  color="default"
                  checked={checkedNewProduct}
                  onChange={changeCheckedNewProduct}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label={`Noutăți (${getCurrentBrandProducts().filter(
                (produs) =>
                  produs.taguri.filter((tag) =>
                    Object.keys(tag).includes("New")
                  ).length > 0
              ).length
                })`}
            />
          </FormGroup>
        </Collapse>
      </List>
    );
  };

  const [idProductInCart, setIdProductInCart] = useState("");
  const [colorProductInCart, setColorProductInCart] = useState("");

  const adaugaInCos = (product, color) => {
    if (quantity > 0) {
      let produs = {};
      produs["idProdus"] = product._id;
      produs["culoare"] = Object.keys(color)[0];
      produs["cantitate"] = quantity;

      if (auth && auth._id) {
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
          const cartOfUser = [{
            produse: produseToAdd,
          }];
          dispatch(editCartNoUser(cartOfUser));
          handleCloseQuickViewModal();
          setOpenMiniCartModal(true);
        } else {
          let produseToAdd = [];
          produseToAdd.push(produs);

          const cartOfUser = {
            produse: produseToAdd,
          }
          dispatch(addCartNoUser(cartOfUser));
          handleCloseQuickViewModal();
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

  useEffect(() => {
    dispatch(setProducts("https://backend-r4zkv.ondigitalocean.app/products"));
    dispatch(setRatings("https://backend-r4zkv.ondigitalocean.app/ratings"));
    dispatch(setBrands("https://backend-r4zkv.ondigitalocean.app/brands"));
    dispatch(setSpecifications("https://backend-r4zkv.ondigitalocean.app/specifications"));
    dispatch(setFavorites("https://backend-r4zkv.ondigitalocean.app/favorites"));
    dispatch(setCarts("https://backend-r4zkv.ondigitalocean.app/shoppingCart"));
  }, []);

  return (
    <>
      <Grid sx={firstDivStyle}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginRight: "20px",
          }}
        >
          <Typography>Sortează după: </Typography>
          <List component="nav">
            <ListItem
              button
              id="sorting-choice-button"
              aria-haspopup="listbox"
              aria-controls="sorting-menu"
              aria-expanded={openSortingMenu ? "true" : undefined}
              onClick={handleClickSortingListItem}
            >
              <ListItemText
                disableTypography
                primary={
                  <Typography sx={{ fontWeight: "800" }}>
                    {sortingOptions[selectedSortingMenuIndex]}
                  </Typography>
                }
              />
            </ListItem>
          </List>
          <Menu
            id="sorting-menu"
            anchorEl={anchorElSortingMenu}
            open={openSortingMenu}
            onClose={handleCloseSortingMenu}
            MenuListProps={{
              "aria-labelledby": "sorting-choice-button",
              role: "listbox",
            }}
          >
            {sortingOptions.map((option, index) => (
              <MenuItem
                key={option}
                selected={index === selectedSortingMenuIndex}
                onClick={(event) => handleSortingMenuItemClick(event, index)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </Grid>
      <Grid container sx={gridStyle}>
        <Grid item xs={2}>
          <Typography
            sx={{
              marginLeft: "20px",
              p: 1.5,
              fontWeight: "800",
              fontSize: "25px",
              textAlign: "justify",
            }}
          >
            Filtre:
          </Typography>
          {getList()}
        </Grid>
        <Grid item xs={10}>
          <Grid container sx={{ marginLeft: "5px", justifyContent: "center" }}>
            <Grid item xs={12}>
              <Typography
                sx={{
                  textAlign: "justify",
                  marginTop: "22px",
                  marginLeft: "15px",
                }}
              >
                {getFullyFilteredProducts().length}{" "}
                {getFullyFilteredProducts().length === 1 ? "Result" : "Results"}
              </Typography>
            </Grid>
            {getFullyFilteredProducts()
              .sort((product1, product2) => orderProducts(product1, product2))
              .map((product) => (
                <Grid item xs={"auto"} key={product._id}>
                  <Card
                    sx={{
                      width: 350,
                      border: "none",
                      boxShadow: "none",
                      marginTop: "10px",
                      marginRight: "10px",
                    }}
                  >
                    <CardHeader
                      avatar={getTagAvatar(product)}
                      action={getFavProduct(product)}
                    />
                    <div
                      onMouseOver={() => displayQuicklook(product._id)}
                      onMouseLeave={() => hideQuicklook(product._id)}
                    >
                      <CardActionArea as={Link} to={`/produse/${product._id}`}>
                        <CardMedia
                          component="img"
                          height="340"
                          image={Object.values(product.imagini[0])[0][0]}
                          alt={product.denumire}
                          style={{
                            display: "inline - block",
                            position: "relative",
                            cursor: "pointer",
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
                        <Typography
                          sx={{
                            marginTop: "7px",
                            fontSize: "15px",
                            color: "rgb(0,0,0, 0.6)",
                          }}
                        >
                          {product.imagini.length} Nuanțe
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
                </Grid>
              ))}
          </Grid>
        </Grid>
        <Modal
          sx={{ overflow: "scroll" }}
          open={openQuickViewModal}
          onClose={handleCloseQuickViewModal}
        >
          <Box sx={boxStyle}>
            <Grid container>
              {getFullyFilteredProducts()
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
                                selectedColor ===
                                  product.culoriDisponibile[0] && i === 0
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
      </Grid>
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
  justifyContent: "right",
  marginRight: "20px"
};

const gridStyle = {
  "@media (min-width: 2100px)": {
    width: "65%",
    margin: "auto",
  },
};

const gridStyleModal = {
  display: "flex",
  flexDirection: "row",
  alignItems: "space-between",
};

const buttonStyleFavs = {
  color: "black",
  background: "white",
  border: "2px solid black",
  "&:hover": {
    background: "#FFFFFF80",
  },
};

const buttonStyleFavs2 = {
  color: "black",
  background: "white",
  border: "2px solid black",
  "&:hover": {
    background: "#FFFFFF80",
  },
  width: "fit-content"
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
export default BrandsProducts;
