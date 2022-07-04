import React from "react";
import { createChatBotMessage } from 'react-chatbot-kit';
import ProductOptionsChatBot from "./Components/ProductOptionsChatBot";
import GoToRecomandate from "./Components/GoToRecomandate";
import LinkList from "./Components/LinkList";
import CautaDeToate from "./Components/CautaDeToate";

const config = {
  botName: "DABot",
  state: {
    msg: ""
  },
  initialMessages: [
    createChatBotMessage("Buna! Cu ce te pot ajuta astazi?", {
      widget: "ProductOptionsChatBot",
    }),
  ],
  widgets: [
    {
      widgetName: "ProductOptionsChatBot",
      widgetFunc: (props) => <ProductOptionsChatBot {...props} />,
    },
    {
      widgetName: "goToRecomandate",
      widgetFunc: (props) => <GoToRecomandate {...props} />,
    },
    {
      widgetName: "cautadetoate",
      widgetFunc: (props) => <CautaDeToate {...props} />,
      mapStateToProps: ["msg"],
    },
    {
      widgetName: "branduriLinks",
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: "Lancome",
            url:
              "/branduri/627d9111f6d54f839e2c8713",
            id: 1,
          },
          {
            text: "Estee Lauder",
            url:
              "/branduri/627ea00caf66976ef5e30169",
            id: 2,
          },
          {
            text: "Fenty Beauty",
            url: "/branduri/6283a37772d1669cd41c427c",
            id: 3,
          },
          {
            text: "Dior",
            url: "/branduri/62c1706ab3b28450855ff9d3",
            id: 4,
          },
          {
            text: "Yves Saint Laurent",
            url: "/branduri/62c171acb3b28450855ff9d5",
            id: 5,
          },
          {
            text: "Altul",
            url: "/branduri",
            id: 6,
          },
        ],
      },
    },
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#376B7E",
    },
  },
}


export default config