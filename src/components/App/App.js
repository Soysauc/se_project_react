import React, { useState, useEffect } from "react";
import ItemModal from "../ItemModal/ItemModal";
import ItemCard from "../ItemCard/ItemCard";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Main
        weatherData={{ temperature: null }}
        cards={[]}
        onCardClick={() => {}}
      />
      <Footer />
    </div>
  );
}

export default App;
