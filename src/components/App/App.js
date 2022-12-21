import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";

function App() {
  return (
    <div>
      <Main
        weatherData={{ temperature: null }}
        cards={[]}
        onCardClick={() => {}}
      />
    </div>
  );
}

export default App;
