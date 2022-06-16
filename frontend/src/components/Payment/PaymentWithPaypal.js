import React from "react";
import { PayPalButton } from "react-paypal-button-v2";

export default function PaymentWithPaypal({totalPrice, clientId}) {

  return (
      <PayPalButton
        options={{
          clientId: clientId,
          currency: "USD",
        }}
        amount={totalPrice/23}
        onSuccess={(details, data) => {
          alert("Transaction completed by " + details.payer.name.given_name);

          console.log({ details, data });
        }}
      />
  );
}