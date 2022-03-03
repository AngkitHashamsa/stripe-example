import { Route, Routes } from "react-router-dom";
import OnlinePayment from "./Pages/OnlinePayment";
import Home from "./Pages/Home";
import Subscription from "./Pages/Subscription";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="onlinePayment" element={<OnlinePayment />} />
      <Route path="subscription" element={<Subscription />} />
    </Routes>
  );
}

export default App;
