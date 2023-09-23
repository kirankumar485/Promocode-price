const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let promoCodeUsageCount = 0;

app.post("/api/apply-promo-code", (req, res) => {
  const { promoCode } = req.body;

  if (promoCode === "OFFER10") {
    if (promoCodeUsageCount < 20) {
      const originalPrice = 100;
      const discount = 0.1; // 10%
      const discountedPrice = originalPrice - originalPrice * discount;
      promoCodeUsageCount++;

      res.json({ discountedPrice });
    } else {
      res.status(400).json({ error: "Promo code limit reached." });
    }
  } else {
    res.status(400).json({ error: "Invalid promo code" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
