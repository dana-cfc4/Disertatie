import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import roLocale from "date-fns/locale/ro";
import { useDispatch } from "react-redux";
import { editUser } from "../store/actions/users";
import { useAuth } from "../Utils/context";

const theme = createTheme();

export default function EditPersonalProfile({ currentUser, onEditProfile }) {
  const auth = useAuth()
  const [firstName, setFirstName] = useState(currentUser.firstName || '');
  const [lastName, setLastName] = useState(currentUser.lastName || '');
  const [emailAddress, setEmailAddress] = useState(currentUser.emailAddress || '');
  const [phoneNumber, setPhoneNumber] = useState(currentUser.phoneNumber || '');
  const [birthday, setBirthday] = useState(new Date(currentUser.birthday) || new Date());

  const changeFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const changeLastName = (event) => {
    setLastName(event.target.value);
  };

  const changeEmailAddress = (event) => {
    setEmailAddress(event.target.value);
  };

  const changePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  const changeBirthday = (birthday) => {
    setBirthday(birthday);
  };

  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  const editCurrentUser = () => {
    if (firstName && lastName && emailAddress && phoneNumber) {
      const updatedCurrentUserData = { ...currentUser, firstName: firstName, lastName: lastName, emailAddress: emailAddress, phoneNumber: phoneNumber, birthday: birthday }
      dispatch(editUser(`https://backend-r4zkv.ondigitalocean.app/users/${auth._id}`,
        updatedCurrentUserData))
      onEditProfile()
    }
    else setMessage('Nu au fost completate toate campurile')
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
          <Typography sx={{ marginBottom: '30px', fontWeight: '600', fontSize: '24px' }}>Date personale</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                required
                fullWidth
                label="Prenume"
                value={firstName}
                onChange={changeFirstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Nume"
                name="lastName"
                value={lastName}
                onChange={changeLastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Adresă de email"
                name="emailAddress"
                value={emailAddress}
                onChange={changeEmailAddress}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Număr de telefon"
                name="phoneNumber"
                value={phoneNumber}
                onChange={changePhoneNumber}
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                locale={roLocale}
              >
                <Stack spacing={3}>
                  <MobileDatePicker
                    inputFormat="MM/dd/yyyy"
                    value={birthday}
                    name="birthday"
                    onChange={changeBirthday}
                    cancelText="Anulare"
                    okText="OK"
                    toolbarTitle=""
                    label="Data nașterii"
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
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
          <p style={{ color: 'red' }}>{message}</p>
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
