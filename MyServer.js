const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;
// const cors = require('cors');
// app.use(cors());


// Setup MySQL connection
const db = mysql.createConnection({
  host: '20.185.225.153',
  user: 'devops',
  password: 'Devops@123',
  database: 'developerdb'
});

// Connect to the database
db.connect(err => {
  if (err) {
    console.log('Error connecting to database: ', err);
    return;
  }
  console.log('Connected to database');
});

// API endpoint to get the failed deployment data
app.get('/api/failed-deployments', (req, res) => {
  const query = `
    SELECT project_name, COUNT(*) AS 'Number of Failed Deployments' 
    FROM dev_deployment 
    WHERE deploy_status = 0 
    GROUP BY project_name 
    ORDER BY COUNT(*) DESC;
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error querying the database');
    } else {
      res.json(result);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
