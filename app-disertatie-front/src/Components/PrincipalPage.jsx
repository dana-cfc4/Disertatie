import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../Utils/context";
import { setProducts } from "../store/actions/products";
import Typography from "@mui/material/Typography";
import ImageGallery from "react-image-gallery";
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
import ListItemText from "@mui/material/ListItemText";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { setBrands } from "../store/actions/brands";
import RatingsPage from "./RatingsPage";
import carousel1 from '../Images/carousel1.jpeg';
import carousel2 from '../Images/carousel2.jpeg';
import carousel3 from '../Images/carousel3.jpeg';
import carousel4 from '../Images/carousel4.jpg';
import carousel6 from '../Images/carousel6.jpg';
import carousel7 from '../Images/carousel7.jpeg';
import carousel8 from '../Images/carousel8.jpeg';
import {
    addFavorite,
    setFavorites,
    deleteFavorite,
    addFavoriteNoUser,
    deleteFavoriteNoUser,
} from "../store/actions/favorites";
import {
    addCart,
    setCarts,
    editCart,
    addCartNoUser,
    editCartNoUser,
} from "../store/actions/shoppingCarts";
import {
    setRatings,
} from "../store/actions/ratings";
import {
    setOrders,
} from "../store/actions/orders";
import "react-image-gallery/styles/css/image-gallery.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../styles.css";

const PrincipalPage = () => {
    const auth = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const selectProducts = (state) => state.products;
    const { products } = useSelector(selectProducts);

    const currentProduct = products.find(
        (product) => product._id === '627c35c67b0b2f91f1202226'
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

    const adaugaInCos = (product, color) => {
        if (!color) {
            color = currentProduct.culoriDisponibile[0];
        }
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
                    handleCloseQuickViewModal()
                    setOpenMiniCartModal(true);
                } else {
                    let produseToAdd = [];
                    produseToAdd.push(produs);

                    const cartOfUser = {
                        produse: produseToAdd,
                        idUtilizator: auth._id,
                    };
                    dispatch(addCart("https://backend-r4zkv.ondigitalocean.app/shoppingCart", cartOfUser));
                    handleCloseQuickViewModal()
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
                    handleCloseQuickViewModal()
                    setOpenMiniCartModal(true);
                } else {
                    let produseToAdd = [];
                    produseToAdd.push(produs);

                    const cartOfUser = {
                        produse: produseToAdd,
                    };
                    dispatch(addCartNoUser(cartOfUser));
                    handleCloseQuickViewModal()
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

    const hideAddReview = () => {
        setDisplayAddReview(false);
        setRatingToEdit("");
    };

    const sendRating = () => {
        setDisplayAddReview(false);
        setRatingToEdit("");
    };

    const images2 = [{
        original: carousel4,
        thumbnail: carousel4
    },
    {
        original: carousel2,
        thumbnail: carousel2
    },
    {
        original: carousel6,
        thumbnail: carousel6
    }]

    const brandImages = [{ brand: 'Dior', idBrand: '62c1706ab3b28450855ff9d3', image: 'https://media.douglas.ro/media/image/1a/e2/72/Logo_dior_cap_noir-2000x400pxgo3dXyGQ0ruQQ.png' },
    { brand: 'Armani', idBrand: '62c17090b3b28450855ff9d4', image: 'https://media.douglas.ro/media/image/56/18/39/LOLUCP141-Logo-Brands-Douglas_Armani-V1.png' },
    { brand: 'Lancome', idBrand: '627d9111f6d54f839e2c8713', image: 'https://media.douglas.ro/media/image/5d/01/f6/LOLUCP141-Logo-Brands-Douglas_Lancome-V1.png' },
    { brand: 'Yves Saint Laurent', idBrand: '62c171acb3b28450855ff9d5', image: 'https://media.douglas.ro/media/image/ac/45/94/LOLUCP141-Logo-Brands-Douglas_YSL-V1.png' },
    { brand: 'La Mer', idBrand: '62c171eab3b28450855ff9d6', image: 'https://media.douglas.ro/media/image/90/eb/c8/La_Mer_Logo_Black_2000x400_300dpi.png' },
    { brand: 'Clinique', idBrand: '62c17239b3b28450855ff9d7', image: 'https://media.douglas.ro/media/image/39/45/87/logo-clinique-2000x400-px.png' },
    { brand: 'Estee Lauder', idBrand: '627ea00caf66976ef5e30169', image: 'https://media.douglas.ro/media/image/c6/4e/21/Estee-Lauder_Logo.jpg' },
    { brand: 'Guerlain', idBrand: '62c17283b3b28450855ff9d8', image: 'https://media.douglas.ro/media/image/12/18/cc/Guerlain_New_Logo.png' },
    { brand: 'Givenchy', idBrand: '62c172abb3b28450855ff9d9', image: 'https://media.douglas.ro/media/image/74/78/g0/Givenchy_Logo.jpg' },
    { brand: 'Paco Rabanne', idBrand: '62c172f6b3b28450855ff9db', image: 'https://media.douglas.ro/media/image/a5/fb/1d/Paco-Rabanne_Logo.jpg' },
    ]

    const onClick = (event) => {
        const denumirePoza = (event.target.src.substring(event.target.src.lastIndexOf('media/') + 6).slice(0, 9))
        if (denumirePoza === 'carousel4') {
            navigate('./categorii/627a9a33f9147b3158ac6f41');
        }
        if (denumirePoza === 'carousel2') {
            navigate('./categorii/627a9935f9147b3158ac6f33');
        }
        if (denumirePoza === 'carousel6') {
            navigate('./branduri/62c157bab3b28450855ff9d1')
        }
    }

    useEffect(() => {
        dispatch(setProducts("https://backend-r4zkv.ondigitalocean.app/products"));
        dispatch(setRatings("https://backend-r4zkv.ondigitalocean.app/ratings"));
        dispatch(setBrands("https://backend-r4zkv.ondigitalocean.app/brands"));
        dispatch(setFavorites("https://backend-r4zkv.ondigitalocean.app/favorites"));
        dispatch(setCarts("https://backend-r4zkv.ondigitalocean.app/shoppingCart"));
        dispatch(setOrders("https://backend-r4zkv.ondigitalocean.app/orders"));
    }, []);

    return (
        <>
            <Grid sx={firstDivStyle1}>
                <ImageGallery
                    additionalClass={"styles.image"}
                    items={images2}
                    showIndex={true}
                    showThumbnails={false}
                    showNav={true}
                    showBullets={true}
                    lazyLoad={true}
                    slideInterval={6000}
                    showPlayButton={false}
                    showFullscreenButton={false}
                    autoPlay={true}
                    onClick={onClick}
                />
            </Grid>
            <Grid sx={firstDivStyle}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ justifyContent: 'center' }}>
                    <Grid item xs={3.5}>
                        <Typography><strong>LIVRARE GRATUITA</strong><br />
                            LA COMENZI DE PESTE 200 LEI</Typography>
                    </Grid>
                    <Divider orientation="vertical" flexItem sx={{ marginTop: '10px' }} />
                    <Grid item xs={3.5}>
                        <Typography><strong>GARANTĂM 90 DE ZILE</strong><br />
                            PENTRU RETURNAREA PRODUSELOR</Typography>
                    </Grid>
                    <Divider orientation="vertical" flexItem sx={{ marginTop: '10px' }} />
                    <Grid item xs={3.5}>
                        <Typography><strong>ADUNA 50 DE PUNCTE DE FIDELITATE</strong><br />
                            SI BENEFICIEZI DE UN DISCOUNT DE 15%</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Typography sx={fourthGridStyle}>Noutati</Typography>
            <Carousel
                containerClass="image-item"
                responsive={responsive}
                autoPlay={false}
                shouldResetAutoplay={false}
            >
                {products
                    .filter(
                        (produs) =>
                            produs.taguri.find(tag => Object.keys(tag).includes('New'))
                    )
                    .slice(0, 20)
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
                                    onMouseOver={() => displayQuicklook(product._id + '-1')}
                                    onMouseLeave={() => hideQuicklook(product._id + '-1')}
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
                                        id={product._id + '-1'}
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
            <Grid sx={firstDivStyle2}>
                <Grid item xs={6} sx={{ marginRight: '10px' }}>
                    <Link to={`/branduri/6283a37772d1669cd41c427c`}>
                        <img src={carousel7} width="100%" height="350px" alt="carousel7"></img>
                    </Link>
                </Grid>
                <Grid item xs={6} sx={{ marginLeft: '10px' }}>
                    <Link to={`/branduri/62c16f0fb3b28450855ff9d2`}>
                        <img src={carousel8} width="100%" height="350px" alt="carousel8"></img>
                    </Link>
                </Grid>
            </Grid>
            <Typography sx={fourthGridStyle}>Cele mai vandute</Typography>
            <Carousel
                containerClass="image-item"
                responsive={responsive}
                autoPlay={false}
                shouldResetAutoplay={false}
            >
                {products
                    .filter(
                        (produs) =>
                            produs.taguri.find(tag => Object.keys(tag).includes('Bestseller'))
                    )
                    .slice(0, 20)
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
                                    onMouseOver={() => displayQuicklook(product._id + '-2')}
                                    onMouseLeave={() => hideQuicklook(product._id + '-2')}
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
                                        id={product._id + '-2'}
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
            <Typography sx={fifthGridStyle}>Cele mai populare branduri</Typography>
            <Carousel
                containerClass="image-item"
                responsive={responsive}
                autoPlay={false}
                shouldResetAutoplay={false}
            >
                {brandImages.map(brand => {
                    return <Link to={`/branduri/${brand.idBrand}`}>
                        <img src={brand.image} width="140px" height="40px" alt="carousel7"></img>
                    </Link>
                })}


            </Carousel>
            <Typography sx={sixthGridStyle}>Populare printre utilizatori</Typography>
            <Carousel
                containerClass="image-item"
                responsive={responsive}
                autoPlay={false}
                shouldResetAutoplay={false}
            >
                {products
                    .filter(
                        (produs) =>
                            produs.taguri.find(tag => Object.keys(tag).includes('Popular'))
                    )
                    .slice(0, 20)
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
                                    onMouseOver={() => displayQuicklook(product._id + '-3')}
                                    onMouseLeave={() => hideQuicklook(product._id + '-3')}
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
                                        id={product._id + '-3'}
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

const firstDivStyle2 = {
    "@media (min-width: 2100px)": {
        width: "65%",
        margin: "auto",
    },
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: '90%',
    margin: 'auto',
    marginTop: '40px'
};

const firstDivStyle1 = {
    "@media (min-width: 2100px)": {
        width: "65%",
        margin: "auto",
    },
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: '40px',
    // marginTop: '40px'
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
    fontSize: "30px",
    marginLeft: "50px",
    marginTop: "25px",
    marginBottom: "30px",
    "@media (min-width: 2100px)": {
        width: "65%",
        marginLeft: "auto",
        marginRight: "auto",
    },
};

const fifthGridStyle = {
    fontWeight: "800",
    fontSize: "30px",
    marginLeft: "50px",
    marginTop: "50px",
    marginBottom: "100px",
    "@media (min-width: 2100px)": {
        width: "65%",
        marginLeft: "auto",
        marginRight: "auto",
    },
};

const sixthGridStyle = {
    fontWeight: "800",
    fontSize: "30px",
    marginLeft: "50px",
    marginTop: "100px",
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

export default PrincipalPage;
