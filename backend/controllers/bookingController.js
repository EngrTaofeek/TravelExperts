
const databaseInstance = require("../database/database-connection");

// Controller to handle inserting a booking
const addBooking = async (req, res) => {
    const { bookingDate, bookingNo, travelerCount, customerId, tripTypeId, packageId } = req.body; // Get values from request body

    if (!bookingDate || !bookingNo || !travelerCount || !customerId || !tripTypeId || !packageId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Use the existing database connection or create one
        const connection = await databaseInstance;

        // SQL query to insert a new booking
        const sql = `
            INSERT INTO bookings (BookingDate, BookingNo, TravelerCount, TripTypeId, PackageId) 
            VALUES (?, ?, ?, ?, ?)
        `;

        // Execute the query with the provided values
        const [result] = await connection.execute(sql, [
            bookingDate,
            bookingNo,
            travelerCount,
            tripTypeId,
            packageId
        ]);

        // Return a success message with the result
        res.status(201).json({ message: 'Booking inserted successfully', bookingId: result.insertId });
        console.log("booked succesfully");
    } catch (error) {
        console.log(`booking failed ${error.message}`);
        console.error('Error inserting booking:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    addBooking
};
