const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51KYoYcCBIFjPKXgZecIHrlAvjDVyQgCKRnmNogJg6L6tp3qZBXaDj9I84r85Cv72Xkd7QlcJicXPJrWLF2PbSGqC00sUip0PfE"
);
app.use(express.json());
app.use(cors());
const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Learn React Today" }],
  [2, { priceInCents: 3000, name: "Learn Css Today" }],
]);

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
  console.log(calculateOrderAmount());
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

app.post("/sub", async (req, res) => {
  const { email, payment_method } = req.body;

  const customer = await stripe.customers.create({
    payment_method,
    email: email,
    invoice_settings: {
      default_payment_method: payment_method,
    },
  });

  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ plan: "price_1KZCMHCBIFjPKXgZ0syYuJpH" }],
    expand: ["latest_invoice.payment_intent"],
  });

  const status = subscription["latest_invoice"]["payment_intent"]["status"];
  console.log(subscription);
  const client_secret =
    subscription["latest_invoice"]["payment_intent"]["client_secret"];
  console.log(client_secret);
  res.json({ client_secret: client_secret, status: status });
});

app.listen(
  process.env.PORT || 8000,
  console.log("Server listening on port 8000")
);
