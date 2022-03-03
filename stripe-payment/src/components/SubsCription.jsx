import React, { useState, useEffect } from "react";

import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  useStripe,
  Elements,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

const promise = loadStripe(
  "pk_test_51KYoYcCBIFjPKXgZrsaSlsPQcPWknV7U4S1EBoBVQ4f0LnW3oXJyZm3VT5ICr8duOQvCU5dtRHjTyp8zqJs7xRHA00FjkLMWXq"
);

const CheckoutForm = () => {
  // stripe stuff
  // const [succeedsed, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  // const [processing, setProcessing] = useState("");
  // const [disabled, setDisabled] = useState(true);
  // const [clientSecret, setClientSecret] = useState("");

  const stripe = useStripe();
  // console.log(clientSecret);
  const elements = useElements();
  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  // const createPaymentIntent = async () => {
  //   if (!stripe || !elements) {
  //     // Stripe.js has not yet loaded.
  //     // Make sure to disable form submission until Stripe.js has loaded.
  //     return;
  //   }
  //   const result = await stripe.createPaymentMethod({
  //     type: "card",
  //     card: elements.getElement(CardElement),
  //     billing_details: {
  //       email: "angkit2055@gmail.com",
  //     },
  //   });
  //   console.log(result);
  //   try {
  //     const { data } = await axios.post("http://localhost:8000/sub", {
  //       payment_method: result.paymentMethod.id,
  //       email: "angkit2055@gmail.com",
  //     });

  //     console.log(data);
  //     setClientSecret(data.clientSecret);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const handleChange = async (event) => {
  //   // Listen for changes in the CardElement
  //   // and display any errors as the customer types their card details
  //   setDisabled(event.empty);
  //   setError(event.error ? event.error.message : "");
  // };
  const handleSubmitSub = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        email: "walll@gmail.com",
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      const res = await axios.post("http://localhost:8000/sub", {
        payment_method: result.paymentMethod.id,
        email: "walll@gmail.com",
      });
      // eslint-disable-next-line camelcase
      const { client_secret, status } = res.data;

      if (status === "requires_action") {
        stripe.confirmCardPayment(client_secret).then(function (result) {
          if (result.error) {
            console.log("There was an issue!");
            console.log(result.error);
            // Display error message in your UI.
            // The card was declined (i.e. insufficient funds, card has expired, etc)
          } else {
            console.log("You got the money!");
            // Show a success message to your customer
          }
        });
      } else {
        console.log("You got the money!");
        // No additional information was needed
        // Show a success message to your customer
      }
    }
  };

  return (
    <div>
      <form id="payment-form" onSubmit={handleSubmitSub}>
        <CardElement
          id="card-element"
          options={cardStyle}
          // onChange={handleChange}
        />
        <button id="submit">
          <span id="button-text">Pay now</span>
        </button>
        {/* Show any error that happens when processing the payment */}
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

const Subscription = () => {
  return (
    <div className="h-full w-full grid place-content-center">
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Subscription;
