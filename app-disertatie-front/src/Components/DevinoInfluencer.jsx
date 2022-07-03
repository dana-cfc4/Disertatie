import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const DevinoInfluencer = () => {
  return (
    <Grid sx={gridStyle}>
      <Typography sx={{ fontSize: '30px', fontWeight: 700 }}>Influencer pentru DABeauty</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '30px', width: '85%', textAlign: 'justify' }}>DABeauty este în căutare de micro și macro-influencers, activi pe blog, YouTube și/sau social media, cărora le place să scrie ori să vorbească despre parfumuri, machiaj, produse de îngrijire a pielii, precum și alte tipuri de produse cosmetice. Sunt bine-veniți chiar și fashion influencerii pasionați de beauty. Dorim să colaborăm cu influencers entuziaști, energetici, curioși, și cu un număr semnificativ de fani. Materialele realizate trebuie să fie în limba română, fără greșeli gramaticale. </Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify', fontWeight: 600 }}>Cerințe:</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>* O foarte bună cunoaștere a principalelor platforme de social media</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>* Ortografie și gramatică perfectă, încât textul de blog să nu necesite vreo editare</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>* Textul de blog trebuie să conțină cel puțin 300 de cuvinte, cu link-urile și cuvintele cheie stabilite</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>* Postările pe social media trebuie să includă tag-urile și hashtag-urile stabilite.</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>* Personalitate prietenoasă, cu un stil de scriere pozitiv</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '30px', width: '85%', textAlign: 'justify', fontWeight: 550 }}>În cazul în care ești interesat/ă de a fi blogger/vlogger sau social media influencer pentru DABeauty, completează formularul. Odată ce ai aplicat, vom analiza informațiile furnizate și te vom contacta dacă vom considera că îndeplinesc criteriile noastre.</Typography>

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

export default DevinoInfluencer;
