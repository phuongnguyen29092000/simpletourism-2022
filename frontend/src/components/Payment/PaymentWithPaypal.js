import useNotification from "hooks/notification";
import React from "react";
import { PayPalButton } from "react-paypal-button-v2";

export default function PaymentWithPaypal({totalPrice, clientId, idTicket='',handleClose, onClose}) {

  return (
      <PayPalButton
        options={{
          clientId: 'ASS_8O5eFQRyvhd2qtkCPyF5f2w6LK04611nwbm8hiQkWtPlCO8XotEl2HhI2PVCu3KXrC7kfYW9ScEZ',
          currency: "USD",
        }}
        amount={Math.round(totalPrice*100/23)/100}
        onSuccess={(details, data) => {
          onClose()
          useNotification.Success({
            message:"Chúc bạn có một chuyến đi vui vẻ <3",
            title:"Thanh toán thành công!"
          })
        }}
      />
  );
}