const express = require("express");
const router = express.Router();
const klinikRouter = require("./klinik");
const divisiRouter = require("./divisi");
const shiftRouter = require("./shift");
const jagaRouter = require("./jaga");
const karyawanRouter = require("./karyawan");
const antrianRouter = require("./antrian");

router.use("/api/v1/klinik", klinikRouter);
router.use("/api/v1/divisi", divisiRouter);
router.use("/api/v1/shift", shiftRouter);
router.use("/api/v1/jaga", jagaRouter);
router.use("/api/v1/karyawan", karyawanRouter);
router.use("/api/v1/antrian", antrianRouter);

module.exports = router;
