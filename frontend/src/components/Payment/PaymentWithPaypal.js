import AuthAPI from "api/AuthAPI";
import useNotification from "hooks/notification";
import React from "react";
import { PayPalButton } from "react-paypal-button-v2";

export default function PaymentWithPaypal({totalPrice, clientId, idTicket='',handleClose, onClose}) {

  return (
      <PayPalButton
        options={{
          clientId: clientId,
          currency: "USD",
        }}
        amount={Math.round(totalPrice*100/23000)/100}
        onSuccess={(details, data) => {
          onClose()
          AuthAPI.paymentSuccess(idTicket)
          .then((rs) => {

          })
          .catch(()=> {
            useNotification.Error({
              message:"Server Error!",
              title:"Lỗi!"
            })
          })
          useNotification.Success({
            message:"Chúc bạn có một chuyến đi vui vẻ <3",
            title:"Thanh toán thành công!"
          })
        }}
      />
  );
}