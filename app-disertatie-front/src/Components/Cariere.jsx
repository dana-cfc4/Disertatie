import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const Cariere = () => {
  return (
    <Grid sx={gridStyle}>
      <Typography sx={{ fontSize: '30px', fontWeight: 700 }}>Program de Afiliere</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '30px', width: '85%', textAlign: 'justify' }}>Înscrie-te în Programul de Afiliere de pe DABeauty și câștigă venituri la fiecare comandă înregistrată! Programul de afiliere DABeauty este derulat prin intermediul platformei 2performant.com și al platformei cj.com. Alege una dintre cele două platforme, înscrie-te și aplică pentru a fi afiliat DABeauty. </Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '30px', width: '85%', textAlign: 'justify', fontSize: '25px' }}>Ce este Programul de Afiliere de pe DABeauty și ce poți câștiga?</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>Programul de Afiliere este un sistem de parteneriat pe bază de comision între site-uri asociate.</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>Parteneriatul se realizează prin plasarea unui link sau banner (pe site sau social media) care duce către site-ul DABeauty.</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>Plasarea unui link către produsele noastre aduce site-ului partener un profit în urma fiecărei comenzi plasate prin acel link.</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>Pe lângă câștigul financiar, se va mări și traficul pe site-ul partener.</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>Trebuie doar sa lași un link sau banner pe site, iar vizitatorii vor fi direcționați către site-ul nostru.</Typography>

      <Typography sx={{ marginTop: '40px', marginBottom: '30px', width: '85%', textAlign: 'justify', fontSize: '25px' }}>Cum mă înregistrez?</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>Înregistrează-te pentru a fi afiliat prin platforma 2performant, sau prin platforma CJ (Commission Junction). Dar dacă ești deja înregistrat pe una dintre cele două platforme, poți aplica direct pentru afilierea cu DABeauty. </Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>Parola se trimite pe adresa de email.</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>Aplică pentru a fi partener afiliat pentru DABeauty.</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>Alege din variantele noastre de bannere și adaugă-le pe site-ul tău sau de social media.</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>La sfârșitul lunii vei primi un comision în urma comenzilor înregistrate la noi, care sunt făcute prin bannerul de pe site-ul tău.</Typography>


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

export default Cariere;
