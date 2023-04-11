const express = require("express");
const router = express.Router();
const { karyawanController } = require("../controller/karyawan");
const upload = require("../middleware/upload");
const { protect, dev_man_adm } = require("../middleware/auth");

router.post("/register", protect, dev_man_adm, karyawanController.register);
router.post("/login", karyawanController.login);
router.get("/", protect, karyawanController.get);
router.get("/:id", karyawanController.getById);
router.put("/update/:id", karyawanController.update);
router.put(
  "/update/photo/:id",
  upload.single("foto"),
  karyawanController.updatePhoto
);
router.put("/update/password/:id", karyawanController.updatePassword);
router.delete("/delete/:id", karyawanController.delete);

module.exports = router;
