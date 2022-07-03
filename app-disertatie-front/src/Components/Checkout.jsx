import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../Utils/context";
import { setProducts } from "../store/actions/products";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import FormGroup from "@mui/material/FormGroup";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import ListItem from "@mui/material/ListItem";
import CardMedia from "@mui/material/CardMedia";
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
import { setUsers, editUser } from "../store/actions/users";
import "../styles.css";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Checkbox from "@mui/material/Checkbox";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { addOrder, setOrders } from "../store/actions/orders";
import { useNavigate } from "react-router-dom";
import {
  editCart,
  editCartNoUser
} from "../store/actions/shoppingCarts";
import "../styles.css";
import * as emailjs from 'emailjs-com'
import { months } from "../constant";

const Checkout = () => {
  const navigate = useNavigate();
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

  const selectOrders = (state) => state.orders;
  const { orders } = useSelector(selectOrders);

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
    if (promoCode !== "PR" + auth._id) {
      setPromoCodeFinal("nueok")
    }
    else {
      setPromoCodeFinal("eok")
      if (isPuncteFidelitate) {
        setIsPuncteFidelitate(false)
        setMesajPuncteFidelitate('Deja ai aplicat un discount')
      }
    };
  };

  const getCostLivrare = () => {
    if (getCartContent()[1] >= 200) return 0;
    else return 15;
  };

  const getDiscount = () => {
    if (promoCodeFinal === "eok")
      return (0.1 * (getCartContent()[1] + getCostLivrare())).toFixed(2);
    else if (isPuncteFidelitate)
      return (0.15 * (getCartContent()[1] + getCostLivrare())).toFixed(2);
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
  const [isPuncteFidelitate, setIsPuncteFidelitate] = useState(false);
  const [mesajPuncteFidelitate, setMesajPuncteFidelitate] = useState('');

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

  const changeIsPuncteFidelitate = (event) => {
    const currentUserPuncte = usersList.find(user => user._id === auth._id).puncteFidelitate
    if (currentUserPuncte >= 50) {
      if (event.target.checked) {
        if (promoCodeFinal !== 'nue')
          setPromoCodeFinal('altul')
        setIsPuncteFidelitate(true)
      }
      else {
        setIsPuncteFidelitate(false)
      }
    }
    else setMesajPuncteFidelitate('Nu ai suficiente puncte de fidelitate')
  }

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

  const [promoCodeGiven, setPromoCodeGiven] = useState('')
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

    if (!error) {
      axios
        .post("https://backend-r4zkv.ondigitalocean.app/api/stripe/charge", {
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
        dispatch(addOrder("https://backend-r4zkv.ondigitalocean.app/orders", userCurrentOrder));
      } else {
        dispatch(addOrder("https://backend-r4zkv.ondigitalocean.app/orders", currentOrder));
      }

      if (auth && auth._id) {
        const currentUserData = usersList.find(user => user._id === auth._id)
        let valoarePuncte = 0
        if (parseInt(getValoareTotala()) >= 150 && parseInt(getValoareTotala()) < 300)
          valoarePuncte = 10
        else if (parseInt(getValoareTotala()) >= 300 && parseInt(getValoareTotala()) < 500)
          valoarePuncte = 20
        else if (parseInt(getValoareTotala()) >= 500)
          valoarePuncte = 30
        setPromoCodeGiven('PR' + auth._id)
        const takenPoints = currentUserData.puncteFidelitate >= 50 ? 50 : 0
        const updatedCurrentUserData = { ...currentUserData, puncteFidelitate: parseInt(currentUserData.puncteFidelitate) + valoarePuncte - takenPoints }
        dispatch(editUser(`https://backend-r4zkv.ondigitalocean.app/users/${auth._id}`,
          updatedCurrentUserData))
        const currentUserCart = getCurrentCart()
        currentUserCart[0].produse.length = 0
        dispatch(
          editCart(
            `https://backend-r4zkv.ondigitalocean.app/shoppingCart/${currentUserCart[0]._id}`,
            currentUserCart[0]
          )
        );
      }
      else {
        currentSessionCarts[0].produse.length = 0
        dispatch(editCartNoUser(currentSessionCarts));
      }
      setOpenThankYouModal(true)
    }
  };

  const [openThankYouModal, setOpenThankYouModal] = useState(false);

  const getCorrectFormatOfDate = (date) => {
    const dateConverted = new Date(date);
    const day = dateConverted.getDate().toString();
    const correctDay = day.length === 1 ? "0" + day : day;
    const month = dateConverted.getMonth().toString();
    const correctMonth = months[month];
    const year = dateConverted.getFullYear();
    return correctDay + " " + correctMonth.slice(0, 3) + ". " + year;
  };

  const handleCloseThankYouModal = () => {
    const currentUser = usersList.find(user => user._id === auth._id)
    const userOrders = orders.filter(order => order.idUtilizator === auth._id)
    const currentUserLastOrder = userOrders[userOrders.length - 1]
    const produseComandate = currentUserLastOrder.cosCumparaturi.produse
    const to_name = currentUser.lastName + ' ' + currentUser.firstName
    if (auth) {
      let emailObject = {
        to_name: to_name,
        id_comanda: currentUserLastOrder._id,
        data_comanda: getCorrectFormatOfDate(currentUserLastOrder.data),
        strada: strada,
        nr_strada: nrStrada,
        numar_telefon: nrTel,
        subtotal: currentUserLastOrder.valoareProduse,
        taxa_livrare: currentUserLastOrder.taxaLivrare,
        discount: currentUserLastOrder.discount,
        val_totala: currentUserLastOrder.valoareProduse + currentUserLastOrder.taxaLivrare - currentUserLastOrder.discount
      }

      if (produseComandate[0]) {
        const prod = products.find(produs => produs._id === produseComandate[0].idProdus)
        emailObject = {
          ...emailObject, produs1_denumire: prod.denumire,
          produs1_culoare: produseComandate[0].culoare,
          produs1_cantitate: produseComandate[0].cantitate
        }
      }

      if (produseComandate[1]) {
        const prod = products.find(produs => produs._id === produseComandate[1].idProdus)
        emailObject = {
          ...emailObject, produs2_denumire: prod.denumire,
          produs2_culoare: produseComandate[1].culoare,
          produs2_cantitate: produseComandate[1].cantitate
        }
      }

      if (produseComandate[2]) {
        const prod = products.find(produs => produs._id === produseComandate[2].idProdus)
        emailObject = {
          ...emailObject, produs3_denumire: prod.denumire,
          produs3_culoare: produseComandate[2].culoare,
          produs3_cantitate: produseComandate[2].cantitate
        }
      }

      if (produseComandate[3]) {
        const prod = products.find(produs => produs._id === produseComandate[3].idProdus)
        emailObject = {
          ...emailObject, produs4_denumire: prod.denumire,
          produs4_culoare: produseComandate[3].culoare,
          produs4_cantitate: produseComandate[3].cantitate
        }
      }

      if (produseComandate[4]) {
        const prod = products.find(produs => produs._id === produseComandate[4].idProdus)
        emailObject = {
          ...emailObject, produs5_denumire: prod.denumire,
          produs5_culoare: produseComandate[4].culoare,
          produs5_cantitate: produseComandate[4].cantitate
        }
      }

      if (produseComandate[5]) {
        const prod = products.find(produs => produs._id === produseComandate[5].idProdus)
        emailObject = {
          ...emailObject, produs6_denumire: prod.denumire,
          produs6_culoare: produseComandate[5].culoare,
          produs6_cantitate: produseComandate[5].cantitate
        }
      }

      if (produseComandate[6]) {
        const prod = products.find(produs => produs._id === produseComandate[6].idProdus)
        emailObject = {
          ...emailObject, produs7_denumire: prod.denumire,
          produs7_culoare: produseComandate[6].culoare,
          produs7_cantitate: produseComandate[6].cantitate
        }
      }

      if (produseComandate[7]) {
        const prod = products.find(produs => produs._id === produseComandate[7].idProdus)
        emailObject = {
          ...emailObject, produs8_denumire: prod.denumire,
          produs8_culoare: produseComandate[7].culoare,
          produs8_cantitate: produseComandate[7].cantitate
        }
      }

      if (produseComandate[8]) {
        const prod = products.find(produs => produs._id === produseComandate[8].idProdus)
        emailObject = {
          ...emailObject, produs9_denumire: prod.denumire,
          produs9_culoare: produseComandate[8].culoare,
          produs9_cantitate: produseComandate[8].cantitate
        }
      }

      if (produseComandate[9]) {
        const prod = products.find(produs => produs._id === produseComandate[9].idProdus)
        emailObject = {
          ...emailObject, produs10_denumire: prod.denumire,
          produs10_culoare: produseComandate[9].culoare,
          produs10_cantitate: produseComandate[9].cantitate
        }
      }

      emailjs.send('service_iirkagh', 'template_5cfinax',
        emailObject, 'Ak9QRoefpgzrj3nmE')
        .then((result) => {
          console.log('email sent successfully');
        }, (error) => {
          alert('error sending email');
        });
    }
    setOpenThankYouModal(false);
    navigate(`/cosdecumparaturi`);
  };

  const getLastOrder = () => {
    if (auth) {
      const currentUser = usersList.find(user => user._id === auth._id)
      const userOrders = orders.filter(order => order.idUtilizator === auth._id)
      const currentUserLastOrder = userOrders[userOrders.length - 1]
      return currentUserLastOrder
    }
    else return {}
  }
  const vizualizeazaComanda = () => {
    const idComanda = getLastOrder() ? getLastOrder()._id : ''
    navigate(`/comenzilemele/${idComanda}`);
  }

  useEffect(() => {
    dispatch(setProducts("https://backend-r4zkv.ondigitalocean.app/products"));
    dispatch(setCarts("https://backend-r4zkv.ondigitalocean.app/shoppingCart"));
    dispatch(setUsers("https://backend-r4zkv.ondigitalocean.app/users"));
    dispatch(setOrders("https://backend-r4zkv.ondigitalocean.app/orders"));
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
                  {promoCodeFinal !== "eok" && promoCodeFinal !== "nue" && promoCodeFinal !== 'altul' ? (
                    <Typography sx={{ color: "red" }}>
                      Acest cod promotional nu exista
                    </Typography>
                  ) : null}
                  {promoCodeFinal === 'altul' ? (
                    <Typography sx={{ color: "red" }}>
                      Ai aplicat deja un discount
                    </Typography>
                  ) : null}
                </Card>

                {auth ?
                  <Card sx={{ minWidth: 280, marginTop: "40px" }}>
                    <CardContent>
                      <Typography sx={{ fontWeight: 700 }}>Detii {usersList.find(user => user._id === auth._id) ? usersList.find(user => user._id === auth._id).puncteFidelitate : '0'} puncte de fidelitate</Typography>
                      <FormGroup
                        sx={{ alignItems: "center", marginTop: "15px" }}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              label="Foloseste puncte fidelitate"
                              checked={isPuncteFidelitate}
                              onChange={changeIsPuncteFidelitate}
                              inputProps={{ "aria-label": "controlled" }}
                            />
                          }
                          label="Foloseste puncte fidelitate"
                        />
                      </FormGroup>
                    </CardContent>
                    <Alert
                      sx={{ marginBottom: "20px", width: "fit-content" }}
                      severity="info"
                    >
                      50 de puncte de fidelitate iti ofera un discount de 15%
                    </Alert>
                    {!mesajPuncteFidelitate ? (
                      <Typography sx={{ color: "red" }}>
                        {mesajPuncteFidelitate}
                      </Typography>
                    ) : null}
                  </Card> : null}
              </div>
            </div>
          ) : null}
          <Modal
            sx={{ overflow: "scroll" }}
            open={openThankYouModal}
            onClose={handleCloseThankYouModal}
          >
            <Box sx={boxStyle}>
              <Grid sx={{
                justifyContent: 'center',
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }} container>
                <Card
                  sx={{
                    border: "none",
                    boxShadow: "none",
                    marginTop: "10px",
                    marginRight: "10px",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="250"
                    width="300"
                    image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgGa_nOhFNJnWdIZsAMoUCyTD-18X8KYEpTw&usqp=CAU'
                    alt={'Confirma comanda'}
                    sx={{
                      display: "inline - block",
                      position: "relative",
                      margin: 'auto',
                      height: "250px",
                      width: "300px"
                    }}
                  />
                  <CardContent
                    sx={{ textAlign: "justify", marginLeft: "7px" }}
                  >
                    <Typography sx={{ fontWeight: "700", fontSize: "27px", textAlign: 'center' }}>
                      Multumim pentru comanda, {prenume}!
                    </Typography>
                    <Typography sx={{ fontSize: '20px', marginTop: '55px' }}>Comanda cu numarul {<strong>#{getLastOrder() ? getLastOrder()._id : ''}</strong>} a fost inregistrata cu succes.</Typography>

                    <Typography sx={{ fontSize: '20px', marginTop: '25px' }}>Un email de confirmare a fost transmis catre {email}.</Typography>
                    {auth && orders.filter(comanda => comanda.idUtilizator === auth._id).length % 5 === 0 ? <Typography sx={{ fontSize: '20px', marginTop: '25px' }}>Codul tau promotional este: {<strong>PR{auth._id}</strong>}</Typography> : null}
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '60px' }}>
                      <Button
                        variant="contained"
                        sx={styles}
                        onClick={vizualizeazaComanda}
                      >
                        Vizualizeaza comanda
                      </Button>
                      <Button
                        variant="contained"
                        sx={styles}
                        onClick={handleCloseThankYouModal}
                      >
                        Inapoi la cosul tau
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </Box>
          </Modal>
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

const boxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  height: "80%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "1.5px solid #000",
  boxShadow: 24,
  p: 4,
  "@media (min-width: 2100px)": {
    width: "45%",
  },
};

export default Checkout;
