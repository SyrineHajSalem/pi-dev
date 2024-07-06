const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    id_payment: {
      type: String,
    },
    id_rent: {
      type: String,
    },
    payment_method: {
      type: String,
    },
    amount: {
      type: Number,
    },
    currency: {
      type: String,
    },
    token: {
      type: String,
    },
    status: {
      type: String,
      default: "pending",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const payment = mongoose.model("Payment", paymentSchema);

module.exports = payment;

// const mongoose = require("mongoose");
// const paymentSchema = new mongoose.Schema(
//   {
//     id_payment: String,
//     amount: Number,
//     currency: String,
//     payment_method: Number,
//     token: String,
//     status: String,
//     createdAt: Date,
//   },
//   {
//     timestamps: true,
//   }
// );
// const payment = mongoose.model("payment", paymentSchema);
// module.exports = payment;

// models/payment.js
// const { DataTypes } = require("sequelize");

// module.exports = (sequelize) => {
//   const Payment = sequelize.define("Payment", {
//     amount: {
//       type: DataTypes.FLOAT,
//       allowNull: false,
//     },
//     currency: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     token: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     status: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     createdAt: {
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.NOW,
//     },
//   });

//   return Payment;
// };
