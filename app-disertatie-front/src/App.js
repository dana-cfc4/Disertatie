import './App.css'
import {BrowserRouter as Router} from "react-router-dom"
import Header from './Components/Header'
import CategoriesMenu from "./Components/CategoriesMenu";
import Footer from "./Components/Footer";
import RoutesPage from "./Router/RoutesPage";
import ProvideAuth from "./Components/ProvideAuth";
import Grid from "@mui/material/Grid";

function App() {
  return (
    <ProvideAuth>
      <div className="App">
        <Router>
          <Grid
            container
            spacing={0}
            direction="column"
            align="center"
          >
            <Header />
              <CategoriesMenu />
              <RoutesPage />
              <Footer />
          </Grid>
        </Router>
      </div>
    </ProvideAuth>
  );
}

export default App;
