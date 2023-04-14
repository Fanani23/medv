const pool = require("../config/db");

const findEmail = (email) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM tbl_karyawan WHERE email = '${email}'`,
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      }
    );
  });
};

const findUsername = (username) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM tbl_karyawan WHERE username = '${username}'`,
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      }
    );
  });
};

const createKaryawan = (data) => {
  const {
    id,
    nama,
    username,
    email,
    password,
    is_dev,
    is_manager,
    is_admin,
    is_resepsionis,
    is_perawat,
    is_dokter,
    is_manajemen,
    jenis_kelamin,
    nomor_kitas,
    tipe_izin,
    nomor_izin,
    kadaluarsa_izin,
    nomor_hp,
    tempat_lahir,
    tanggal_lahir,
    alamat,
    provinsi,
    kota,
    kecamatan,
    kelurahan,
    kode_pos,
    status_menikah,
  } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO tbl_karyawan (id, nama, username, email, password, is_dev, is_manager, is_admin, is_resepsionis, is_perawat, is_dokter, is_manajemen, jenis_kelamin, nomor_kitas, tipe_izin, nomor_izin, kadaluarsa_izin, nomor_hp, tempat_lahir, tanggal_lahir, alamat, provinsi, kota, kecamatan, kelurahan, kode_pos, status_menikah, created_at, updated_at) VALUES ('${id}', '${nama}', '${username}', '${email}', '${password}', 0, 0, '${is_admin}', '${is_resepsionis}', '${is_perawat}', '${is_dokter}', '${is_manajemen}', '${jenis_kelamin}', '${nomor_kitas}', '${tipe_izin}', '${nomor_izin}', '${kadaluarsa_izin}', '${nomor_hp}', '${tempat_lahir}', '${tanggal_lahir}', '${alamat}', '${provinsi}', '${kota}', '${kecamatan}', '${kelurahan}', '${kode_pos}', '${status_menikah}', NOW(), NOW())`,
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      }
    );
  });
};

const getKaryawan = ({ id, searchName, sortBy, sortOrder, limit, offset }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM tbl_karyawan WHERE (tbl_karyawan.nama ILIKE ('%${searchName}%') or tbl_karyawan.id ILIKE ('%${id}%')) ORDER BY tbl_karyawan.${sortBy} ${sortOrder} LIMIT ${limit} OFFSET ${offset}`,
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      }
    );
  });
};

const getKaryawanById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM tbl_karyawan WHERE id = '${id}'`, (err, res) => {
      if (!err) {
        resolve(res);
      } else {
        reject(err);
      }
    });
  });
};

const updateKaryawan = (data) => {
  const {
    id,
    nama,
    username,
    email,
    is_dev,
    is_manager,
    is_admin,
    is_resepsionis,
    is_perawat,
    is_dokter,
    is_manajemen,
    jenis_kelamin,
    nomor_kitas,
    tipe_izin,
    nomor_izin,
    kadaluarsa_izin,
    nomor_hp,
    tempat_lahir,
    tanggal_lahir,
    alamat,
    provinsi,
    kota,
    kecamatan,
    kelurahan,
    kode_pos,
    status_menikah,
  } = data;
  console.log(data);
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_karyawan SET nama = '${nama}', username = '${username}', email = '${email}', is_dev = 0, is_manager = 0, is_admin = '${is_admin}', is_resepsionis = '${is_resepsionis}', is_perawat = '${is_perawat}', is_dokter = '${is_dokter}', is_manajemen = '${is_manajemen}', jenis_kelamin = '${jenis_kelamin}', nomor_kitas = '${nomor_kitas}', tipe_izin = '${tipe_izin}', nomor_izin = '${nomor_izin}', kadaluarsa_izin = '${kadaluarsa_izin}', nomor_hp = '${nomor_hp}', tempat_lahir = '${tempat_lahir}', tanggal_lahir = '${tanggal_lahir}', alamat = '${alamat}', provinsi = '${provinsi}', kota = '${kota}', kecamatan = '${kecamatan}', kelurahan = '${kelurahan}', kode_pos = '${kode_pos}', status_menikah = '${status_menikah}' WHERE id = '${id}'`,
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      }
    );
  });
};

const updatePhotoKaryawan = (data) => {
  const { id, foto } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_karyawan SET foto = '${foto}' WHERE id = '${id}'`,
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      }
    );
  });
};

const updatePasswordKaryawan = (data) => {
  const { id, password } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_karyawan SET password = '${password}' WHERE id = '${id}'`,
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      }
    );
  });
};

const deleteKaryawan = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM tbl_karyawan WHERE id = '${id}'`, (err, res) => {
      if (!err) {
        resolve(res);
      } else {
        reject(err);
      }
    });
  });
};

module.exports = {
  findEmail,
  findUsername,
  createKaryawan,
  getKaryawan,
  getKaryawanById,
  updateKaryawan,
  updatePhotoKaryawan,
  updatePasswordKaryawan,
  deleteKaryawan,
};
