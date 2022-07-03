import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addCategory, setCategories } from "../store/actions/categories";
import {
  addSubCategory,
  setSubCategories,
  editSubCategory,
} from "../store/actions/subcategories";
import {
  addSubSubCategory,
  setSubSubCategories,
  editSubSubCategory,
} from "../store/actions/subsubcategories";
import "../styles.css";

const CategoriesMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentCategoryId, setCurrentCategoryId] = useState("");
  const [currentSelectedElement, setCurrentSelectedElement] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectCategories = (state) => state.categories;
  const { categories } = useSelector(selectCategories);

  const selectSubCategories = (state) => state.subcategories;
  const { subcategories } = useSelector(selectSubCategories);

  const selectSubSubCategories = (state) => state.subsubcategories;
  const { subsubcategories } = useSelector(selectSubSubCategories);

  // const nume = "Palete machiaj";
  // const descriere = "Palete machiaj";
  // const status = "activa";
  // const idCategorie = "627a9a0ef9147b3158ac6f3b";
  // const subcategory = {
  //   nume,
  //   descriere,
  //   status,
  //   idCategorie,
  // };
  // const addNewSubCategory = () => {
  //   dispatch(
  //     addSubCategory("https://backend-r4zkv.ondigitalocean.app/subcategories", subcategory)
  //   );
  // };

  // const nume = "Pensule machiaj";
  // const descriere = "Pensule machiaj";
  // const status = "activa";
  // const idSubCategorie = "627ba83c879b4e21b8a6c37b";
  // const subcategory1 = {
  //   nume,
  //   descriere,
  //   status,
  //   idSubCategorie,
  // };
  // const addNewSubSubCategory = () => {
  //   dispatch(addSubSubCategory("https://backend-r4zkv.ondigitalocean.app/subsubcategories", subcategory1));
  // };

  const handleClick = (event, page) => {
    setAnchorEl(event.currentTarget);
    const currentId = categories.find((category) => category.nume === page);
    setCurrentCategoryId(currentId._id);
    setCurrentSelectedElement(page);
    document.getElementById(page).style.background = "#FFFFFF40";
  };

  const handleClose = (event) => {
    setAnchorEl(null);
    if (currentSelectedElement)
      document.getElementById(currentSelectedElement).style.background =
        "unset";
    setCurrentSelectedElement("");
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover-submenu" : undefined;

  const navigateToCategories = (event, idCategorie) => {
    navigate(`/categorii/${idCategorie}`);
    handleClose();
  };

  useEffect(() => {
    dispatch(setCategories("https://backend-r4zkv.ondigitalocean.app/categories"));
    dispatch(setSubCategories("https://backend-r4zkv.ondigitalocean.app/subcategories"));
    dispatch(setSubSubCategories("https://backend-r4zkv.ondigitalocean.app/subsubcategories"));
  }, []);

  return (
    <AppBar
      position="static"
      style={{
        background: "linear-gradient(to bottom, #2E3B55 0%, #485165 100%)",
      }}
    >
      <Container maxWidth="xl" sx={styles}>
        <Toolbar
          disableGutters
          sx={{
            display: { xs: "flex", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: { xs: "flex", md: "flex", width: "fit-content" },
            }}
          >
            {categories.map((category) => (
              <Button
                key={category.nume}
                id={category.nume}
                sx={styles}
                aria-describedby={id}
                onClick={(event) => navigateToCategories(event, category._id)}
              >
                <div
                  onMouseEnter={(event) => handleClick(event, category.nume)}
                >
                  {category.nume}
                </div>
              </Button>
            ))}
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              sx={styles}
              PaperProps={{
                style: { width: "100%" },
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <Paper sx={paperStyle}>
                <Grid container sx={{ justifyContent: "center" }}>
                  {subcategories
                    .filter(
                      (subcategory) =>
                        subcategory.idCategorie === currentCategoryId
                    )
                    .map((subcategory) => (
                      <Grid item xs={2} key={subcategory._id}>
                        <Typography
                          sx={{ p: 1.5, fontWeight: "900" }}
                          key={subcategory.nume}
                          onClick={(event) =>
                            navigateToCategories(event, subcategory._id)
                          }
                        >
                          {subcategory.nume}
                        </Typography>
                        {subsubcategories
                          .filter(
                            (subsubcategory) =>
                              subsubcategory.idSubCategorie === subcategory._id
                          )
                          .map((subsubcategory) => (
                            <Typography
                              sx={{ p: 1 }}
                              key={subsubcategory.nume}
                              onClick={(event) =>
                                navigateToCategories(event, subsubcategory._id)
                              }
                            >
                              {subsubcategory.nume}
                            </Typography>
                          ))}
                      </Grid>
                    ))}
                </Grid>
              </Paper>
            </Popover>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const styles = {
  "&.MuiPopover-root": {
    top: "22px",
    width: "100%",
  },
  "&.MuiButton-root": {
    my: 2,
    marginRight: "10px",
    color: "white",
    display: "block",
    textTransform: "none",
    fontSize: "18px",
  },
};

const paperStyle = {
  "@media (min-width: 2100px)": {
    width: "55%",
    margin: "auto",
  },
};
export default CategoriesMenu;
