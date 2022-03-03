import React from "react";
import SubsCription from "../components/SubsCription";
import SubcritpionDesign from "../components/SubcritpionDesing";
import { useState } from "react";
const Subscription = () => {
  const [subscribe, setSubscriber] = useState(false);
  return (
    <div className="h-full w-full grid place-content-center">
      {subscribe ? (
        <SubsCription />
      ) : (
        <SubcritpionDesign setSubscriber={setSubscriber} />
      )}
    </div>
  );
};

export default Subscription;
