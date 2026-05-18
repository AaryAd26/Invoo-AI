import express from 'express';
import multer from 'multer';
import path from 'path'

import {clerkMiddleware}   from '@clerk/express';
import { createBusinessProfile, getMyBusinessProfile, updateBusinessProfile } from '../controller/buisnessProfileController.js'; // LINE 6: FIXED
import BusinessProfile from '../models/buisnessProfileModel.js';

const buinessProfileRouter= express.Router();

buinessProfileRouter.use(clerkMiddleware());

// multer setup
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, path.join(process.cwd(), "uploads"));
    },
    filename: (req,file, cb) => {
        const unique= Date.now() + "-" + Math.round(Math.random() * 1e9 ); 
        const ext = path.extname(file.originalname);
        cb(null, `buisness-${unique}${ext}`);
    },
});

const upload = multer({storage });

// create 
buinessProfileRouter.post(
    "/",
    upload.fields([
        {name: "logoName", maxCount: 1},
        { name : "stampName", maxCount: 1 },
        { name : "signatureNameMeta", maxCount: 1 },
    ]),
    createBusinessProfile  // LINE 35: FIXED
)

// to update the profile 
buinessProfileRouter.put(
    "/:id",
    upload.fields([
        {name: "logoName", maxCount: 1},
        { name : "stampName", maxCount: 1 },
        { name : "signatureNameMeta", maxCount: 1 },
    ]),
    updateBusinessProfile
);

buinessProfileRouter.get("/me", getMyBusinessProfile);

export default buinessProfileRouter;