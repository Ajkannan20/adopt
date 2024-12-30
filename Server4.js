const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); 


const db = mysql.createConnection({
    host: '20.185.225.153',
    user: 'devops',
    password: 'Devops@123',
    database: 'developerdb'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database: ', err);
        return;
    }
    console.log('Connected to the database!');
});

const app = express();
const port = 3090; 
app.use(cors());

app.get('/failed-builds', (req, res) => {
    const query = `
        SELECT project_name, COUNT(*) AS failed_builds 
        FROM project_details 
        LEFT JOIN build_details ON project_details.project_id = build_details.project_id 
        WHERE build_status = 0 
        GROUP BY project_name 
        ORDER BY failed_builds DESC
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }

       
        const data = results.map(row => ({
            label: row.project_name,
            y: row.failed_builds
        }));

        res.json(data);
    });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
