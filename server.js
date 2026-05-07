const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const SSL_URL = "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";

/* =========================
   PAYMENT ROUTER
========================= */
app.post("/create-payment", async (req, res) => {
  const { amount, method } = req.body;

  try {

    /* ---------------- SSLCommerz ---------------- */
    if (method === "sslcommerz") {

      const data = {
        store_id: process.env.STORE_ID,
        store_passwd: process.env.STORE_PASSWORD,
        total_amount: amount,
        currency: "BDT",
        tran_id: "TXN_" + Date.now(),

        success_url: process.env.SUCCESS_URL,
        fail_url: process.env.FAIL_URL,
        cancel_url: process.env.CANCEL_URL,

        cus_name: "Customer",
        cus_email: "test@gmail.com",
        cus_add1: "Dhaka",
        cus_phone: "01700000000",
        shipping_method: "NO",
        product_name: "Grocery Bill",
        product_category: "Grocery",
        product_profile: "general",
      };

      const response = await axios.post(SSL_URL, data);

      console.log(response.data);

      if (response.data.GatewayPageURL) {
        return res.json({
          payment_url: response.data.GatewayPageURL
        });
      }

      return res.json({ message: "SSLCommerz failed" });
    }

    /* ---------------- bKash (Demo) ---------------- */
    if (method === "bkash") {
      return res.json({
        payment_url: `https://sandbox.bkash.com/payment?amount=${amount}`
      });
    }

    /* ---------------- Nagad (Demo) ---------------- */
    if (method === "nagad") {
      return res.json({
        payment_url: `https://sandbox.nagad.com/payment?amount=${amount}`
      });
    }

    return res.json({ message: "Invalid method" });

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================
   CALLBACK ROUTES
========================= */
app.post("/success", (req, res) => res.send("Payment Successful 🎉"));
app.post("/fail", (req, res) => res.send("Payment Failed ❌"));
app.post("/cancel", (req, res) => res.send("Payment Cancelled ⚠️"));

app.listen(5000, () => console.log("Server running on 5000"));