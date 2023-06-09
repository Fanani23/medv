const { response } = require("../helper/common");
const {
  createKlinik,
  findKlinik,
  getKlinik,
  getKlinikById,
  updateKlinik,
  deleteKlinik,
} = require("../model/klinik");

const klinikController = {
  create: async (req, res, next) => {
    let {
      rows: [klinik],
    } = await findKlinik(req.body.nama_klinik);
    if (klinik) {
      response(res, 400, false, null, "Name of clinic is already used");
    }
    try {
      let digits = "0123456789";
      let id = "KLN";
      for (let i = 0; i < 6; i++) {
        id += digits[Math.floor(Math.random() * 10)];
      }
      const data = {
        id,
        nama_klinik: req.body.nama_klinik,
        tipe: req.body.tipe,
        alamat: req.body.alamat,
        nomor_telepon: req.body.nomor_telepon,
      };
      await createKlinik(data);
      response(res, 200, true, data, "Create clinic success");
    } catch (err) {
      console.log(err);
      response(res, 400, false, err, "Create clinic failed");
    }
  },
  get: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const sortBy = req.query.sortBy || "nama_klinik";
      const sortOrder = req.query.sortOrder || "desc";
      const search = req.query.search || "";
      const offset = (page - 1) * limit;
      const result = await getKlinik({
        search,
        sortBy,
        sortOrder,
        limit,
        offset,
      });
      response(
        res,
        200,
        true,
        { result: result.rows },
        "Get clinic data success"
      );
    } catch (err) {
      console.log("Get clinic data error", err);
      response(res, 400, false, null, "Get clinic data failed");
    }
  },
  getById: async (req, res, next) => {
    try {
      const result = await getKlinikById(req.params.id);
      response(res, 200, true, result.rows, "Get clinic data by ID success");
    } catch (err) {
      console.log("Get clinic data by ID error", err);
      response(res, 400, false, err, "Get clinic data by ID failed");
    }
  },
  update: async (req, res, next) => {
    try {
      const id = req.body.id;
      const nama_klinik = req.body.nama_klinik;
      const tipe = req.body.tipe;
      const alamat = req.body.alamat;
      const nomor_telepon = req.body.nomor_telepon;
      const data = {
        id,
        nama,
        tipe,
        alamat,
        nomor_telepon,
      };
      await updateKlinik(data);
      response(res, 200, true, data, "Update clinic data success");
    } catch (err) {
      console.log("Update clinic data error", err);
      response(res, 400, false, "Update clinic data failed");
    }
  },
  delete: async (req, res, next) => {
    try {
      await deleteKlinik(req.params.id);
      response(res, 200, true, null, "Delete clinic success");
    } catch (err) {
      console.log("Delete clinic error", err);
      response(res, 400, false, err, "Delete clinic failed");
    }
  },
};

exports.klinikController = klinikController;
