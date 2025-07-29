import mongoose from "mongoose";

const Schema = mongoose.Schema

const linksSchema = new Schema({
    url: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
    },
    clicks: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

const Link = mongoose.models.Links || mongoose.model("Links", linksSchema);

export default Link;