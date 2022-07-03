import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { editUser } from "../store/actions/users";
import { useAuth } from "../Utils/context";

const theme = createTheme();

export default function EditAdresaLivrare({ currentUser, onEditProfile }) {
  const auth = useAuth()
  const [county, setCounty] = useState(currentUser.county || '');
  const [city, setCity] = useState(currentUser.city || '');
  const [sector, setSector] = useState(currentUser.sector || '');
  const [streetName, setStreetName] = useState(currentUser.streetName || '');
  const [streetNumber, setStreetNumber] = useState(currentUser.streetNumber || '');
  const [bloc, setBloc] = useState(currentUser.bloc || '');
  const [scara, setScara] = useState(currentUser.scara || '');
  const [apartmentNumber, setApartmentNumber] = useState(currentUser.apartmentNumber || '');
  const [etaj, setEtaj] = useState(currentUser.etaj || '');

  const changeCounty = (event) => {
    setCounty(event.target.value);
  };

  const changeCity = (event) => {
    setCity(event.target.value);
  };

  const changeSector = (event) => {
    setSector(event.target.value);
  };

  const changeStreetName = (event) => {
    setStreetName(event.target.value);
  };

  const changeStreetNumber = (event) => {
    setStreetNumber(event.target.value);
  };

  const changeBloc = (event) => {
    setBloc(event.target.value);
  };

  const changeScara = (event) => {
    setScara(event.target.value);
  };

  const changeApartamentNumber = (event) => {
    setApartmentNumber(event.target.value);
  };

  const changeEtaj = (event) => {
    setEtaj(event.target.value);
  };

  const dispatch = useDispatch();

  const editCurrentUser = () => {
    const updatedCurrentUserData = { ...currentUser, county: county, city: city, sector: sector, streetName: streetName, streetNumber: streetNumber, bloc: bloc, scara: scara, apartmentNumber: apartmentNumber, etaj: etaj }
    dispatch(editUser(`https://backend-r4zkv.ondigitalocean.app/users/${auth._id}`,
      updatedCurrentUserData))
    onEditProfile()
  }

  const renuntaLaEdit = () => {
    onEditProfile()
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: '40px'
          }}
        >
          <Typography sx={{ marginBottom: '30px', fontWeight: '600', fontSize: '24px' }}>Adresa livrare</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="county"
                fullWidth
                label="Judet"
                value={county}
                onChange={changeCounty}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Oras"
                name="city"
                value={city}
                onChange={changeCity}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Sector"
                name="sector"
                value={sector}
                onChange={changeSector}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Strada"
                name="streetName"
                value={streetName}
                onChange={changeStreetName}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Numarul strazii"
                name="streetNumber"
                value={streetNumber}
                onChange={changeStreetNumber}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Bloc"
                name="bloc"
                value={bloc}
                onChange={changeBloc}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Scara"
                name="scara"
                value={scara}
                onChange={changeScara}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Numarul locuintei"
                name="apartmentNumber"
                value={apartmentNumber}
                onChange={changeApartamentNumber}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Etaj"
                name="etaj"
                value={etaj}
                onChange={changeEtaj}
              />
            </Grid>

          </Grid>
          <div style={{
            display: 'flex', flexDirection: 'row', width: '100%',
            justifyContent: 'space-around'
          }}>
            <Button onClick={editCurrentUser} variant="contained" sx={styles}>
              Salveaza
            </Button>
            <Button onClick={renuntaLaEdit} variant="contained" sx={styles2}>
              Renunta
            </Button>
          </div>
        </Box>
      </Container>
    </ThemeProvider >
  );
}

const styles = {
  "&.MuiButton-root": {
    backgroundColor: "#2E3B55",
    mt: 3,
    mb: 2,
  },
  "&.MuiButton-text": {
    color: "#2E3B55",
  },
};

const styles2 = {
  "&.MuiButton-root": {
    backgroundColor: "#CF112C",
    mt: 3,
    mb: 2,
  },
  "&.MuiButton-text": {
    color: "#2E3B55",
  },
};
