import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import RatingsPage from "./RatingsPage";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { minHeight } from "@mui/system";

const Footer = () => {
    return (
        <Grid sx={firstDivStyle}>
            <Grid sx={gridStyle}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{
                    justifyContent: 'left',
                    textAlign: 'left',
                    paddingLeft: '100px',
                    alignItems: 'center'
                }} >
                    <Grid item xs={3}>
                        <Typography sx={typographyStyle}>Link-uri utile</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Link to={`/desprenoi`}>
                            <Typography sx={typographyStyle2}>Despre noi</Typography>
                        </Link>
                        <Link to={`/angajamente`}>
                            <Typography sx={typographyStyle2}>Angajamente</Typography>
                        </Link>
                        <Link to={`/intrebarifrecvente`}>
                            <Typography sx={typographyStyle2}>Intrebari frecvente</Typography>
                        </Link>
                    </Grid>
                    <Grid item xs={3}>
                        <Link to={`/modalitatideplata`}>
                            <Typography sx={typographyStyle2}>Modalitati de plata</Typography>
                        </Link>
                        <Link to={`/conditiidelivrare`}>
                            <Typography sx={typographyStyle2}>Conditii de livrare</Typography>
                        </Link>
                        <Link to={`/politicideretur`}>
                            <Typography sx={typographyStyle2}>Politici de retur</Typography>
                        </Link>
                    </Grid>
                    <Grid item xs={3}>
                        <Link to={`/reclamatii`}>
                            <Typography sx={typographyStyle2}>Reclamatii</Typography>
                        </Link>
                        <Link to={`/devinoinfluencer`}>
                            <Typography sx={typographyStyle2}>Devino influencer</Typography>
                        </Link>
                        <Link to={`/cariere`}>
                            <Typography sx={typographyStyle2}>Cariere</Typography>
                        </Link>
                    </Grid>
                </Grid>
                <Divider sx={{ marginTop: '20px' }} />
                <Grid sx={firstDivStyle2}>
                    <Grid item xs={0.5} sx={{ marginRight: '10px', backgroundColor: 'white' }}>
                        <img style={{ marginTop: '5px' }} src='https://cdn.notinoimg.com/assets/img/payments/visa.39d96ca.png' width="40px" height="27px" alt="carousel7" ></img>
                    </Grid>
                    <Grid item xs={0.5} sx={{ marginLeft: '10px', backgroundColor: 'white' }}>
                        <img style={{ marginTop: '5px' }} src='https://cdn.notinoimg.com/assets/img/payments/mc.480a4dd.png' width="40px" height="27px" alt="carousel8"></img>
                    </Grid>
                    <Grid item xs={8} sx={{ backgroundColor: 'white' }}>
                    </Grid>
                    <Grid item xs={1} sx={{ marginRight: '10px', color: 'white' }}>
                        <Typography sx={{ marginLeft: '5px', fontSize: '23px', fontWeight: 700 }}>Contact</Typography>
                        <Typography sx={{ fontSize: '15px', marginLeft: '10px', marginBottom: '10px', marginTop: '10px' }}>0726629229</Typography>
                        <Typography sx={{ fontSize: '15px', marginLeft: '10px' }}>dabeauty@gmail.com</Typography>
                    </Grid>
                    <Grid item xs={1} sx={{ marginRight: '10px', color: 'white' }}>
                    </Grid>
                </Grid>
                <Typography sx={{ color: 'white' }}>© 2022 DABeauty, s.r.o. (SRL)</Typography>
            </Grid>
        </Grid >
    );
};

const firstDivStyle = {
    backgroundColor: 'rgb(72, 81, 101)',
    minHeight: '200px'
};

const gridStyle = {
    "@media (min-width: 2100px)": {
        width: "65%",
        margin: "auto",
    },
}

const typographyStyle = {
    color: 'white',
    textDecoration: 'none'
}

const typographyStyle2 = {
    color: 'white',
    textDecoration: 'none',
    marginTop: '12px',
}

const firstDivStyle2 = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: '90%',
    margin: 'auto',
    marginTop: '40px',
    marginLeft: '100px'
};
export default Footer;
