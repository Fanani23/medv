// const client = require("../config/redis");
// const { response } = require("../helper/common");

// const hitCache = async (req, res, next) => {
//   const karyawan = await client.get(`karyawan`);
//   if (karyawan) {
//     return response(res, 200, true, JSON.parse, "Get karyawan from redis");
//   }
//   next();
// };

// const clearCache = async (req, res, next) => {
//   client.del(`karyawan`);
//   next();
// };

// module.exports = { hitCache, clearCache };
