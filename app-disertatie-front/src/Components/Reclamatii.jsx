import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const Reclamatii = () => {
  return (
    <Grid sx={gridStyle}>
      <Typography sx={{ fontSize: '30px', fontWeight: 700 }}>Reclamații și plângeri</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '30px', width: '85%', textAlign: 'justify', fontSize: '25px' }}>Reclamatie</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>Chiar dacă situațiile în care livrăm produse defecte sunt foarte rare, este bine să știți că vom rezolva problema fără întârziere și spre satisfacția dumneavoastră. Este și în interesul nostru să rezolvăm totul cât mai repede posibil, deci nu trebuie să vă temeți că veți aștepta mai mult decât este necesar (de obicei, rezolvăm totul în câteva zile).</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>Clienții înregistrați au posibilitatea de a returna produsele direct din contul de client.</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '30px', width: '85%', textAlign: 'justify', fontSize: '25px' }}>Cum depun reclamația?</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>Clienții înregistrați au posibilitatea de a returna produsele direct din contul de client. Pur și simplu selectați produsele pe care doriți să le returnați în secțiunea Comenzile mele. Puteți trimite produsele prin curier sau le puteți aduce la orice sucursală DABeauty din București. De asemenea, puteți urmări starea returului în contul dumneavoastră.</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>Puteți depune reclamația și personal, în magazinele noastre. În cazul în care completați formularul fără asistența personalului nostru, nu uitați să descrieți cum arată sau cum se manifestă defectul și cum ați prefera rezolvarea reclamației dumneavoastră.</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>Vă vom informa în scris despre cursul reclamației, în special despre acceptarea, procesarea sau respingerea acesteia, prin e-mail sau prin SMS. De asemenea, vă putem contacta prin telefon.</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>Fiecare reclamație este soluționată fără întârziere. De regulă, soluționarea reclamației, inclusiv eliminarea defectului, nu durează mai mult de 30 de zile. În caz contrar, aveți dreptul să vă retrageți din contractul de cumpărare. Pentru a respecta acest termen, este esențial să ne acordați asistența necesară.</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '30px', width: '85%', textAlign: 'justify', fontSize: '25px' }}>Când pot depune reclamație?</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>Suntem răspunzători pentru defectele existente ale produselor, care se manifestă la livrare sau în decursul următoarelor 24 de luni. Nu răspundem pentru defectele noi, mai ales dacă au fost cauzate de folosirea necorespunzătoare. Dacă ați cumpărat un produs folosit, nu răspundem pentru defectele care corespund gradului de utilizare sau uzurii pe care produsul folosit le-a avut la livrare. În cazul produselor prevăzute cu dată de expirare, ne asumăm răspunderea că produsele sunt utilizabile pe toată durata valabilității acestora.</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>Vă atragem atenția că sensibilitatea crescută sau reacția alergică la produsele livrate nu pot fi considerate defecte de produs. În mod similar, defectele produselor oferite cadou sau ale altor prestații gratuite, oferite suplimentar față de comanda dvs., nu pot fi considerate defecte de produs. Imaginile produselor din magazinul nostru on-line sunt ilustrative și nu reprezintă neapărat o prezentare a caracteristicilor produselor (de exemplu, ambalajul produsului poate varia, în funcție de modificarea sa de către producător).</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '30px', width: '85%', textAlign: 'justify', fontSize: '25px' }}>Ce drepturi am, în caz că depun o reclamație?</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>În cazul în care produsul prezintă un defect, putem conveni o compensație sub formă de voucher.</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>Mai mult, aveți dreptul să solicitați înlocuirea produsului defectuos sau repararea acestuia.</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>Dacă înlăturarea defectului este imposibilă sau nerezonabilă pentru noi, aveți dreptul să solicitați o reducere a prețului de achiziție. În acest caz, păstrați marfa, iar noi vă rambursăm o parte din prețul de achiziție. Dacă defectul este însemnat, vă puteți retrage din contractul de vânzare-cumpărare. În acest caz, ne trimiteți produsul înapoi, iar noi vă rambursăm integral prețul de achiziție.</Typography>

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

export default Reclamatii;
