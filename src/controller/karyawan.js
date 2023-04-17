const { response } = require("../helper/common");
const {
  findEmail,
  findUsername,
  createKaryawan,
  getKaryawan,
  getKaryawanById,
  updateKaryawan,
  updatePhotoKaryawan,
  updatePasswordKaryawan,
  deleteKaryawan,
} = require("../model/karyawan");
const argon2 = require("argon2");
const { generateToken, generateRefreshToken } = require("../helper/jwt");
const cloudinary = require("../config/cloud");

const karyawanController = {
  register: async (req, res, next) => {
    let inputEmail = req.body.email;
    let inputUsername = req.body.username;
    let {
      rows: [currentEmail],
    } = await findEmail(inputEmail);
    let {
      rows: [currentUsername],
    } = await findUsername(inputUsername);
    if (currentEmail) {
      response(res, 400, false, null, "Email is already used");
    } else if (currentUsername) {
      response(res, 400, false, null, "Username is already used");
    } else {
      let digits = "0123456789";
      let id = "KRY";
      for (let i = 0; i < 6; i++) {
        id += digits[Math.floor(Math.random() * 10)];
      }
      const hash = await argon2.hash(req.body.password);
      console.log(`${hash}`);
      const password = `${hash}`;
      let is_dev = parseInt(req.body.is_dev);
      let is_manager = parseInt(req.body.is_manager);
      let is_admin = parseInt(req.body.is_admin);
      let is_resepsionis = parseInt(req.body.is_resepsionis);
      let is_perawat = parseInt(req.body.is_perawat);
      let is_dokter = parseInt(req.body.is_dokter);
      let is_manajemen = parseInt(req.body.is_manajemen);
      let data = {
        id: id,
        nama: req.body.nama,
        username: req.body.username,
        email: req.body.email,
        password,
        is_dev,
        is_manager,
        is_admin,
        is_resepsionis,
        is_perawat,
        is_dokter,
        is_manajemen,
        jenis_kelamin: req.body.jenis_kelamin,
        nomor_kitas: req.body.nomor_kitas,
        tipe_izin: req.body.tipe_izin,
        nomor_izin: req.body.nomor_izin,
        kadaluarsa_izin: req.body.kadaluarsa_izin,
        nomor_hp: req.body.nomor_hp,
        tempat_lahir: req.body.tempat_lahir,
        tanggal_lahir: req.body.tanggal_lahir,
        alamat: req.body.alamat,
        provinsi: req.body.provinsi,
        kota: req.body.kota,
        kecamatan: req.body.kecamatan,
        kelurahan: req.body.kelurahan,
        kode_pos: req.body.kode_pos,
        status_menikah: req.body.status_menikah,
      };
      try {
        const result = await createKaryawan(data);
        if (result) {
          response(
            res,
            200,
            true,
            { result: result.rows },
            "Register karyawan success"
          );
        }
      } catch (err) {
        console.log("Register karyawan error", err);
        response(res, 400, false, err, "Register karyawan failed");
      }
    }
  },
  login: async (req, res, next) => {
    let inputLogin = req.body.input_login;
    let {
      rows: [karyawanEmail],
    } = await findEmail(inputLogin);
    console.log(karyawanEmail);
    if (!karyawanEmail) {
      let {
        rows: [karyawanUsername],
      } = await findUsername(inputLogin);
      if (!karyawanUsername) {
        response(res, 400, false, null, "Account not found");
      } else {
        let password = req.body.password;
        let validation = await argon2.verify(
          karyawanUsername.password,
          password
        );
        console.log(validation);
        console.log(password);
        console.log(karyawanUsername.password);
        if (!validation) {
          response(res, 400, false, null, "Invalid password");
        } else {
          delete karyawanUsername.password;
          let payload = {
            id: karyawanUsername.id,
            name: karyawanUsername.name,
            username: karyawanUsername.username,
            email: karyawanUsername.email,
            is_dev: karyawanUsername.is_dev,
            id_manager: karyawanUsername.is_manager,
            is_admin: karyawanUsername.is_admin,
            is_resepsionis: karyawanUsername.is_resepsionis,
            is_perawat: karyawanUsername.is_perawat,
            is_dokter: karyawanUsername.is_dokter,
            is_manajemen: karyawanUsername.is_manajemen,
          };
          let accessToken = generateToken(payload);
          let refreshToken = generateRefreshToken(payload);
          karyawanUsername.token = accessToken;
          karyawanUsername.refreshToken = refreshToken;
          response(res, 200, true, karyawanUsername, "Login karyawan success");
        }
      }
    } else {
      let password = req.body.password;
      let validation = await argon2.verify(karyawanEmail.password, password);
      console.log(validation);
      console.log(password);
      console.log(karyawanEmail.password);
      if (!validation) {
        response(res, 400, false, null, "Invalid password");
      } else {
        delete karyawanEmail.password;
        let payload = {
          id: karyawanEmail.id,
          name: karyawanEmail.name,
          username: karyawanEmail.username,
          email: karyawanEmail.email,
          is_dev: karyawanEmail.is_dev,
          id_manager: karyawanEmail.is_manager,
          is_admin: karyawanEmail.is_admin,
          is_resepsionis: karyawanEmail.is_resepsionis,
          is_perawat: karyawanEmail.is_perawat,
          is_dokter: karyawanEmail.is_dokter,
          is_manajemen: karyawanEmail.is_manajemen,
        };
        let accessToken = generateToken(payload);
        let refreshToken = generateRefreshToken(payload);
        karyawanEmail.token = accessToken;
        karyawanEmail.refreshToken = refreshToken;
        response(res, 200, true, karyawanEmail, "Login karyawan success");
      }
    }
  },
  get: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const sortBy = req.query.sortBy || "nama";
      const sortOrder = req.query.sortOrder || "desc";
      const searchName = req.query.searchName || "";
      const offset = (page - 1) * limit;
      const result = await getKaryawan({
        searchName,
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
        "Get karyawan data success"
      );
    } catch (err) {
      console.log("Get karyawan data error", err);
      response(res, 400, false, null, "Get karyawan data failed");
    }
  },
  getById: async (req, res, next) => {
    try {
      const result = await getKaryawanById(req.params.id);
      response(
        res,
        200,
        true,
        { result: result.rows },
        "Get karyawan data by ID success"
      );
    } catch (err) {
      console.log("Get karyawan data by ID error", err);
      response(res, 400, false, null, "Get karyawan data by ID failed");
    }
  },
  update: async (req, res, next) => {
    try {
      const id = req.body.id;
      let is_dev = parseInt(req.body.is_dev);
      let is_manager = parseInt(req.body.is_manager);
      let is_admin = parseInt(req.body.is_admin);
      let is_resepsionis = parseInt(req.body.is_resepsionis);
      let is_perawat = parseInt(req.body.is_perawat);
      let is_dokter = parseInt(req.body.is_dokter);
      let is_manajemen = parseInt(req.body.is_manajemen);
      const data = {
        id: id,
        nama: req.body.nama,
        username: req.body.username,
        email: req.body.email,
        is_dev,
        is_manager,
        is_admin,
        is_resepsionis,
        is_perawat,
        is_dokter,
        is_manajemen,
        jenis_kelamin: req.body.jenis_kelamin,
        nomor_kitas: req.body.nomor_kitas,
        tipe_izin: req.body.tipe_izin,
        nomor_izin: req.body.nomor_izin,
        kadaluarsa_izin: req.body.kadaluarsa_izin,
        nomor_hp: req.body.nomor_hp,
        tempat_lahir: req.body.tempat_lahir,
        tanggal_lahir: req.body.tanggal_lahir,
        alamat: req.body.alamat,
        provinsi: req.body.provinsi,
        kota: req.body.kota,
        kecamatan: req.body.kecamatan,
        kelurahan: req.body.kelurahan,
        kode_pos: req.body.kode_pos,
        status_menikah: req.body.status_menikah,
      };
      await updateKaryawan(data);
      response(res, 200, true, data, "Update karyawan success");
    } catch (err) {
      console.log(err);
    }
  },
  updatePhoto: async (req, res, next) => {
    try {
      const id = req.body.id;
      const foto = await cloudinary.uploader.upload(req.file.path, {
        folder: "foto_kry_kln",
      });
      console.log(foto.url);
      const data = {
        id,
        foto: foto.url,
      };
      await updatePhotoKaryawan(data);
      response(res, 200, true, data, "Update foto karyawan success");
    } catch (err) {
      console.log(err);
      response(res, 400, false, "Update foto karyawan failed");
    }
  },
  updatePassword: async (req, res, next) => {
    try {
      const id = req.body.id;
      // let password = argon2.hashSync(req.body.password);
      const hash = await argon2.hash(req.body.password);
      console.log(`${hash}`);
      const password = `${hash}`;
      const data = {
        id,
        password,
      };
      console.log(id, password);
      await updatePasswordKaryawan(data);
      response(res, 200, true, data, "Update password karyawan success");
    } catch (err) {
      console.log(err);
      response(res, 400, false, null, "Update password karyawan failed");
    }
  },
  delete: async (req, res, next) => {
    try {
      await deleteKaryawan(req.params.id);
      response(res, 200, true, null, "Delete karyawan success");
    } catch (err) {
      response(res, 400, false, err, "Delete karyawan failed");
    }
  },
};

exports.karyawanController = karyawanController;
