// models/Customer.js
const db = require("../database/database-connection");

class Customer {
  static async create(customerData) {
    const {
      firstname,
      lastname,
      address,
      city,
      province,
      postalcode,
      country,
      busphone,
      homephone,
      email,
      agentId,
    } = customerData;

    const query = `
            INSERT INTO customers 
            (CustFirstName, CustLastName, CustAddress, CustCity, CustProv, 
             CustPostal, CustCountry, CustHomePhone, CustBusPhone, CustEmail, AgentId) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

    const [result] = await db.query(query, [
      firstname,
      lastname,
      address,
      city,
      province,
      postalcode,
      country || null,
      homephone || null,
      busphone,
      email,
      agentId || null,
    ]);
    return { CustomerId: result.insertId, ...customerData };
  }

  static async getAllAgents() {
    const [agents] = await db.query(
      "SELECT AgentId, AgtFirstName, AgtLastName FROM agents ORDER BY AgtLastName, AgtFirstName"
    );
    return agents;
  }
}

module.exports = Customer;
