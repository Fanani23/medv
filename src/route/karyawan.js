const express = require("express");
const router = express.Router();
const { karyawanController } = require("../controller/karyawan");
const upload = require("../middleware/upload");
const { protect, dev_man_adm } = require("../middleware/auth");

router.post("/add", karyawanController.add);
router.post("/login", karyawanController.login);
router.get("/", karyawanController.get);
router.get("/:id", karyawanController.getById);
router.put("/:id", karyawanController.update);
router.put("/photo/:id", upload.single("foto"), karyawanController.updatePhoto);
router.put("/password/:id", karyawanController.updatePassword);
router.put("/archive/:id", karyawanController.archive);
router.put("/activate/:id", karyawanController.activate);
router.delete("/:id", karyawanController.delete);

module.exports = router;
