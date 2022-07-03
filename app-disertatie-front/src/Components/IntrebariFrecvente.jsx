import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const IntrebariFrecvente = () => {
  return (
    <Grid sx={gridStyle}>
      <Typography sx={{ fontSize: '30px', fontWeight: 700 }}>Intrebari frecvente</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '30px', width: '85%', textAlign: 'justify', fontSize: '25px', fontWeight: 600 }}>Care sunt costurile si termenele de livrare?
      </Typography>
      <Typography sx={{ marginTop: '40px', width: '85%', textAlign: 'justify' }}>DABeauty ofera urmatoarele tipuri de livrare in Romania:</Typography>

      <Typography sx={{ marginTop: '20px', width: '85%', textAlign: 'justify' }}>* Pentru ridicarea din magazin, ai la dispozitie 7 zile pentru a-ti ridica comanda prin prezentarea actului de identitate.</Typography>
      <Typography sx={{ marginTop: '20px', width: '85%', textAlign: 'justify' }}>** Daca ai ales un punct de colectare easybox, timpul de ridicare este de 2 zile.</Typography >
      <Typography sx={{ marginTop: '20px', width: '85%', textAlign: 'justify' }}>  *** Zile lucratoare: de luni pana sambata, cu exceptia sarbatorilor legale.</Typography >

      <Typography sx={{ marginTop: '30px', width: '85%', textAlign: 'justify' }}>  Important: in perioadele cu volum mare, cum ar fi Black Friday, Craciun sau vanzarile sezoniere, termenele de livrare pot fi mai lungi. </Typography>

      <Typography sx={{ marginBottom: '40px', }} >  DABeauty nu livreaza in strainatate. </Typography>

      <Typography sx={{ marginTop: '40px', marginBottom: '30px', width: '85%', textAlign: 'justify', fontSize: '25px', fontWeight: 600 }}>Unde pot introduce codul promotional?

      </Typography>
      <Typography sx={{ marginTop: '40px', width: '85%', textAlign: 'justify' }}>Odata ce produsele tale sunt selectate, poti utiliza in mod convenabil codurile tale promotionale!
      </Typography>

      <Typography sx={{ marginTop: '20px', width: '85%', textAlign: 'justify' }}>1. Acceseaza cosul de cumparaturi.</Typography>
      <Typography sx={{ marginTop: '20px', width: '85%', textAlign: 'justify' }}>2. Acceseaza pagina de finalizare a comenzii.</Typography >
      <Typography sx={{ marginTop: '20px', width: '85%', textAlign: 'justify' }}>3. Introdu codul promotional in campul „Cod promotional”. </Typography >
      <Typography sx={{ marginTop: '20px', width: '85%', textAlign: 'justify' }}>3.Click pe "Aplica" </Typography >

      <Typography sx={{ marginTop: '30px', width: '85%', textAlign: 'justify' }}>Important: Daca codul promotional introdus nu se aplica, te rugam sa verifici corectitudinea datelor, valabilitatea si eligibilitatea codului.</Typography>

      <Typography sx={{ marginTop: '40px', marginBottom: '30px', width: '85%', textAlign: 'justify', fontSize: '25px', fontWeight: 600 }}>Am returnat un produs, dar inca nu am primit rambursarea. Este normal?

      </Typography>
      <Typography sx={{ marginTop: '40px', width: '85%', textAlign: 'justify' }}>Nu iti face griji! iti vom rambursa comanda dupa primirea ei in depozitul nostru.
      </Typography>

      <Typography sx={{ marginTop: '20px', width: '85%', textAlign: 'justify' }}>Important:  Termenul de livrare poate fi putin mai mare in cazul unei perioade cu volum mare.</Typography>

      <Typography sx={{ marginTop: '40px', marginBottom: '30px', width: '85%', textAlign: 'justify', fontSize: '25px', fontWeight: 600 }}>Nu mi-am primit comanda. Ce ar trebui sa fac?

      </Typography>
      <Typography sx={{ marginTop: '40px', width: '85%', textAlign: 'justify' }}>Nu ati primit nicio veste despre comanda ta? Suntem aici sa va ajutam! Puteti urmari pachetul dvs. verificandu-va contul DABeauty, sub Comenzile mele.
      </Typography>

      <Typography sx={{ marginTop: '20px', width: '85%', textAlign: 'justify' }}>Serviciul pentru clienti DABeauty va sta la dispozitie pentru orice informatii suplimentare.
      </Typography>

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

export default IntrebariFrecvente;
