import './App.css'
import { BrowserRouter as Router } from "react-router-dom"
import Header from './Components/Header'
import CategoriesMenu from "./Components/CategoriesMenu";
import Footer from "./Components/Footer";
import RoutesPage from "./Router/RoutesPage";
import ProvideAuth from "./Components/ProvideAuth";
import Grid from "@mui/material/Grid";
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css';

import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import config from './config';

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
            <Chatbot config={config} actionProvider={ActionProvider} messageParser={MessageParser} />
            <Footer />
          </Grid>
        </Router>
      </div>
    </ProvideAuth>
  );
}

export default App;
