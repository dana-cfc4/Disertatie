import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSelector } from "react-redux";
import Rating from "@mui/material/Rating";
import { useAuth } from "../Utils/context";
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Badge from "@mui/material/Badge";
import { useDispatch } from "react-redux";
import {
  addCart,
  editCart,
} from "../store/actions/shoppingCarts";
import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
import * as Papa from "papaparse";
import _ from "lodash";

const Recommended = ({ buget }) => {
  const dispatch = useDispatch()
  const correctBudget = buget < 0 ? 0 : buget
  const selectCarts = (state) => state.shoppingCarts;
  const { carts } = useSelector(selectCarts);

  Papa.parsePromise = function (file) {
    return new Promise(function (complete, error) {
      Papa.parse(file, {
        header: true,
        download: true,
        dynamicTyping: true,
        complete,
        error
      });
    });
  };

  const prepareData = async () => {
    const csv = await Papa.parsePromise(
      "https://raw.githubusercontent.com/dana-cfc4/MyCsvFile/main/productsCsv");

    return csv.data;
  };

  const oneHot = outcome => Array.from(tf.oneHot(outcome, 2).dataSync());

  const createDataSets = async (data, features, testSize, batchSize) => {
    const X = data.map(r =>
      features.map(f => {
        const val = r[f];
        return val === undefined ? 0 : val;
      })
    );

    const y = data.map(r => {
      const outcome = r.Outcome === undefined ? 0 : r.Outcome;
      return oneHot(outcome);
    });

    const splitIdx = parseInt((1 - testSize) * data.length, 10);

    const ds = tf.data
      .zip({ xs: tf.data.array(X), ys: tf.data.array(y) })
      .shuffle(data.length, 42);
    let dataset = []
    await ds.forEachAsync(function (geek) {
      const foundItem = data.find(dat => dat.categorie === geek.xs[0] && dat.pret === geek.xs[1] && dat.varianteDisponibile === geek.xs[2] && dat.nou === geek.xs[3] && dat.bestseller === geek.xs[4])
      dataset = [...dataset, foundItem]
    });

    return [
      ds.take(splitIdx).batch(batchSize),
      ds.skip(splitIdx + 1).batch(batchSize),
      tf.tensor(X.slice(splitIdx)),
      tf.tensor(y.slice(splitIdx)),
      dataset
    ];
  };

  const trainComplexModel = async (featureCount, trainDs, validDs) => {
    const model = tf.sequential();
    model.add(
      tf.layers.dense({
        units: 12,
        activation: "relu",
        inputShape: [featureCount]
      })
    );
    model.add(
      tf.layers.dense({
        units: 2,
        activation: "softmax"
      })
    );
    const optimizer = tf.train.adam(0.0001);
    model.compile({
      optimizer: optimizer,
      loss: "binaryCrossentropy",
      metrics: ["accuracy"]
    });
    const trainLogs = [];
    console.log("Training...");
    await model.fitDataset(trainDs, {
      epochs: 15,
      validationData: validDs,
      callbacks: {
        onEpochEnd: async (epoch, logs) => {
          trainLogs.push(logs);
        }
      }
    });
    return model;
  };

  const run = async () => {
    const data = await prepareData();

    const filteredData = data.filter(dat => dat.categorie !== null)
    const features = ["categorie", "pret", "varianteDisponibile", "nou", "bestseller"];

    const [trainDs, validDs, xTest, yTest, dataset] = await createDataSets(
      filteredData,
      features,
      0.2,
      28
    );

    const model = await trainComplexModel(features.length, trainDs, validDs);

    const preds = model.predict(xTest).argMax(-1);
    const labels = yTest.argMax(-1);

    const confusionMatrix = await tfvis.metrics.confusionMatrix(labels, preds);
    return [preds.arraySync(), dataset]
  };

  const headCells = [
    {
      id: "imagine",
      numeric: false,
      disablePadding: true,
      label: "Imagine"
    },
    {
      id: "brand",
      numeric: false,
      disablePadding: false,
      label: "Brand"
    },
    {
      id: "denumire",
      numeric: false,
      disablePadding: false,
      label: "Denumire"
    },
    {
      id: "culoare",
      numeric: false,
      disablePadding: false,
      label: "Culoare"
    },
    {
      id: "pret",
      numeric: true,
      disablePadding: false,
      label: "Pret (lei)"
    },
    {
      id: "rating",
      numeric: false,
      disablePadding: false,
      label: "Rating"
    },
    {
      id: "recenzii",
      numeric: true,
      disablePadding: false,
      label: "Numar recenzii"
    },
  ];

  const adaugaInCos = () => {
    let produseToAdd = []
    selected.map(sel => {
      let produs = {};
      produs["idProdus"] = sel.substring(0, 24);
      produs["culoare"] = sel.substring(24);
      produs["cantitate"] = 1;

      if (auth) {
        const currentUserCart = carts.find(
          (cart) => cart.idUtilizator === auth._id
        );
        if (currentUserCart) {
          let currentProduct = currentUserCart.produse.find(
            (produs) =>
              produs.idProdus === sel.substring(0, 24) &&
              produs.culoare === sel.substring(24)
          );

          if (currentProduct) {
            currentProduct["cantitate"] =
              parseInt(currentProduct["cantitate"]) + 1;

            let filteredProducts = currentUserCart.produse.filter(
              (produs) =>
                produs.idProdus !== currentProduct.idProdus ||
                produs.culoare !== currentProduct.culoare
            );
            filteredProducts.push(currentProduct);
            produseToAdd = filteredProducts.map((product) => product);
          } else {
            produseToAdd = [...produseToAdd, produs];
          }

        }
      }
    })
    const cartOfUser = {
      produse: produseToAdd,
      idUtilizator: auth._id,
    };
    const currentUserCart = carts.find(
      (cart) => cart.idUtilizator === auth._id
    );
    dispatch(
      editCart(
        `https://backend-r4zkv.ondigitalocean.app/shoppingCart/${currentUserCart._id}`,
        cartOfUser
      )
    );
    setSelected([])
  }

  function EnhancedTableHead(props) {
    const { onSelectAllClick, numSelected, rowCount } =
      props;
    return (
      <TableHead>
        <StyledTableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <StyledTableCell
              key={headCell.id}
              align='center'
              padding={headCell.disablePadding ? "none" : "normal"}
            >
              {headCell.label}
            </StyledTableCell>
          ))}
        </StyledTableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;

    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },

          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }
        }
      >
        {computeRecommendedValue() > correctBudget ?
          <Alert sx={{ width: 'fit-content', marginLeft: '35px' }} severity="error">Ai depasit bugetul alocat!</Alert>
          : null
        }

        <Typography
          sx={{ flex: '50%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} {numSelected === 1 ? 'produs selectat' : 'produse selectate'}, in valoare de {computeRecommendedValue()} lei
        </Typography>

        <Tooltip title="Adauga in cos">
          <IconButton onClick={adaugaInCos}>
            <Badge
              badgeContent={numSelected} color="error">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>
        </Tooltip>
      </Toolbar >
    );
  };

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "rgb(72, 81, 101)",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const createData = (id, imagine, brand, denumire, culoare, pret, rating, recenzii) => {
    return {
      id, imagine, brand, denumire, culoare, pret, rating, recenzii
    };
  }

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id + n.culoare);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const computeRecommendedValue = () => {
    let valoareProduse = 0
    selected.map(sel => {
      const currentProd = products.find(prod => prod._id === sel.substring(0, 24))
      valoareProduse += currentProd?.pret
    })
    return valoareProduse
  }

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [rows, setRows] = useState([])

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  function Row(props) {
    const { row, identifier } = props;
    const isItemSelected = isSelected(identifier);
    const labelId = `enhanced-table-checkbox-${identifier}`;
    return (
      <React.Fragment>
        <StyledTableRow
          hover
          onClick={(event) => handleClick(event, identifier)}
          role="checkbox"
          aria-checked={isItemSelected}
          tabIndex={-1}
          key={identifier}
          selected={isItemSelected}
          sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              checked={isItemSelected}
              inputProps={{
                'aria-labelledby': labelId,
              }}
            />
          </TableCell>
          <StyledTableCell align="center">
            <Box
              component="img"
              sx={{
                height: 150,
                width: 150,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
              }}
              alt="The house from the offer."
              src={row.imagine}
            /></StyledTableCell>
          <StyledTableCell align="center">{row.brand}</StyledTableCell>
          <StyledTableCell align="center">{row.denumire}</StyledTableCell>
          <StyledTableCell align="center">{row.culoare}</StyledTableCell>
          <StyledTableCell align="center">{row.pret}</StyledTableCell>
          <StyledTableCell align="center">
            <Rating
              name="read-only"
              value={parseFloat(row.rating)}
              precision={0.5}
              readOnly
              sx={{ color: "#485165", marginRight: "10px" }}
            /></StyledTableCell>
          <StyledTableCell align="center">{row.recenzii}</StyledTableCell>
        </StyledTableRow>
      </React.Fragment>
    );
  }

  Row.propTypes = {
    row: PropTypes.shape({
      imagine: PropTypes.string.isRequired,
      brand: PropTypes.string.isRequired,
      denumire: PropTypes.string.isRequired,
      culoare: PropTypes.string.isRequired,
      pret: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      recenzii: PropTypes.number.isRequired,
    }).isRequired,
  };

  const auth = useAuth()

  const selectProducts = (state) => state.products;
  const { products } = useSelector(selectProducts);

  const selectBrands = (state) => state.brands;
  const { brands } = useSelector(selectBrands);

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
    else return 0
  };

  const getNrReviews = (product) => {
    const nrReviewsProduct = ratings.filter(
      (review) => review.idProdus === product._id
    ).length;
    return nrReviewsProduct;
  };

  const selectOrders = (state) => state.orders;
  const { orders } = useSelector(selectOrders);

  let orderedProducts = []
  orders.filter(order => order.idUtilizator === auth?._id).map(order => {
    orderedProducts = [...orderedProducts, ...order.cosCumparaturi.produse]
  })

  const initData = async () => {
    const predictedInit = await run()
    const predicted = predictedInit[0]

    let rowsArray = []
    if (auth) {
      let record = {}
      let formattedProducts = []
      products.map(product => {
        product.culoriDisponibile.map(culoare => {
          let prodToAdd = {}
          const images = product.imagini
          const image = images.find(image => Object.keys(image)[0] === Object.values(culoare)[0])
          prodToAdd['id'] = product._id
          prodToAdd['subsubcategorie'] = product.idSubSubCategorie
          prodToAdd['imagine'] = Object.values(image)[0][0]
          const currentBrand = brands.find(brand => brand._id === product.idBrand)
          prodToAdd['idBrand'] = currentBrand?._id
          prodToAdd['brand'] = currentBrand?.nume
          prodToAdd['denumire'] = product.denumire
          prodToAdd['culoare'] = Object.keys(culoare)[0]
          prodToAdd['pret'] = product.pret
          prodToAdd['rating'] = getProductRating(product)
          prodToAdd['recenzii'] = ratings.filter(
            (review) => review.idProdus === product._id
          ).length

          formattedProducts = [...formattedProducts, prodToAdd]
        })
      })
      const dataset = predictedInit[1]

      let finalRecommandations = []
      const last20pPredicted = dataset.slice(-Math.round(dataset.length * 0.2))
      const filteredLast20Preds = last20pPredicted.filter((product, index) => predicted[index])

      const finalFormattedProducts = formattedProducts.filter(prods =>
        filteredLast20Preds.filter(prod => prods?.culoare === prod?.culoare && prods.id === prod.id).length > 0
      )
      finalRecommandations = [...finalRecommandations, ...finalFormattedProducts]

      const formattedSimilarProds = formattedProducts.filter(prods =>
        orderedProducts.filter(prod => {
          const currentProd = products.find(product => product._id === prod.idProdus)
          const currentBrand = brands.find(brand => brand._id === currentProd?.idBrand)
          return prods.idSubSubCategorie === currentProd?.idSubSubCategorie || prods.brand === currentBrand?.nume
        }).length > 0
      )

      //daca sunt prea multe aici faci slice(0,n)
      finalRecommandations = [...new Set([...finalRecommandations, ...formattedSimilarProds.sort(() => Math.random() - 0.5)])];
      finalRecommandations.map(product => {
        record = createData(product.id, product.imagine, product.brand, product.denumire, product.culoare, product.pret, product.rating, product.recenzii)
        rowsArray = [...rowsArray, record]
      })
      setRows(rowsArray)
    }
  }

  useEffect(() => {
    initData()
  }, []);

  return (
    <>
      <h1>Produse recomandate pentru tine</h1>
      <EnhancedTableToolbar numSelected={selected.length} />
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <EnhancedTableHead
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={rows.length}
          />
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const key = row.id + row.culoare
                return (
                  <Row key={index} identifier={key} row={row} index={index} />
                )
              })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
export default Recommended