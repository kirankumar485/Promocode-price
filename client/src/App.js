import React, { useState } from "react";

function PricingSection() {
  const [price, setPrice] = useState(100);
  const [promoCode, setPromoCode] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [promoCodeUsed, setPromoCodeUsed] = useState(0);

  const applyPromoCode = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/apply-promo-code",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ promoCode }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (promoCodeUsed < 20) {
          setDiscountedPrice(data.discountedPrice);
          setPromoCodeUsed(promoCodeUsed + 1);
          setErrorMessage("");
        } else {
          setErrorMessage("Promo code limit reached.");
          setDiscountedPrice(null);
        }
      } else {
        setDiscountedPrice(null);
        setErrorMessage("Invalid promo code");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred while applying the promo code.");
      setDiscountedPrice(null);
    }
  };

  return (
    <div>
      <h2>Product Price: ${price}</h2>
      <input
        type="text"
        placeholder="Enter Promo Code"
        value={promoCode}
        onChange={(e) => setPromoCode(e.target.value)}
      />
      <button onClick={applyPromoCode}>Apply Promo Code</button>
      {discountedPrice !== null && (
        <h2>Discounted Price: ${discountedPrice}</h2>
      )}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default PricingSection;
