const databaseInstance = require("../database/database-connection");

class Package {
  static async getAll() {
    const imagePaths = [
      "./images/carribean.jpg",
      "./images/hawaii.jpg",
      "./images/asia.jpg",
      "./images/europe.jpg",
    ];
    try {
      // Add the imagePath column if it doesn't exist
      // Check if the column exists
      const [rows] = await databaseInstance.query(`
            SELECT COLUMN_NAME 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_NAME = 'packages' 
            AND COLUMN_NAME = 'imagePath'
        `);

      // If the column does not exist, add it
      if (rows.length === 0) {
        await databaseInstance.query(`
                ALTER TABLE packages 
                ADD imagePath VARCHAR(255);
            `);
        console.log("imagePath column added successfully.");

        for (let i = 0; i < imagePaths.length; i++) {
          const sql = "UPDATE packages SET imagePath = ? WHERE PackageId = ?";
          const [result] = await databaseInstance.query(sql, [imagePaths[i], i + 1]); // Assuming PackageId starts from 1
          console.log(`Updated PackageId ${i + 1} with image path: ${imagePaths[i]}`);
        }
        console.log("All image paths updated successfully.");
      } else {
        console.log("imagePath column already exists.");
      }
    } catch (error) {
      console.error(`Error updating image paths: ${error.message}`);
    } finally {
      console.log("get allllll");

      const sql = "SELECT * FROM packages";
      const [result] = await databaseInstance.query(sql);
      return result
    }

  }

  static async getById(id) {
    try {
      console.log(`Fetching package with ID: ${id}`);

      // SQL query to fetch the package by ID
      const sql = "SELECT * FROM packages WHERE PackageId = ?";

      // Use async/await since query() now returns a promise
      const [rows] = await databaseInstance.query(sql, [id]);

      // Check if the package exists
      if (rows.length === 0) {
        console.warn(`No package found with ID: ${id}`);
        throw new Error('Package not found');
      }

      console.log(`Package found: ${JSON.stringify(rows[0])}`);
      return rows[0]; // Return the package
    } catch (error) {
      console.error(`Database query error: ${error.message}`);
      throw error; // Throw the error so it can be caught by the caller
    }
  }

}

module.exports = Package;
