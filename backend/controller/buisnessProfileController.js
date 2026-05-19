import { getAuth } from "@clerk/express";
import BusinessProfile from "../models/buisnessProfileModel.js";

const API_BASE = "http://localhost:4000";

// ---------------- FILE TO URL ----------------

function uploadedFilesToUrls(req) {
  const urls = {};

  if (!req.files) return urls;

  // FIX #2: Keys now match the multer field names defined in the router
  const logoArr = req.files.logoName || [];
  const stampArr = req.files.stampName || [];
  const signatureArr = req.files.signatureNameMeta || [];

  if (logoArr[0]) {
    urls.logoUrl = `${API_BASE}/uploads/${logoArr[0].filename}`;
  }

  if (stampArr[0]) {
    urls.stampUrl = `${API_BASE}/uploads/${stampArr[0].filename}`;
  }

  if (signatureArr[0]) {
    urls.signatureUrl = `${API_BASE}/uploads/${signatureArr[0].filename}`;
  }

  return urls;
}

// ---------------- CREATE BUSINESS PROFILE ----------------

export async function createBusinessProfile(req, res) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication Required",
      });
    }

    const body = req.body || {};

    const fileUrls = uploadedFilesToUrls(req);

    // CHECK EXISTING PROFILE
    const existingProfile = await BusinessProfile.findOne({
      owner: userId,
    });

    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "Business profile already exists",
      });
    }

    const profile = new BusinessProfile({
      owner: userId,

      // FIX #1: Corrected field name from buissnesName → businessName
      businessName: body.businessName || "",

      email: body.email || "",
      address: body.address || "",
      phone: body.phone || "",
      gst: body.gst || "",

      logoUrl: fileUrls.logoUrl || body.logoUrl || null,

      stampUrl: fileUrls.stampUrl || body.stampUrl || null,

      signatureUrl:
        fileUrls.signatureUrl ||
        body.signatureUrl ||
        null,

      signatureOwnerName: body.signatureOwnerName || "",

      signatureOwnerTitle: body.signatureOwnerTitle || "",

      defaultTaxPercent:
        body.defaultTaxPercent !== undefined
          ? Number(body.defaultTaxPercent)
          : 18,
    });

    const saved = await profile.save();

    return res.status(201).json({
      success: true,
      data: saved,
      message: "Business profile created successfully",
    });
  } catch (error) {
    console.error("createBusinessProfile error:", error);

    return res.status(500).json({
      success: false,
      message: "Error creating business profile",
      error: error.message,
    });
  }
}

// ---------------- UPDATE BUSINESS PROFILE ----------------

export async function updateBusinessProfile(req, res) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication Required",
      });
    }

    const { id } = req.params;

    const body = req.body || {};

    const fileUrls = uploadedFilesToUrls(req);

    const existing = await BusinessProfile.findById(id);

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Business profile not found",
      });
    }

    if (existing.owner.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    const update = {};

    // FIX #1: Corrected field name from buissnesName → businessName
    if (body.businessName !== undefined) {
      update.businessName = body.businessName;
    }

    if (body.email !== undefined) {
      update.email = body.email;
    }

    if (body.address !== undefined) {
      update.address = body.address;
    }

    if (body.phone !== undefined) {
      update.phone = body.phone;
    }

    if (body.gst !== undefined) {
      update.gst = body.gst;
    }

    if (fileUrls.logoUrl) {
      update.logoUrl = fileUrls.logoUrl;
    } else if (body.logoUrl !== undefined) {
      update.logoUrl = body.logoUrl;
    }

    if (fileUrls.stampUrl) {
      update.stampUrl = fileUrls.stampUrl;
    } else if (body.stampUrl !== undefined) {
      update.stampUrl = body.stampUrl;
    }

    if (fileUrls.signatureUrl) {
      update.signatureUrl = fileUrls.signatureUrl;
    } else if (body.signatureUrl !== undefined) {
      update.signatureUrl = body.signatureUrl;
    }

    if (body.signatureOwnerName !== undefined) {
      update.signatureOwnerName = body.signatureOwnerName;
    }

    if (body.signatureOwnerTitle !== undefined) {
      update.signatureOwnerTitle = body.signatureOwnerTitle;
    }

    if (body.defaultTaxPercent !== undefined) {
      update.defaultTaxPercent = Number(body.defaultTaxPercent);
    }

    const updated = await BusinessProfile.findByIdAndUpdate(
      id,
      update,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      data: updated,
      message: "Business profile updated successfully",
    });
  } catch (error) {
    console.error("updateBusinessProfile error:", error);

    return res.status(500).json({
      success: false,
      message: "Error updating business profile",
      error: error.message,
    });
  }
}

// ---------------- GET MY PROFILE ----------------

export async function getMyBusinessProfile(req, res) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication Required",
      });
    }

    const profile = await BusinessProfile.findOne({
      owner: userId,
    }).lean();

    if (!profile) {
      // FIX #3: Changed 204 → 200 so the JSON body is actually received by the client
      return res.status(200).json({
        success: true,
        data: null,
        message: "No profile found",
      });
    }

    return res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    console.error("getMyBusinessProfile error:", error);

    return res.status(500).json({
      success: false,
      message: "Error getting profile",
      error: error.message,
    });
  }
}