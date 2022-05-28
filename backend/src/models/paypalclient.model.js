const mongoose = require("mongoose");

const paypalSchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
      required: [true, "Paypal account must be belong to a Owner!"],
    },
    client_id: {
      type: String,
      required: [true, "Paypal account must have a client id!"],
    },
    client_secret: {
      type: String,
      required: [true, "Paypal account must have a client secret!"],
    },
  },
  {
    timestamps: true,
  }
);

const PaypalClient = mongoose.model("PaypalClient", paypalSchema);

module.exports = PaypalClient;
