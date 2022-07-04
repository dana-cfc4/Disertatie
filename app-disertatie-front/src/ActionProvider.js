class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  greet() {
    const greetingMessage = this.createChatBotMessage("Hi, friend.")
    this.updateChatbotState(greetingMessage)
  }

  handleRecomandareProduse = () => {
    const message = this.createChatBotMessage(
      "Ai ajuns in sectiunea recomandarilor de produse. Pe baza bugetului prezis sau a celui dorit, iti vor fi recomandate produse in functie de preferintele tale anterioare. Doresti sa cauti in continuare altceva?",
      {
        widget: "ProductOptionsChatBot",
      }
    );

    this.updateChatbotState(message);
  };

  handleCautaDupaBrand = () => {
    const message = this.createChatBotMessage(
      "Alege unul din brand-urile sugerate sau introdu brand-ul dorit.",
      {
        widget: "branduriLinks"
      }
    );

    this.updateChatbotState(message);
  };

  handleCautaDupaCategorie = () => {
    const message = this.createChatBotMessage(
      "Introdu categoria dorita."
    );

    this.updateChatbotState(message);
  };

  handleCautaDupaProdus = () => {
    const message = this.createChatBotMessage(
      "Introdu denumirea produsului dorit."
    );

    this.updateChatbotState(message);
  };


  handleGoToProduseRecomandate = () => {
    const message = this.createChatBotMessage(
      "Vrei sa vezi produsele recomandate pentru tine?",
      {
        widget: "goToRecomandate",
      }
    );

    this.updateChatbotState(message);
  }

  handleCautaDeToate = (msg) => {
    const message = this.createChatBotMessage(
      "Confirma actiunea",
      {
        widget: "cautadetoate"
      }
    );

    this.updateChatbotState(message, msg);
  }

  handleCautaOrice = () => {
    const message = this.createChatBotMessage(
      "Introdu ceea ce cauti"
    );

    this.updateChatbotState(message);
  }

  updateChatbotState(message, msg) {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
      msg: msg
    }));
  }
}

export default ActionProvider