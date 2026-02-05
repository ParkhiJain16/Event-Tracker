const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    title: String,
    description: String,
    dateTime: Date,

    venue: {
        name: String,
        address: String
    },
    city: {
        type: String,
        default: "Syndey"
    },
    imageUrl: String,

    source:{
        name: String,
        url: String
    },

    status:{
        type: String,
        enum: ["new", "updated", "inactive", "imported"],
        default: "new"
    },

    lastScrapedAt: Date,
    importedAt: Date,
    importedBy: mongoose.Schema.Types.ObjectId
}, {timestamps: true});

module.exports = mongoose.model("Event",EventSchema);