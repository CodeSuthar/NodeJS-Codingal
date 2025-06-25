let { createConnection } = require('mysql')

let database = createConnection({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12786768',
    password: 'SOS22025',
    database: 'sql12786768'
});

database.on('connect', () => {
    console.log('Connected to the database');
});

database.connect();

let sqlCommand = `CREATE TABLE Student(Student_ID INT, Student_FirstName VARCHAR(255), Student_LastName VARCHAR(255), Student_City VARCHAR(255))`;

database.query(sqlCommand, (error, results) => {
    if (error) {
        console.error('Error creating table:', error);
    } else {
        console.log('Table created successfully:', results);
    }
});