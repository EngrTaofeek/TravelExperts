const databaseInstance = require("../database/database-connection");

class Package {
  static async getAll() {
    console.log("get allllll");
    const sql = "SELECT * FROM packages";
    const [result] = await databaseInstance.query(sql);
    return result
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM packages WHERE PackageId = ?";
      databaseInstance.query(sql, [id], (err, result) => {
        if (err) reject(err);
        resolve(result[0]);
      });
    });
  }
}

module.exports = Package;
