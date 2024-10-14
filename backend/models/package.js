const databaseInstance = require("../database/database-connection");

class Package {
  static getAll() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM packages";
      databaseInstance.query(sql, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
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