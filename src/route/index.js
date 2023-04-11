const express = require("express");
const router = express.Router();
const klinikRouter = require("./klinik");
const divisiRouter = require("./divisi");
const shiftRouter = require("./shift");
const jagaRouter = require("./jaga");
const karyawanRouter = require("./karyawan");

router.use("/api/v1/klinik", klinikRouter);
router.use("/api/v1/divisi", divisiRouter);
router.use("/api/v1/shift", shiftRouter);
router.use("/api/v1/jaga", jagaRouter);
router.use("/api/v1/karyawan", karyawanRouter);

module.exports = router;
