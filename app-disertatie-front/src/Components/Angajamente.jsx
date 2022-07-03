import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const Angajamente = () => {
  return (
    <Grid sx={gridStyle}>
      <Typography sx={{ fontSize: '30px', fontWeight: 700, width: '65%' }}>Angajamentul nostru social si comunitar.
        Angajamentul nostru privind mediul inconjurator.</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>Datorita voua, DABeauty reprezinta astazi cea mai mare comunitate de frumusete din intreaga lume. Multumim! Un atu care ne face sa mergem mai departe in a-i sustine pe cei care fac pasi importanti pentru o lume mai buna…din toate punctele de vedere.</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>Cu acest obiectiv in minte am lansat « DABeauty Stands ». Prin acest program, brandul DABeauty se angajeaza sa propuna si initiative pentru dezvoltarea responsabilitatii sociale si a practicilor ce tin de mediul inconjurator.</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>
        Dorinta noastra? O frumusete mai sanatoasa, ce respecta indivizii si ecosistemele, ce sustine comunitatile, pentru un plus de solidaritate si incluziune.
        In prezent, in cadrul acestui program, DABeauty, partenerii si colaboratorii sai impart un angajament comun vizand cresterea impactului pozitiv asupra intregii lumi.
        Ne urmariti?</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '30px', width: '85%', textAlign: 'justify', fontSize: '25px' }}>Puterea femeilor</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>La DABeauty, toate femeile conteaza. Noi incurajam egalitatea de sanse. Acest lucru incepe din birourile noastre: ne asiguram ca le dezvoltam oportunitatile de cariera. De fapt, DABeauty este una dintre companiile in care prezenta femeilor in comitetul executiv aproape o egaleaza pe cea a barbatilor.

        Mergem chiar mai departe…Politicile noastre de sprijin nu sunt rezervate doar pe plan intern : le deschidem comunitatilor de femei care inca au nevoia de a se afirma.</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '30px', width: '85%', textAlign: 'justify', fontSize: '25px' }}>Cursuri pentru incredere</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>De cativa ani, DABeauty organizeaza "Cursuri pentru incredere". Aceste sesiuni de frumusete, in grupuri restranse, ajuta femeile care trec prin momente dificile, sa-si faca timp pentru ele. In timpul unei lectii de acest gen, ele reinvata sa-si faca un bine, invata sa foloseasc produsele de ingrijire, de machiaj, cu cateva gesturi simple.

        Sunt invatate cu rabdare si blandete de catre specialistii nostri in frumusete. Aceste sesiuni au loc in majoritatea tarilor. Le organizam in mod regulat cu partenerii nostri care sprijina femeile in cautarea unui loc de munca sau dupa tratamentul cancerului. In 2022, au participat peste 1000 femei. Este o mare sursa de mandrie.</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '30px', width: '85%', textAlign: 'justify', fontSize: '25px' }}>Influenta femeilor</Typography>
      <Typography sx={{ marginTop: '40px', marginBottom: '40px', width: '85%', textAlign: 'justify' }}>DABeauty sustine de cativa ani Force Femmes prin actiuni care au ca scop (re) dobandirea increderii de sine pentru femei in cautare de oportunitati de angajare.

        Pentru a mari numarul de femei care beneficiaza de expertiza in machiaj si ingrijire. DABeauty a organizat Cursuri de Incredere pe tot teritoriul Romaniei.

        In 2022, DABeauty isi doreste sa continue colaborarea prin aceste Cursuri de Incredere, pregatire pentru interviurile de angajare si participarea in procesul de selectionare a unui loc de munca.  </Typography>
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

export default Angajamente;
