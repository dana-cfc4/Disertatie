import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import roLocale from "date-fns/locale/ro";
import { useDispatch } from "react-redux";
import { signUp, signIn } from "../store/actions/users";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const theme = createTheme();

export default function SignUp({ mode, handleCloseRegisterModal }) {
  const [birthday, setBirthday] = useState(new Date());
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [modalMode, setModalMode] = useState(mode);

  const changeFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const changeLastName = (event) => {
    setLastName(event.target.value);
  };

  const changeEmailAddress = (event) => {
    setEmailAddress(event.target.value);
  };

  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  const changeRepeatPassword = (event) => {
    setRepeatPassword(event.target.value);
  };

  const changePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  const changeBirthday = (birthday) => {
    setBirthday(birthday);
  };

  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const role = "user";
  const puncteFidelitate = 0
  const authenticateMode = {
    signIn: () => dispatch(signIn({ emailAddress, password })),
    signUp: () =>
      dispatch(
        signUp({
          firstName,
          lastName,
          emailAddress,
          phoneNumber,
          password,
          repeatPassword,
          birthday,
          role,
          puncteFidelitate
        })
      ),
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    authenticateMode[modalMode]().then((response) => {
      if (response.status) {
        handleCloseRegisterModal(event);
      } else setMessage(response.message);
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#2E3B55" }}>
            <AccountCircleOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {modalMode === "signUp" ? "Înregistrează-te" : "Loghează-te"}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              {modalMode === "signUp" ? (
                <>
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
                </>
              ) : null}
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
                  name="password"
                  label="Parolă"
                  type="password"
                  value={password}
                  onChange={changePassword}
                />
              </Grid>
              {modalMode === "signUp" ? (
                <>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="repeatPassword"
                      label="Repetă parola"
                      type="password"
                      value={repeatPassword}
                      onChange={changeRepeatPassword}
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
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="Vreau să primesc promoții de marketing și noutăți prin email."
                    />
                  </Grid>
                </>
              ) : null}
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={styles}>
              {modalMode === "signUp" ? "Înregistreză-te" : "Loghează-te"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  variant="body2"
                  onClick={
                    modalMode === "signIn"
                      ? () => setModalMode("signUp")
                      : () => setModalMode("signIn")
                  }
                >
                  {modalMode === "signUp"
                    ? " Deja ai cont? Loghează-te"
                    : "Încă nu ai cont? Înregistrează-te"}
                </Link>
              </Grid>
            </Grid>
            <p>{message}</p>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
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
