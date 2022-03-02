const express = require("express");
const app = express();
const cors = require("cors");
// const bodyParser = require("body-parser");

const stripe = require("stripe")(
  "sk_test_51KYoYcCBIFjPKXgZecIHrlAvjDVyQgCKRnmNogJg6L6tp3qZBXaDj9I84r85Cv72Xkd7QlcJicXPJrWLF2PbSGqC00sUip0PfE"
);

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// app.use(json());
app.use(cors());

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Learn React Today" }],
  [2, { priceInCents: 10000, name: "Learn Css Today" }],
]);
// console.log(storeItems);
// const calculateOrderAmount = (items) => {
//   // Replace this constant with a calculation of the order's amount
//   // Calculate the order total on the server to prevent
//   // people from directly manipulating the amount on the client
//   return 1400;
// };

app.post("/create-payment-intent", async (req, res) => {
  const calculateOrderAmount = () => {
    const items = req.body.items.map((item) => {
      const storeItem = storeItems.get(item.id);
      return {
        price_data: {
          name: storeItem.name,
          unit_amount: storeItem.priceInCents,
        },
        currency: "usd",
        quantity: item.quantity,
        totalPrice: item.quantity * storeItem.priceInCents,
      };
    });
    const maxPrice = items.reduce((total, item) => {
      total = total + item.totalPrice;
      return total;
    }, 0);
    return maxPrice;
  };
  calculateOrderAmount();
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(),
      currency: "usd",
    });
    console.log(paymentIntent.client_secret);

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.listen(
  process.env.PORT || 8000,
  console.log("Server listening on port 8000")
);
