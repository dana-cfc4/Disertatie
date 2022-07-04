import React, { useState } from "react";
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
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import config from './config';


function App() {
  const [isChatBotDisplayed, setIsChatBotDisplayed] = useState(false)
  const showChatbot = () => {
    setIsChatBotDisplayed(!isChatBotDisplayed)
  }

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
            {isChatBotDisplayed ? <Chatbot className="chat" config={config} actionProvider={ActionProvider} messageParser={MessageParser} />
              : null}
            <Grid sx={{
              justifyContent: 'right', marginLeft: '-60px', position: 'fixed', left: '100%', top: '100%', marginTop: '-60px'
            }}>
              <ChatBubbleOutlineOutlinedIcon onClick={showChatbot} sx={{
                marginTop: '10px', fontSize: 40
              }} />
            </Grid>
            <Footer />
          </Grid>
        </Router>
      </div>
    </ProvideAuth>
  );
}

export default App;
