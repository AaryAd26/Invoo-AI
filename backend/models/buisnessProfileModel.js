import mongoose from "mongoose";

const BusinessProfileSchema = new mongoose.Schema({
    owner: {type: String, required: true, index: true},

    buissnesName: {type: String, required: true},
    email: {type: String, required: false, trim: true, lowercase: true, default: ""},
    adress: {type: String, required: false, default: ""},
    phone: {type: String, required: false, default: ""},
    gst: {type: String, required: false, default: ""},

    // for image
    logoUrl : {type: String, required: false, default: null},
    stampUrl : {type: String, required: false, default: null},
    signatureUrl: {type: String, required: false, default: null},

    signatureOwnerName: {type: String, required: false, default: ""},
    signatureOwnerTitle: {type: String, required: false, default: ""},

    defaultTaxPercentage: {type: Number, required: false, default: 18},
}, {
    timestamps: true
});

const BusinessProfile = mongoose.models.BusinessProfile || mongoose.model("BusinessProfile", BusinessProfileSchema); 

export default BusinessProfile;