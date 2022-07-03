import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const About = () => {
  return (
    <Grid sx={gridStyle}>
      <Typography sx={{ fontSize: '30px', fontWeight: 700 }}>Despre noi</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>Noi, cei de la DABeauty credem că frumusețea ar trebui să fie accesibilă oricui, pentru că aduce încredere și schimbări pozitive în viața fiecăruia. Oamenii care se simt mai frumoși își ating mai ușor obiectivele și, la rândul lor, fac lumea din jur mai frumoasă.</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>Călătoria noastră a început în anul 2022 în Romania. De la începutul activității noastre, obiectivul principal a fost să facem Europa mai frumoasă. Toți clientii nostri mulțumiți, sunt dovada că ne îndreptăm într-o direcție bună. În același timp este și un mare angajament. Un angajament care trebuie îmbunătățit zi de zi, alegerea produselor de calitate superioară și livrarea acestora cât mai repede posibil creând experiențe de neuitat la cumpărături. Angajamentul de a continua împreună pentru a face frumusețea mai accesibilă. Cu fiecare ocazie. Oriunde în lume.</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '30px', width: '85%', textAlign: 'justify', fontSize: '25px' }}>O selecție variată de parfumuri și produse cosmetice întotdeauna la prețuri excelente</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>În ultimul an, mulțumită vouă am devenit magazinul online cu o selecție variată de parfumuri și produse cosmetice. Astăzi, puteți alege dintre produse unice de la branduri globale sau locale. Lucrăm constant pentru a vă oferi oferte noi și mai bune în fiecare zi.</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '30px', width: '85%', textAlign: 'justify', fontSize: '25px' }}>Expediem până la 140.000 de colete pe zi</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>Încercăm mereu să vă oferim cele mai potrivite produse. În același timp, obiectivul nostru este să vă ajungă în siguranță și cât mai repede. Datorită tehnologiilor proprii, logistică perfectă și centru de distribuție perfect gestionat, comanda este în medie de două ore pe drum. Suntem capabili să gestionăm până la 140.000 de comenzi pe zi.</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '30px', width: '85%', textAlign: 'justify', fontSize: '25px' }}>Suntem întotdeauna aici pentru voi</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>De la început, satisfacția clienților a fost întotdeauna prioritatea noastră. Peste 1.300 dintre angajații noștri lucrează în fiecare zi pentru ca totul să funcționeze perfect. Vorbim 19 limbi și muncim 7 zile pe săptămână, așa că vă putem ajuta în orice moment cu selectarea produselor sau cu rezolvarea problemelor tehnice.</Typography>
    </Grid >
  );
};


const gridStyle = {
  "@media (min-width: 2100px)": {
    width: "65%",
    margin: "auto",
  },
  textAlign: 'left',
  marginLeft: '40px',
  marginTop: '30px',
  marginBottom: '30px'
}

export default About;
