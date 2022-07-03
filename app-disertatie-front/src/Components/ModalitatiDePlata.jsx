import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const ModalitatiDePlata = () => {
  return (
    <Grid sx={gridStyle}>
      <Typography sx={{ fontSize: '30px', fontWeight: 700 }}>Modalitati de plata</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '30px', width: '85%', textAlign: 'justify', fontSize: '25px' }}>Plata prin card bancar (online, prin intermediul internetului)</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>* Simplu si rapid, acest mod de plata va ofera posibilitatea de a cumpara pe DABeauty in deplina siguranta.</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>** Pentru sumele de peste 500 RON, tranzactia poate intarzia livrarea comenzii cu pana la 2 zile lucratoare.</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>*** Va incomodeaza sa completati detaliile personale si adresa de livrare de mai multe ori? Va puteti salva pur si simplu datele pentru o achizitie viitoare, bifand casetele corespunzatoare. Detaliile dvs vor fi salvate ca informatii securizate in pagina noastra de finalizarea comenzii, iar data viitoare cand faceti cumparaturi, puteti selecta sa nu mai completati inca o data detaliile comenzii.</Typography>
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

export default ModalitatiDePlata;
