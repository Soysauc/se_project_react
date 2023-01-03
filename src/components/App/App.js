import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

function App() {
  return (
    <div>
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
