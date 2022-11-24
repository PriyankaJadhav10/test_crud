const express = require("express");
const {  createPatientBed, getPatientbeds, deletePatientbed, updatePatientBed } = require("../controllers/noteController");
const auth = require("../middlewares/auth");
const bedRouter = express.Router();

bedRouter.get("/", auth, getPatientbeds);

bedRouter.post("/", auth, createPatientBed);

bedRouter.delete("/:id", auth, deletePatientbed);

bedRouter.put("/:id", auth, updatePatientBed);

module.exports = bedRouter;