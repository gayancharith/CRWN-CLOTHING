import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51HdbQGJM1cSpsLlt5NDhwawNp8j7ApZ6ypl5Bs0NxNiRF5vsPFMrLvjCoOSgOrVihf7YoXoSNXigmMfO2Wj52Vz500Pj4EUZ7C";

  const onToken = (token) => {
    console.log(token);
    alert("Payment Successful");
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
