const mongoose = require("mongoose");

const FreightSchema = mongoose.Schema({
  shipmentCompany: {
    type: String,
    required: true,
  },
  deliveryDate: {
    type: Number,
    required: true,
  },
  shippingCost: {
    type: Number,
    required: true,
  },
});

const FreightModel = mongoose.model("freight", FreightSchema);
module.exports = FreightModel;
