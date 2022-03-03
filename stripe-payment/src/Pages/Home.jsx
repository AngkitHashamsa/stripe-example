import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="mt-5 pt-5 flex items-center gap-5">
      <Link to="onlinePayment" className="text-sky-500 underline">
        Online Payment
      </Link>
      <Link to="subscription" className="text-sky-500 underline">
        Subscription Payment
      </Link>
    </div>
  );
};

export default Home;
