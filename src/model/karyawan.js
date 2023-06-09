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

const findLogin = (input_login) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * from tbl_karyawan WHERE email = '${input_login}' OR username = '${input_login}'`,
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

const countKaryawan = () => {
  return pool.query(`SELECT COUNT(*) AS total FROM tbl_karyawan`);
};

const createKaryawan = (data) => {
  const {
    id,
    nama,
    username,
    email,
    password,
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
    tipe,
    spesialis,
  } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO tbl_karyawan (id, nama, username, email, password, is_dev, is_manager, is_admin, is_resepsionis, is_perawat, is_dokter, is_manajemen, jenis_kelamin, nomor_kitas, tipe_izin, nomor_izin, kadaluarsa_izin, nomor_hp, tempat_lahir, tanggal_lahir, alamat, provinsi, kota, kecamatan, kelurahan, kode_pos, status_menikah, tipe, spesialis, is_active, created_at, updated_at) VALUES ('${id}', '${nama}', '${username}', '${email}', '${password}', 0, 0, '${is_admin}', '${is_resepsionis}', '${is_perawat}', '${is_dokter}', '${is_manajemen}', '${jenis_kelamin}', '${nomor_kitas}', '${tipe_izin}', '${nomor_izin}', '${kadaluarsa_izin}', '${nomor_hp}', '${tempat_lahir}', '${tanggal_lahir}', '${alamat}', '${provinsi}', '${kota}', '${kecamatan}', '${kelurahan}', '${kode_pos}', '${status_menikah}', '${tipe}', '${spesialis}', 1, NOW(), NOW())`,
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

const getKaryawan = ({
  searchName,
  searchTipe,
  searchSpecialis,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT kry.id, kry.nama, kry.username, kry.email, kry.is_dev, kry.is_manager, kry.is_admin, kry.is_resepsionis, kry.is_perawat, kry.is_dokter, kry.is_manajemen, kry.jenis_kelamin, kry.nomor_kitas, kry.tipe_izin, kry.nomor_izin, kry.kadaluarsa_izin, kry.nomor_hp, kry.tempat_lahir, kry.tanggal_lahir, kry.alamat, kry.provinsi, kry.kota, kry.kecamatan, kry.kelurahan, kry.kode_pos, kry.status_menikah, kry.tipe, kry.spesialis, kry.is_active FROM tbl_karyawan as kry WHERE kry.nama ILIKE '%${searchName}%' ORDER BY kry.${sortBy} ${sortOrder} LIMIT ${limit} OFFSET ${offset}`,
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
    tipe,
    spesialis,
  } = data;
  console.log(data);
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_karyawan SET nama = '${nama}', username = '${username}', email = '${email}', is_dev = 0, is_manager = 0, is_admin = '${is_admin}', is_resepsionis = '${is_resepsionis}', is_perawat = '${is_perawat}', is_dokter = '${is_dokter}', is_manajemen = '${is_manajemen}', jenis_kelamin = '${jenis_kelamin}', nomor_kitas = '${nomor_kitas}', tipe_izin = '${tipe_izin}', nomor_izin = '${nomor_izin}', kadaluarsa_izin = '${kadaluarsa_izin}', nomor_hp = '${nomor_hp}', tempat_lahir = '${tempat_lahir}', tanggal_lahir = '${tanggal_lahir}', alamat = '${alamat}', provinsi = '${provinsi}', kota = '${kota}', kecamatan = '${kecamatan}', kelurahan = '${kelurahan}', kode_pos = '${kode_pos}', status_menikah = '${status_menikah}', tipe = '${tipe}', spesialis = '${spesialis}' WHERE id = '${id}'`,
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

const archiveKaryawan = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_karyawan SET is_active = 0 WHERE id = '${id}'`,
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

const activateKaryawan = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE tbl_karyawan SET is_active = 1 WHERE id = '${id}'`,
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
  findLogin,
  countKaryawan,
  createKaryawan,
  getKaryawan,
  getKaryawanById,
  updateKaryawan,
  updatePhotoKaryawan,
  updatePasswordKaryawan,
  archiveKaryawan,
  activateKaryawan,
  deleteKaryawan,
};
