let { createConnection } = require('mysql');
const { createInterface } = require('readline');

let database = createConnection({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12786768',
    password: 'SOS22025',
    database: 'sql12786768'
});

database.on('connect', () => {
    console.log('Connected to the database');
});

database.connect((error) => {
    if (error) {
        console.error('Error connecting to the database:', error);
    }

    let sqlCommand = `CREATE TABLE IF NOT EXISTS Student (
        Student_ID INT PRIMARY KEY,
        Student_FirstName VARCHAR(255) NOT NULL,
        Student_LastName VARCHAR(255) NOT NULL,
        Student_City VARCHAR(255) NOT NULL,
        Student_State VARCHAR(255) NOT NULL
    )`;

    database.query(sqlCommand, (error, results) => {
        if (error) {
            console.error('Error creating table:', error);
        } else {
            console.log('Table created successfully:', results);
        }
    });

    showMenu();
});

let options = `
1. Drop a table
2. Alter a table
3. Insert records in table
Please enter your choice (1-3): `;

let rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

function showMenu() {
    rl.question(options, (choice) => {
        switch (choice) {
            case '1':
                dropTable();
                break;
            case '2':
                alterTable();
                break;
            case '3':
                insertRecords();
                break;
            default:
                console.log('Invalid choice. Please try again.');
                showMenu();
        }
    })
}

function dropTable() {
    let dropTableCMD = `DROP TABLE IF EXISTS Student`;
    database.query(dropTableCMD, (error, results) => {
        if (error) {
            console.error('Error dropping table:', error);
        } else {
            console.log('Table dropped successfully:', results);
        }
        showMenu();
    })
}

function alterTable() {
    let alterTableCMD = `ALTER TABLE Student ADD COLUMN Student_Grade INT`;
    database.query(alterTableCMD, (error, results) => {
        if (error) {
            console.error('Error altering table:', error);
        } else {
            console.log('Table altered successfully:', results);
        }
        showMenu();
    })
}

function insertRecords() {
    let insertRecordsCMD = `INSERT INTO Student (Student_ID, Student_FirstName, Student_LastName, Student_City, Student_State, Student_Grade) VALUES 
    (1, 'Krisha', 'Patel', 'Vadodara', 'Gujarat', '11'),
    (2, 'Aditya', 'Suthar', 'Vadodara', 'Gujarat', '11')`;

    database.query(insertRecordsCMD, (error, results) => {
        if (error) {
            console.error('Error inserting records:', error);
        } else {
            console.log('Records inserted successfully:', results);
        }
        showMenu();
    })
} 