var express = require("express");
require('dotenv').config()

const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: {
        rejectUnauthorized: false
    }
});


var app = express();
const cors = require('cors');
// set localhost to access the server from env
const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200
  }
app.use(cors(corsOptions));  
app.use(express.json());
app.listen(5001, () => {
    console.log("Server running on port 5001");
});

app.post('/post-form', async (req, res, next) => {
    let { name, email, DateOfBirth, university, degree, graduationYear, cgpa } = req.body;

    try {
        const query = `
        INSERT INTO students (name, email, date_of_birth, university, degree, graduation_year, cgpa)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
      `;
        let values = [name, email, DateOfBirth, university, degree, graduationYear, cgpa];
        console.log(values);
        // Validation
        if (!name || !email || !DateOfBirth || !university || !degree || !graduationYear || !cgpa) {
            return res.status(400).json({ code: 400, message: "All fields are required" });
        }

        if (name.length > 255) {
            return res.status(400).json({ code: 400, message: "Invalid name" });
        }

        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(email) || email.length > 255) {
            return res.status(400).json({ code: 400, message: "Invalid email" });
        }

        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (dateRegex.test(DateOfBirth) === false){
            return res.status(400).json({ code: 400, message: "Invalid date of birth" });
        }

        if (typeof university !== 'string' || university.length > 255) {
            return res.status(400).json({ code: 400, message: "Invalid university" });
        }

        if (typeof degree !== 'string' || degree.length > 255) {
            return res.status(400).json({ code: 400, message: "Invalid degree" });
        }
        graduationYear = parseInt(graduationYear);
        if (typeof graduationYear !== 'number') {
            return res.status(400).json({ code: 400, message: "Invalid graduation year" });
        }
        cgpa = parseFloat(cgpa);
        if (typeof cgpa !== 'number' || cgpa < 0 || cgpa > 4) {
            return res.status(400).json({ code: 400, message: "Invalid CGPA" });
        }
        const { rows } = await pool.query(query, values);
        const newStudent = rows[0];

        res.status(201).json({
            code: 201,
            message: "Success",
            data: newStudent
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            code: 500,
            message: "Something went wrong"
        });
    }
});

app.get('/get-form', async (req, res, next) => {
    try {
        const { rows } = await pool.query('SELECT * FROM students');
        const students = rows;
        res.status(200).json({
            code: 200,
            message: "Success",
            data: students
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            code: 500,
            message: "Something went wrong"
        });
    }
}
);