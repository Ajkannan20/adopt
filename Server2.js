const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); 


const db = mysql.createConnection({
    host: '20.185.225.153',
    user: 'devops',
    password: 'Devops@123',
    database: 'developerdb'
});


const app = express();
const port = 3020; 
app.use(cors());

app.get('/failed-deployments', (req, res) => {
    const query = `
        SELECT project_name, COUNT(*) AS 'Number of Failed Deployments'
        FROM dev_deployment
        WHERE deploy_status = 0
        GROUP BY project_name
        ORDER BY COUNT(*) DESC;
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }

       
        const data = results.map(row => ({
            label: row.project_name,
            y: row['Number of Failed Deployments']
        }));

        res.json(data);
    });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
