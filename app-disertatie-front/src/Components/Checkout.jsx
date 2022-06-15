import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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
import FormGroup from "@mui/material/FormGroup";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { setCarts, setCartsNoUser } from "../store/actions/shoppingCarts";
import { setUsers } from "../store/actions/users";
import "../styles.css";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Checkbox from "@mui/material/Checkbox";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { addOrder } from "../store/actions/orders";
import "../styles.css";

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const auth = useAuth();
  const dispatch = useDispatch();

  const selectProducts = (state) => state.products;
  const { products } = useSelector(selectProducts);

  const selectCartNoUser = (state) => state.shoppingCarts.currentSessionCarts;
  const currentSessionCarts = useSelector(selectCartNoUser);

  const selectCarts = (state) => state.shoppingCarts;
  const { carts } = useSelector(selectCarts);

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
    if (getCartContent()[1] > 200) return 0;
    else return 15;
  };

  const getDiscount = () => {
    if (promoCodeFinal === "eok")
      return (0.1 * (getCartContent()[1] + getCostLivrare())).toFixed(2);
    else return 0;
  };

  const getValoareTotala = () => {
    return getCartContent()[1] + getCostLivrare() - getDiscount();
  };

  const steps = ["Modalitate livrare", "Date facturare", "Modalitate de plata"];

  const [modalitateLivrare, setModalitateLivrare] = useState("curier");

  const changeModalitateLivrare = (event) => {
    setModalitateLivrare(event.target.value);
  };

  const [oras, setOras] = useState("");
  const changeOras = (event) => {
    setOras(event.target.value);
  };

  const [strada, setStrada] = useState("");
  const changeStrada = (event) => {
    setStrada(event.target.value);
  };

  const [nrStrada, setNrStrada] = useState("");
  const changeNrStrada = (event) => {
    setNrStrada(event.target.value);
  };

  const [bloc, setBloc] = useState("");
  const changeBloc = (event) => {
    setBloc(event.target.value);
  };

  const [scara, setScara] = useState("");
  const changeScara = (event) => {
    setScara(event.target.value);
  };

  const [apartament, setApartament] = useState("");
  const changeApartament = (event) => {
    setApartament(event.target.value);
  };

  const [etaj, setEtaj] = useState("");
  const changeEtaj = (event) => {
    setEtaj(event.target.value);
  };

  const [nume, setNume] = useState("");
  const changeNume = (event) => {
    setNume(event.target.value);
  };

  const [prenume, setPrenume] = useState("");
  const changePrenume = (event) => {
    setPrenume(event.target.value);
  };

  const [nrTel, setNrTel] = useState("");
  const changeNrTel = (event) => {
    setNrTel(event.target.value);
  };

  const [email, setEmail] = useState("");
  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  const selectUsers = (state) => state.users;
  const { usersList } = useSelector(selectUsers);

  const [isDefaultAddress, setIsDefaultAddress] = useState(false);

  const changeIsDefaultAddress = (event) => {
    setIsDefaultAddress(event.target.checked);
    if (event.target.checked) {
      const currentUser = usersList.find((user) => user._id === auth._id);
      if (currentUser) {
        if (currentUser.city) setOras(currentUser.city);
        else setOras("");
        if (currentUser.streetName) setStrada(currentUser.streetName);
        else setStrada("");
        if (currentUser.streetNumber) setNrStrada(currentUser.streetNumber);
        else setNrStrada("");
        if (currentUser.bloc) setBloc(currentUser.bloc);
        else setBloc("");
        if (currentUser.scara) setScara(currentUser.scara);
        else setScara("");
        if (currentUser.apartmentNumber)
          setApartament(currentUser.apartmentNumber);
        else setApartament("");
        if (currentUser.etaj) setEtaj(currentUser.etaj);
        else setEtaj("");
      }
    } else {
      setOras("");
      setStrada("");
      setNrStrada("");
      setBloc("");
      setScara("");
      setApartament("");
      setEtaj("");
    }
  };

  const [isDefaultData, setIsDefaultData] = useState(false);

  const changeIsDefaultData = (event) => {
    setIsDefaultData(event.target.checked);
    if (event.target.checked) {
      const currentUser = usersList.find((user) => user._id === auth._id);
      if (currentUser) {
        if (currentUser.lastName) setNume(currentUser.lastName);
        else setNume("");
        if (currentUser.firstName) setPrenume(currentUser.firstName);
        else setPrenume("");
        if (currentUser.phoneNumber) setNrTel(currentUser.phoneNumber);
        else setNrTel("");
        if (currentUser.emailAddress) setEmail(currentUser.emailAddress);
        else setEmail("");
      }
    } else {
      setNume("");
      setPrenume("");
      setNrTel("");
      setEmail("");
    }
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 3);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    return `${day.toString().padStart(2, "0")}/${month
      .toString()
      .padStart(2, "0")}/${year}`;
  };

  const [activeStep, setActiveStep] = useState(0);
  const [message1, setMessage1] = useState("");
  const [message2, setMessage2] = useState("");
  const [message3, setMessage3] = useState("");

  const goToStep1 = () => {
    setMessage1("");
    setActiveStep(0);
  };

  const goBackToStep2 = () => {
    setMessage2("");
    setActiveStep(1);
  };

  const goToStep2 = () => {
    setMessage2("");
    if (modalitateLivrare === "ridicarepersonala") setActiveStep(1);
    if (
      modalitateLivrare === "curier" &&
      oras &&
      strada &&
      nrStrada &&
      apartament
    )
      setActiveStep(1);
    else setMessage1("Nu ai furnizat toate datele necesare");
  };

  const goToStep3 = () => {
    setMessage3("");
    if (nume && prenume && nrTel && email) setActiveStep(2);
    else setMessage2("Nu ai furnizat toate datele necesare");
  };

  const plaseazaComanda = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardElement);
    const { error, token } = await stripe.createToken(cardElement);
    console.log(token, "toen");
    if (!error) {
      axios
        .post("http://localhost:8080/api/stripe/charge", {
          token: token.id,
          currency: "RON",
          price: getValoareTotala(),
        })
        .then((resp) => {
          console.log("Your payment was successful");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log(error);
    }
    if (token && token.id) {
      let adresaLivrareCurenta = {};
      adresaLivrareCurenta = {
        ...adresaLivrareCurenta,
        oras,
        strada,
        nrStrada,
        apartament,
      };
      if (bloc) adresaLivrareCurenta = { ...adresaLivrareCurenta, bloc };
      if (scara) adresaLivrareCurenta = { ...adresaLivrareCurenta, scara };
      if (etaj) adresaLivrareCurenta = { ...adresaLivrareCurenta, etaj };
      let date = {};
      date = { ...date, nume, prenume, nrTel, email };

      const currentOrder = {
        cosCumparaturi: getCurrentCart()[0],
        data: new Date(),
        valoareProduse: getCartContent()[1],
        taxaLivrare: getCostLivrare(),
        discount: getDiscount(),
        modalitatePlata: "card",
        status: "plasata",
        adresaLlivrare: adresaLivrareCurenta,
        datePersonale: date,
      };
      if (auth) {
        let userCurrentOrder = { ...currentOrder, idUtilizator: auth._id };
        dispatch(addOrder("http://localhost:8080/orders", userCurrentOrder));
      } else {
        dispatch(addOrder("http://localhost:8080/orders", currentOrder));
      }
    }
    
  };

  useEffect(() => {
    dispatch(setProducts("http://localhost:8080/products"));
    dispatch(setCarts("http://localhost:8080/shoppingCart"));
    dispatch(setUsers("http://localhost:8080/users"));
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
          Finalizeaza comanda
        </Typography>
        <Grid sx={{ marginLeft: "20px", marginTop: "30px" }}>
          {getCurrentCart().length > 0 &&
          getCurrentCart()[0].produse.length > 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "50%",
                  marginRight: "15%",
                  textAlign: "left",
                }}
              >
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                {activeStep === 0 ? (
                  <>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: "50px",
                        alignItems: "center",
                      }}
                    >
                      <Avatar sx={{ bgcolor: "rgb(72, 81, 101)" }}>1</Avatar>
                      <Typography
                        sx={{
                          fontSize: "28px",
                          fontWeight: 700,
                          marginLeft: "10px",
                        }}
                      >
                        Modalitate livrare
                      </Typography>
                    </div>
                    <FormControl sx={{ marginTop: "20px", marginLeft: "10px" }}>
                      <RadioGroup
                        sx={{ justifyContent: "space-evenly" }}
                        row
                        value={modalitateLivrare}
                        onChange={changeModalitateLivrare}
                      >
                        <FormControlLabel
                          value="curier"
                          control={<Radio />}
                          label="Livrare prin curier"
                        />
                        <FormControlLabel
                          sx={{ marginLeft: "30px" }}
                          value="ridicarepersonala"
                          control={<Radio />}
                          label="Ridicare personala"
                        />
                      </RadioGroup>
                    </FormControl>
                    {modalitateLivrare === "curier" ? (
                      <div
                        style={{
                          alignItems: "center",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <TextField
                          sx={{ width: "200px", marginTop: "30px" }}
                          required
                          label="Oras"
                          variant="outlined"
                          value={oras}
                          onChange={changeOras}
                        />
                        <TextField
                          sx={{ width: "200px", marginTop: "25px" }}
                          required
                          label="Nume strada"
                          variant="outlined"
                          value={strada}
                          onChange={changeStrada}
                        />
                        <TextField
                          sx={{ width: "200px", marginTop: "25px" }}
                          required
                          label="Numar strada"
                          variant="outlined"
                          value={nrStrada}
                          onChange={changeNrStrada}
                        />
                        <TextField
                          sx={{ width: "200px", marginTop: "25px" }}
                          label="Bloc"
                          variant="outlined"
                          value={bloc}
                          onChange={changeBloc}
                        />
                        <TextField
                          sx={{ width: "200px", marginTop: "25px" }}
                          label="Scara"
                          variant="outlined"
                          value={scara}
                          onChange={changeScara}
                        />
                        <TextField
                          required
                          sx={{ width: "200px", marginTop: "25px" }}
                          label="Numar locuinta"
                          variant="outlined"
                          value={apartament}
                          onChange={changeApartament}
                        />
                        <TextField
                          sx={{ width: "200px", marginTop: "25px" }}
                          label="Etaj"
                          variant="outlined"
                          value={etaj}
                          onChange={changeEtaj}
                        />
                        {auth ? (
                          <FormGroup
                            sx={{ alignItems: "center", marginTop: "15px" }}
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  label="Foloseste o adresa existenta"
                                  checked={isDefaultAddress}
                                  onChange={changeIsDefaultAddress}
                                  inputProps={{ "aria-label": "controlled" }}
                                />
                              }
                              label="Foloseste o adresa existenta"
                            />
                          </FormGroup>
                        ) : null}
                      </div>
                    ) : (
                      <div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            marginLeft: "15px",
                            marginTop: "30px",
                          }}
                        >
                          <LocalShippingIcon />
                          <Typography sx={{ marginBottom: "15px" }}>
                            Comanda livrata de{" "}
                            <span style={{ fontWeight: 700 }}>
                              ART WOOD CRAFTING
                            </span>
                          </Typography>
                        </div>
                        <Divider />
                        <Typography
                          sx={{ marginLeft: "17px", marginTop: "20px" }}
                        >
                          Numar produse:
                          <span style={{ marginLeft: "10px", fontWeight: 700 }}>
                            {getCartContent()[0]}
                          </span>
                        </Typography>
                        <Typography
                          sx={{ marginLeft: "17px", marginTop: "20px" }}
                        >
                          Pret livrare:
                          <span style={{ marginLeft: "10px", fontWeight: 700 }}>
                            {getCostLivrare()} lei
                          </span>
                        </Typography>
                        <Typography
                          sx={{ marginLeft: "17px", marginTop: "20px" }}
                        >
                          Estimat livrare:
                          <span style={{ marginLeft: "10px", fontWeight: 700 }}>
                            {getCurrentDate()}
                          </span>
                        </Typography>
                      </div>
                    )}
                    <Button variant="contained" sx={styles} onClick={goToStep2}>
                      Pasul urmator
                    </Button>
                    {modalitateLivrare === "curier" ? (
                      <Typography
                        sx={{
                          marginTop: "15px",
                          color: "red",
                          textAlign: "center",
                        }}
                      >
                        {message1}
                      </Typography>
                    ) : null}
                  </>
                ) : activeStep === 1 ? (
                  <>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: "50px",
                        alignItems: "center",
                      }}
                    >
                      <Avatar sx={{ bgcolor: "rgb(72, 81, 101)" }}>2</Avatar>
                      <Typography
                        sx={{
                          fontSize: "28px",
                          fontWeight: 700,
                          marginLeft: "10px",
                        }}
                      >
                        Date facturare
                      </Typography>
                    </div>
                    <div
                      style={{
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <TextField
                        sx={{ width: "200px", marginTop: "30px" }}
                        required
                        label="Nume"
                        variant="outlined"
                        value={nume}
                        onChange={changeNume}
                      />
                      <TextField
                        sx={{ width: "200px", marginTop: "25px" }}
                        required
                        label="Prenume"
                        variant="outlined"
                        value={prenume}
                        onChange={changePrenume}
                      />
                      <TextField
                        sx={{ width: "200px", marginTop: "25px" }}
                        required
                        label="Numar de telefon"
                        variant="outlined"
                        value={nrTel}
                        onChange={changeNrTel}
                      />
                      <TextField
                        sx={{ width: "200px", marginTop: "25px" }}
                        required
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={changeEmail}
                      />
                      {auth ? (
                        <FormGroup
                          sx={{ alignItems: "center", marginTop: "15px" }}
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                label="Foloseste datele personale existente"
                                checked={isDefaultData}
                                onChange={changeIsDefaultData}
                                inputProps={{ "aria-label": "controlled" }}
                              />
                            }
                            label="Foloseste datele personale existente"
                          />
                        </FormGroup>
                      ) : null}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignSelf: "center",
                      }}
                    >
                      <Button
                        variant="contained"
                        sx={styles1}
                        onClick={goToStep1}
                      >
                        Pasul anterior
                      </Button>
                      <Button
                        variant="contained"
                        sx={styles}
                        onClick={goToStep3}
                      >
                        Pasul urmator
                      </Button>
                    </div>
                    <Typography
                      sx={{
                        marginTop: "15px",
                        color: "red",
                        textAlign: "center",
                      }}
                    >
                      {message2}
                    </Typography>
                  </>
                ) : (
                  <>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: "50px",
                        alignItems: "center",
                      }}
                    >
                      <Avatar sx={{ bgcolor: "rgb(72, 81, 101)" }}>3</Avatar>
                      <Typography
                        sx={{
                          fontSize: "28px",
                          fontWeight: 700,
                          marginLeft: "10px",
                        }}
                      >
                        Modalitate de plata
                      </Typography>
                    </div>
                    <Alert
                      sx={{ marginTop: "20px", width: "fit-content" }}
                      severity="info"
                    >
                      Alege plata cu cardul online și comandă în siguranță și
                      fără costuri suplimentare.
                    </Alert>
                    <div className="sr-combo-inputs">
                      <div className="sr-combo-inputs-row">
                        <div className="sr-combo-inputs-row">
                          <CardElement
                            className="sr-input sr-card-element"
                            options={options}
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignSelf: "center",
                      }}
                    >
                      <Button
                        variant="contained"
                        sx={styles1}
                        onClick={goBackToStep2}
                      >
                        Pasul anterior
                      </Button>
                      <Button
                        variant="contained"
                        sx={styles}
                        onClick={plaseazaComanda}
                      >
                        Plaseaza comanda
                      </Button>
                    </div>
                    <Typography
                      sx={{
                        marginTop: "15px",
                        color: "red",
                        textAlign: "center",
                      }}
                    >
                      {message3}
                    </Typography>
                  </>
                )}
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
                    <Divider />
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
                  {promoCodeFinal !== "eok" && promoCodeFinal !== "nue" ? (
                    <Typography sx={{ color: "red" }}>
                      Acest cod promotional nu exista
                    </Typography>
                  ) : null}
                </Card>
              </div>
            </div>
          ) : null}
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

const styles = {
  "&.MuiButton-root": {
    border: "1px black solid",
    borderRadius: 28,
    backgroundColor: "#2E3B55",
    marginBottom: 1,
    width: "fit-content",
    alignSelf: "center",
    marginTop: "20px",
  },
  "&.MuiButton-text": {
    color: "#2E3B55",
  },
};

const styles1 = {
  "&.MuiButton-root": {
    border: "1px black solid",
    borderRadius: 28,
    backgroundColor: "#2E3B55",
    marginBottom: 1,
    width: "fit-content",
    alignSelf: "center",
    marginTop: "20px",
    marginRight: "20px",
  },
  "&.MuiButton-text": {
    color: "#2E3B55",
  },
};

const options = {
  style: {
    base: {
      color: "#32325d",
      padding: "20px",
      fontSize: "25px",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

export default Checkout;
