const mongoose = require("mongoose");

const MenuLinkSchema = new mongoose.Schema({
    title: { type: String, required: true },
    href: { type: String, required: true },
    weight: { type: Number, max: 99, default: 95 },
});

const MenuLinkModel = mongoose.model("MenuLinks", MenuLinkSchema);

module.exports = MenuLinkModel;