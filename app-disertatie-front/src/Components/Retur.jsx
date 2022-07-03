import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const Retur = () => {
  return (
    <Grid sx={gridStyle}>
      <Typography sx={{ fontSize: '30px', fontWeight: 700 }}>Procedura de retur</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>Dreptul de retragere din contract:</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>« Retragerea din contract » se referă la dreptul dvs legal de a renunta la comandă plasată prin efectuarea unui retur de marfă. Acest aspect este reglementat prin legislația în vigoare, Ordonanța de Urgență nr. 34 / 2014 privind drepturile consumatorilor în cadrul contractelor la distanță. Puteți beneficia de acest drept legal dacă sunt îndeplinite condițiile de returnare pe care le gășiți mai jos:</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>Returul se poate face în interval de 14 de zile lucrătoare de la dată la care ați intrat în posesia comenzii fără a fi nevoit să justificați decizia de retragere și este GRATUIT. </Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>În acest caz, va rugăm să urmați pașii de mai jos:</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>Să ne aduceți la cunoștință  decizia dvs, completând formularul care poate fi descărcat de aici: Descarcă formular de retragere. În cazul în care optați pentru a descărca formularul, va rugăm să îl trimiteți în atenția echipei DABeauty la adresa comenzionline@dabeauty.ro. DABeauty va confirmă Clientului, fără întârziere, pe un suport durabil, de exemplu prin e-mail, confirmarea de primire a cererii de retragere în termen de 2 zile lucrătoare.</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>Echipa DABeauty va trimite curierul la adresa indicată de dumneavoastră pentru a ridică coletul. În acest caz costul aferent transpontului este GRATUIT. Dacă doriți să trimiteți returul cu un alt serviciu de curierat, curier cu care DABeauty nu are relații comerciale, costul de transport va fi suportat de dumneavoastră.</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>După ajungerea coletului la depozitul DABeauty, se va face recepția și se va verifică dacă au fost îndeplinite condițiile de retur de mai jos sau pe care le găsiți stipulate în Termeni și Condiții DABeauty.</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>Odată verificat și acceptat returul se va procesa conform prin returnare contravaloare.</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>Clientul se obligă să returneze produsele către DABeauty într-o stare perfectă și impecabilă, nefolosite/netestate, cu sigiliul și ambalajul original, respectiv într-o stare în care produsele pot fi comercializate din nou. Produsele vor fi returnate împreună cu toate accesoriile, eșantioanele/cadourile gratuite, în ambalajul original nedeteriorat,  împreună cu formularul de retur completat și avizul de însoțire al mărfii în care ați marcat produsele pe care le returnați.</Typography>

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

export default Retur;
