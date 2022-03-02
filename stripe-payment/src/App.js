import { useState } from "react";
import "./App.css";
import StripeContainer from "./Components/PaymentForm";
function App() {
  const [showItem, setShowItem] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <h4>car</h4>
      </header>
      <div>
        {showItem ? (
          <StripeContainer />
        ) : (
          <div>
            <h3>$3.00</h3>
            <h4>Ferari</h4>
            <button onClick={() => setShowItem(true)}>Purchase the Car</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
