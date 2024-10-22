
const databaseInstance = require("../database/database-connection");

class TripTypeController {
    static async getAllTripTypes() {
        try {
            console.log('getting all trips from controller')
            const sql = "SELECT * FROM triptypes"; // Replace with your actual table name
            const [rows] = await databaseInstance.query(sql);
            return rows; // Return the array of trip types
        } catch (error) {
            console.error(`Error fetching trip types: ${error.message}`);
            throw error; // Handle error appropriately
        }
    }
}
// Exporting the class
module.exports = TripTypeController;