import React, { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Select from 'react-select';
import { visuallyHidden } from '@mui/utils';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../store/actions/products";
import { setBrands } from "../store/actions/brands";
import { setOrders } from "../store/actions/orders";
import { useAuth } from "../Utils/context";
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { months } from "../constant";

const MyOrders = () => {
  const params = useParams();

  const [selectedDate, setSelectedDate] = useState({ value: 'all', label: 'Toate' })
  const [selectedStatus, setSelectedStatus] = useState({ value: 'all', label: 'Toate' })
  const [idComandaSearched, setIdComandaSearched] = useState(params ? params.idComanda : '')
  const [searchById, setSearchById] = useState(params.idComanda ? true : false)

  const searchCommand = () => {
    setSearchById(!searchById)
  }

  const changeIdComandaSearched = (event) => {
    setIdComandaSearched(event.target.value)
  }

  const headCells = [
    {
      id: "idComanda",
      numeric: false,
      disablePadding: true,
      label: "Id comanda"
    },
    {
      id: "data",
      numeric: false,
      disablePadding: false,
      label: "Data"
    },
    {
      id: "status",
      numeric: false,
      disablePadding: false,
      label: "Status"
    },
    {
      id: "valoareFinala",
      numeric: true,
      disablePadding: false,
      label: "Valoare finala (lei)"
    },
    {
      id: "adresaLivrare",
      numeric: false,
      disablePadding: false,
      label: "Adresa livrare"
    },
  ];


  function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <StyledTableRow>
          <StyledTableCell padding="checkbox"></StyledTableCell>
          {headCells.map((headCell) => (
            <StyledTableCell
              key={headCell.id}
              align='center'
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </StyledTableCell>
          ))}
        </StyledTableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
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
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const createData = (idComanda, data, status, valoareFinala, adresaLivrare, produse) => {
    return {
      idComanda,
      data,
      status,
      valoareFinala,
      adresaLivrare,
      history: produse,
    };
  }

  function descendingComparator(a, b, orderBy) {
    if (orderBy === "data") {
      if (a[orderBy].localeCompare(b[orderBy])) {
        return -1;
      }
    }
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
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

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [rows, setRows] = useState([])

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);

    return (
      <React.Fragment>
        <StyledTableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
          <StyledTableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </StyledTableCell>
          <StyledTableCell align="center">{row.idComanda}</StyledTableCell>
          <StyledTableCell align="center">{getCorrectFormatOfDate(row.data)}</StyledTableCell>
          <StyledTableCell align="center">{row.status}</StyledTableCell>
          <StyledTableCell align="center">{parseFloat(row.valoareFinala)}</StyledTableCell>
          <StyledTableCell align="center">{row.adresaLivrare}</StyledTableCell>
        </StyledTableRow>
        <StyledTableRow hover>
          <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Produse comandate
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <StyledTableRow hover>
                      <StyledTableCell align="center">Brand</StyledTableCell>
                      <StyledTableCell align="center">Denumire</StyledTableCell>
                      <StyledTableCell align="center">Culoare</StyledTableCell>
                      <StyledTableCell align="center">Cantitate</StyledTableCell>
                      <StyledTableCell align="center">Pret (lei)</StyledTableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {row.history.map((historyRow) => (
                      <StyledTableRow hover key={historyRow.date}>
                        <StyledTableCell align="center">
                          {historyRow.brand}
                        </StyledTableCell>
                        <StyledTableCell align="center">{historyRow.denumire}</StyledTableCell>
                        <StyledTableCell align="center">{historyRow.culoare}</StyledTableCell>
                        <StyledTableCell align="center">{historyRow.cantitate}</StyledTableCell>
                        <StyledTableCell align="center">
                          {historyRow.pret}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </StyledTableCell>
        </StyledTableRow>
      </React.Fragment>
    );
  }

  Row.propTypes = {
    row: PropTypes.shape({
      idComanda: PropTypes.string.isRequired,
      data: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      valoareFinala: PropTypes.string.isRequired,
      adresaLivrare: PropTypes.string.isRequired,
      history: PropTypes.arrayOf(
        PropTypes.shape({
          brand: PropTypes.string.isRequired,
          denumire: PropTypes.string.isRequired,
          culoare: PropTypes.string.isRequired,
          cantitate: PropTypes.number.isRequired,
          pret: PropTypes.number.isRequired,
        }),
      ).isRequired,
    }).isRequired,
  };

  const dispatch = useDispatch()
  const auth = useAuth()

  const selectProducts = (state) => state.products;
  const { products } = useSelector(selectProducts);

  const selectBrands = (state) => state.brands;
  const { brands } = useSelector(selectBrands);

  const selectOrders = (state) => state.orders;
  const { orders } = useSelector(selectOrders);

  const prevOrders = usePrevious(orders)
  const prevSelectedDate = usePrevious(selectedDate)
  const prevSelectedStatus = usePrevious(selectedStatus)
  const prevSearchById = usePrevious(searchById)

  const changeSelectedDate = (option) => {
    setSelectedDate(option)
  }

  const changeSelectedStatus = (option) => {
    setSelectedStatus(option)
  }

  const initData = () => {
    let rowsArray = []
    if (auth) {
      let record = {}
      orders.filter(order => order.idUtilizator === auth._id).filter(order => {
        if (selectedDate.value === "all")
          return true
        if (selectedDate.value === "2022") {
          if (new Date(order.data).getFullYear() === 2022)
            return true
        }
        if (selectedDate.value === "2021") {
          if (new Date(order.data).getFullYear() === 2021)
            return true
        }
        if (selectedDate.value === "2020") {
          if (new Date(order.data).getFullYear() === 2020)
            return true
        }
        if (selectedDate.value === "3luni") {
          if ([5, 6, 7].includes(new Date(order.data).getMonth() + 1))
            return true
        }
        if (selectedDate.value === "6luni") {
          if ([2, 3, 4, 5, 6, 7].includes(new Date(order.data).getMonth() + 1))
            return true
        }
        return false
      })
        .filter(order => {
          if (selectedStatus.value === "all")
            return true
          if (selectedStatus.value === "plasate") {
            if (order.status === 'plasata')
              return true
          }
          if (selectedStatus.value === "inasteptare") {
            if (order.status === 'in asteptare')
              return true
          }
          if (selectedStatus.value === "procesate") {
            if (order.status === 'procesata')
              return true
          }
          if (selectedStatus.value === "finalizate") {
            if (order.status === 'finalizata')
              return true
          }
          return false
        })
        .filter(order => !searchById ? true : order._id === idComandaSearched)
        .map(comanda => {
          const valoareTotala = comanda.valoareProduse + comanda.taxaLivrare - comanda.discount
          const adresaLivrare = comanda.adresaLlivrare.strada && comanda.adresaLlivrare.nrStrada ? comanda.adresaLlivrare.strada + ',' + comanda.adresaLlivrare.nrStrada :
            comanda.adresaLlivrare.strada && !comanda.adresaLlivrare.nrStrada ? comanda.adresaLlivrare.strada : '-'
          let produse = []

          comanda.cosCumparaturi.produse.map(produs => {
            let obj = {}
            const currentProd = products.find(product => product._id === produs.idProdus)
            if (currentProd) {
              const brand = brands.find(brand => brand._id === currentProd.idBrand)
              if (brand) {
                obj['brand'] = brand.nume
                obj['denumire'] = currentProd.denumire
                obj['culoare'] = produs.culoare
                obj['cantitate'] = produs.cantitate
                obj['pret'] = currentProd.pret
              }
            }
            produse = [...produse, obj]
          })
          record = createData(comanda._id, comanda.data, comanda.status, valoareTotala, adresaLivrare, produse)
          rowsArray = [...rowsArray, record]
        })
      setRows(rowsArray)
    }
  }

  function usePrevious(value) {
    const ref = useRef();

    useEffect(() => {
      ref.current = value;
    }, [orders, selectedDate, selectedStatus, searchById]);

    return ref.current;
  }

  const dateOptions = [
    { value: '3luni', label: 'Ulitmele 3 luni' },
    { value: '6luni', label: 'Ultimele 6 luni' },
    { value: '2022', label: '2022' },
    { value: '2021', label: '2021' },
    { value: '2020', label: '2020' },
    { value: 'all', label: 'Toate' }
  ]

  const statusOptions = [
    { value: 'plasate', label: 'Comenzi plasate' },
    { value: 'inasteptare', label: 'Comenzi in asteptare' },
    { value: 'procesate', label: 'Comenzi procesate' },
    { value: 'finalizate', label: 'Comenzi finalizate' },
    { value: 'all', label: 'Toate' }
  ]

  useEffect(() => {
    if (prevOrders === undefined) {
      dispatch(setProducts("http://localhost:8080/products"));
      dispatch(setBrands("http://localhost:8080/brands"));
      dispatch(setOrders("http://localhost:8080/orders"));
    }
    if (JSON.stringify(prevOrders) !== JSON.stringify(orders) ||
      JSON.stringify(prevSelectedDate) !== JSON.stringify(selectedDate) ||
      JSON.stringify(prevSelectedStatus) !== JSON.stringify(selectedStatus) ||
      JSON.stringify(prevSearchById) !== JSON.stringify(searchById)
    ) {
      initData()
    }
  }, [orders, selectedDate, selectedStatus, searchById]);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '20%' }}>
          <label style={{
            display: 'inline-block',
            maxWidth: '20%',
            verticalAlign: 'top',
            marginBottom: '8px',
            fontWeight: 'bold',
            fontSize: '20px',
            marginTop: '20px',
            alignSelf: 'center'
          }} for="dateChosen">Perioada</label>
          <Select
            id="dateChosen"
            className="date"
            classNamePrefix="date"
            value={selectedDate}
            onChange={changeSelectedDate}
            options={dateOptions}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', width: '20%', marginLeft: '30px' }}>
          <label style={{
            display: 'inline-block',
            maxWidth: '20%',
            verticalAlign: 'top',
            marginBottom: '8px',
            fontWeight: 'bold',
            fontSize: '20px',
            marginTop: '20px',
            alignSelf: 'center'
          }} for="statusChosen">Status</label>
          <Select
            id="statusChosen"
            className="status"
            classNamePrefix="status"
            value={selectedStatus}
            onChange={changeSelectedStatus}
            options={statusOptions}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', marginLeft: '40px', width: '90%' }}>
            <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField sx={{ width: '110%' }} id="input-with-sx" label="Id comanda" variant="standard" value={idComandaSearched} onChange={changeIdComandaSearched} />
          </div>
          <Button variant="text" onClick={searchCommand}>{searchById ? 'Sterge cautarea' : 'Cauta comanda'}</Button>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <Row key={row.name} row={row} />
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
        rowsPerPageOptions={[5, 10, 25]}
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

export default MyOrders