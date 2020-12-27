import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51HdbQGJM1cSpsLlt5NDhwawNp8j7ApZ6ypl5Bs0NxNiRF5vsPFMrLvjCoOSgOrVihf7YoXoSNXigmMfO2Wj52Vz500Pj4EUZ7C";

  const onToken = (token) => {
    axios({
      url: "payment",
      method: "POST",
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then((response) => {
        alert("Payment successful");
      })
      .catch((error) => {
        console.log("payment error: ", JSON.parse(error));
        alert(
          "there was an issue with your payment. Please make sure you use the valid credit card"
        );
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`You total is $${price}`}
      panelLable="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
      amount={priceForStripe}
    />
  );
};

export default StripeCheckoutButton;
