import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./components/layout/router";
import GlobalStyle from "./components/styles/globalStyle";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

export default function App() {
  // our backend serves the react app under /app
  return (
    <BrowserRouter> 
      <GlobalStyle />

      <Router history={history} />
    </BrowserRouter>
  );
}
