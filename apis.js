const express = require('express');
const cors = require('cors');

//import my db connection
const databaseInstance = require('./database/database-connection');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());


// 4. Update Course Information
app.put('/api/courses/:id', async (req, res) => {
    const { course_name, description, credit } = req.body;
    const course = await Course.findByPk(req.params.id);
    if (course) {
        course.course_name = course_name;
        course.description = description;
        course.credit = credit;
        await course.save();
        res.json(course);
    } else {
        res.status(404).json({ error: 'Course not found' });
    }
});

// fetch all packages
app.get('/api/packages', async (request, response) => {
    //Query to get all packages in the database
    const sql = 'select * from packages';

    //execute the query
    databaseInstance.query(sql, (err, result, field) => {
        if (err) throw err;
        console.log(result);
        response.json(result);
        console.log(result);
    });
});

// fetch package
app.get('/api/packages/:id', async (request, response) => {
    //Query to get package with id parameter 
    const sql = 'select * from packages where PackageId = ?';

    //execute the query
    databaseInstance.query(sql, [request.params.id], (err, result, field) => {
        if (err) throw err;
        console.log(result);
        response.json(result[0]);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});