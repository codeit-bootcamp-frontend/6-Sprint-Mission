import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import freewriter from "./pages";
import market from "./pages";
import login from "./pages";
import pandamarket from "./pages";
import Header from "./componenets/Header/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <div>
        <Routes>
          <Route exact path="/pandamarket" component={pandamarket} />
          <Route exact path="/freewirter" component={freewriter} />
          <Route exact path="/items" component={market} />
          <Route exact path="/login" component={login} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
