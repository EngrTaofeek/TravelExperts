
const db = require("../database/database-connection");

class Contact {
  static async getAgenciesWithAgents() {
    const query = `
      SELECT 
        a.AgencyId, a.AgncyAddress, a.AgncyCity, a.AgncyProv, a.AgncyPostal, 
        a.AgncyPhone, a.AgncyFax,
        ag.AgentId, ag.AgtFirstName, ag.AgtLastName, ag.AgtBusPhone, 
        ag.AgtEmail, ag.AgtPosition
      FROM Agencies a
      LEFT JOIN Agents ag ON a.AgencyId = ag.AgencyId
      ORDER BY a.AgencyId, ag.AgtLastName, ag.AgtFirstName
    `;
    try {
      const [rows] = await db.query(query);
      console.log("response from db: ", rows);
      return rows;
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  }
}

module.exports = Contact;
