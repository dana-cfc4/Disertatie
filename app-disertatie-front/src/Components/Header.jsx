import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import logoNou from "../Images/logoNou.png";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import SignUp from "./SignUp";
import Logout from "@mui/icons-material/Logout";
import SearchProduct from "./SearchProduct";
import { useAuth } from "../Utils/context";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../store/actions/users";
import { setFavorites } from "../store/actions/favorites";
import { setCarts } from "../store/actions/shoppingCarts";
import { setProducts } from "../store/actions/products";
import { setCategories } from "../store/actions/categories";
import { setSubCategories } from "../store/actions/subcategories";
import { setSubSubCategories } from "../store/actions/subsubcategories";
import { setBrands } from "../store/actions/brands";
import { useNavigate } from "react-router-dom";

const Header = () => {
   const navigate = useNavigate();
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElLogout, setAnchorElLogout] = useState(null);
  const [open, setOpen] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [mode, setMode] = useState("");
  let auth = useAuth();
  const dispatch = useDispatch();

  const handleOpenRegisterModal = (chosenMode) => {
    setOpenRegisterModal(true);
    setMode(chosenMode);
    handleClose();
  };

  const handleCloseRegisterModal = () => setOpenRegisterModal(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClickLogout = (event) => {
    setAnchorElLogout(event.currentTarget);
    setOpenLogout(true);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleCloseLogout = (event) => {
    setAnchorElLogout(null);
    setOpenLogout(false);
  };

  const logout = () => {
    dispatch(signOut());
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

   const selectProducts = (state) => state.products;
  const { products } = useSelector(selectProducts);

  const selectCategories = (state) => state.categories;
  const { categories } = useSelector(selectCategories);
  
  const selectSubCategories = (state) => state.subcategories;
  const { subcategories } = useSelector(selectSubCategories);
  
  const selectSubSubCategories = (state) => state.subsubcategories;
  const { subsubcategories } = useSelector(selectSubSubCategories);

  const selectBrands = (state) => state.brands;
  const { brands } = useSelector(selectBrands);

  useEffect(() => {
    dispatch(setFavorites("http://localhost:8080/favorites"));
    dispatch(setCarts("http://localhost:8080/shoppingCart"));
    dispatch(setProducts("http://localhost:8080/products"));
    dispatch(setCategories("http://localhost:8080/categories"));
    dispatch(setSubCategories("http://localhost:8080/subcategories"));
    dispatch(setSubSubCategories("http://localhost:8080/subsubcategories"));
    dispatch(setBrands("http://localhost:8080/brands"));
  }, []);


  const getCartContent = () => {
    let nrProducts = 0
    if (auth && auth._id) {
      let currentUserCarts = carts.find((cart) => cart.idUtilizator === auth._id)
      if (currentUserCarts)
        currentUserCarts.produse.map(produs => {
        nrProducts += parseInt(produs.cantitate)
      });
    } else if (currentSessionCarts.length === 1) {
      currentSessionCarts[0].produse.map((produs) => {
        nrProducts += parseInt(produs.cantitate);
      });
    }
    return nrProducts
  };

  const selectProdus = (selected) => {
    console.log(selected,"Selected")
    if (products.filter(product => product.denumire === selected).length > 0) {
      const filteredProducts = products.find(product => product.denumire === selected)
      if(filteredProducts)
      navigate(`/produse/${filteredProducts._id}`);
    }
  }

  const id = open ? "simple-popover" : undefined;
  return (
    <Grid item sx={headerStyle}>
      <Box
        sx={{ flexGrow: 1 }}
        lg={{ marginLeft: "auto", marginRight: "auto" }}
      >
        <AppBar
          position="static"
          style={{
            background: "#FFFFFF",
            boxShadow: "0px 0px 0px 0px rgb(0,0,0)",
          }}
        >
          <Toolbar>
            <img src={logoNou} height="70px" alt="logo"></img>
            {/* <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search> */}
            <SearchProduct selectProdus={selectProdus} products={products} categories={categories} subcategories={subcategories} subsubcategories={subsubcategories} brands={brands}/>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "flex", md: "flex" } }}>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Paper onMouseLeave={handleClose}>
                  <Typography sx={{ p: 2 }}>
                    Loghează-te pentru o experiență mai personalizată
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={styles}
                      size="small"
                      onClick={() => handleOpenRegisterModal("signIn")}
                    >
                      Autentificare
                    </Button>
                    <Button
                      variant="contained"
                      sx={styles}
                      size="small"
                      onClick={() => handleOpenRegisterModal("signUp")}
                    >
                      Crează cont
                    </Button>
                  </Box>
                </Paper>
              </Popover>
              <Modal
                open={openRegisterModal}
                onClose={handleCloseRegisterModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={modalStyle}>
                  <SignUp
                    mode={mode}
                    handleCloseRegisterModal={handleCloseRegisterModal}
                  />
                </Box>
              </Modal>
              {!auth ? (
                <IconButton
                  size="large"
                  aria-describedby={id}
                  onMouseEnter={handleClick}
                >
                  <AccountCircleOutlinedIcon />
                </IconButton>
              ) : (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Typography sx={{ minWidth: 100 }}></Typography>
                    <Typography sx={{ minWidth: 100 }}></Typography>
                    <IconButton
                      onClick={handleClickLogout}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={openLogout ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={openLogout ? "true" : undefined}
                    >
                      <Avatar sx={{ width: 32, height: 32 }}>D</Avatar>
                    </IconButton>
                  </Box>
                  <Menu
                    anchorEl={anchorElLogout}
                    id="account-menu"
                    open={openLogout}
                    onClose={handleCloseLogout}
                    onClick={handleCloseLogout}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem component={Link} to={`/contulmeu/${auth._id}`}>
                      <Avatar /> Contul meu
                    </MenuItem>
                    <MenuItem onClick={logout}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Delogare
                    </MenuItem>
                  </Menu>
                </>
              )}
              <IconButton size="large" component={Link} to={"/favorite"}>
                <Badge
                  badgeContent={
                    auth && auth._id
                      ? favorites.filter(
                          (favorite) => favorite.idUtilizator === auth._id
                        ).length
                      : currentSessionFavorites.length
                  }
                  color="error"
                >
                  <FavoriteBorderIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                component={Link}
                to={"/cosdecumparaturi"}
              >
                <Badge badgeContent={getCartContent()} color="error">
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </Grid>
  );
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  border: "1px solid black",
  backgroundColor: "#F3F3F3",
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  color: "black",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  borderRadius: "30px",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#9E9E9E",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const styles = {
  "&.MuiButton-root": {
    border: "1px black solid",
    borderRadius: 28,
    backgroundColor: "#2E3B55",
    marginBottom: 1,
    width: 150,
  },
  "&.MuiButton-text": {
    color: "#2E3B55",
  },
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const headerStyle = {
  "@media (min-width: 2100px)": {
    marginLeft: "auto",
    marginRight: "auto",
    width: "65%",
  },
};
export default Header;
