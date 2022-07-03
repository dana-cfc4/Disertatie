import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const Livrare = () => {
  return (
    <Grid sx={gridStyle}>
      <Typography sx={{ fontSize: '30px', fontWeight: 700 }}>Livrare</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '30px', width: '85%', textAlign: 'justify', fontSize: '25px' }}>Livrarea și Modalitatea de livrare</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>DABeauty livrează produsele exclusiv pe teritoriul României. Produsele vor fi livrate clientului sau persoanei desemnate de client prin intermediul unei societăți de curierat rapid (denumită în continuare ”Curierul”) la adresa de livrare menționată în formular.</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>Livrarea, modalitatea de livrare precum și denumirea Curierului sunt menționate în Mesajul electronic de confirmare.</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>Clientul se obligă să primească Produsul sau să desemneze o persoană cu privire la preluarea Produsului de la Curier. Produsul va fi livrat Clientului sau persoanei desemnate de Client, iar în lipsa acestora Curierul este însărcinat de Client să predea Produsul unei alte terțe persoane aflate în spațiul de la adresa de livrare. În acest ultim caz, Clientul își dă expres acordul cu privire la predarea Produsului unei alte terțe persoane aflate la adresa de livrare, presupunându-se că această terță persoană a fost mandatată de către Client cu preluarea Produsului de la Curier. Clientul sau persoana desemnata de Client pentru a lua in primire Produsul de la Curier are obligatia sa deschida Coletul in fata Curierului si sa verifice daca in Colet sunt toate produsele din Factura care insoteste Coletul si daca aceste produse au ambalajul intact.</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>La data livrării/recepționării Produsului Clientul se obligă să semneze o confirmare de primire (denumită în continuare ”Confirmarea de primire”). Confirmarea de primire face dovada deplină a faptului că Produsul a fost predat Clientului de către Curier si a faptului ca coletul si continutul lui sunt conform factura si intacte.</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>Clientul se obligă să achite costul livrării Produsului, respectiv suma de 15 Lei în cazul comenzilor de până la 200 Lei.</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>Pentru comenzile cu o valoare mai mare de 200 Lei, Clientul va beneficia de livrare gratuită.</Typography>

      <Typography sx={{ marginTop: '40px', marginBottom: '30px', width: '85%', textAlign: 'justify', fontSize: '25px' }}>Termen de livrare</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>DABeauty, prin Curier, va încerca să livreze Produsul către Client într-un termen de 3 până la 5 zile lucrătoare, calculat de la data recepționării Mesajului electronic de confirmare. Livrarea Produsului se face, de regula, in zilele de Luni – Vineri între orele  9:00 – 17:00, exceptând zilele sărbătoare legală.
      </Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>Termenul de livrare poate fi influențat de asemenea de factori externi care nu țin de DABeauty, cazuri în care Termenul de livrare poate fi de cel mult 30 (treizeci) zile de la încheierea Contractului (denumită în continuare ”Termenul maxim de livrare”).</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>Clientul este îndreptățit să solicite rezoluțiunea Contractului pentru motivul depășirii Termenului maxim de livrare, dacă DABeauty nu livrează Produsul într-un termen suplimentar stabilit în mod rezonabil de către Client sau dacă Clientul a informat în prealabil DABeauty că termenul de livrare este esențial.</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>DABeauty va rambursa toate sumele plătite de către Client într-un termen de cel mult 14 zile de la data la care Clientul a comunicat DABeauty decizia sa de încetare a Contractului, dacă solicitarea de rezoluțiune a Contractului este întemeiată și Produsul a fost returnat în întregime către DABeauty.</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>Sumele de mai sus vor fi restituite în contul bancar indicat de Client în solicitarea scrisă de rezoluțiune.</Typography>

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

export default Livrare;
