class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes("hello")) {
      this.actionProvider.greet();
    }

    if (lowerCaseMessage.includes("brand-uri")) {
      this.actionProvider.handleCautaDupaBrand();
    }
    else this.actionProvider.handleCautaDeToate(lowerCaseMessage);
  }
}

export default MessageParser;