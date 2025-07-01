const { createConnection } = require('mysql');
const { createInterface } = require('readline');

const database = createConnection({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12786768',
    password: 'SOS22025',
    database: 'sql12786768'
});

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

database.connect((error) => {
    if (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1);
    }
    console.log('Connected to the database.');

    const createTableSQL = `
        CREATE TABLE IF NOT EXISTS Student (
            Student_ID INT PRIMARY KEY,
            Student_FirstName VARCHAR(255) NOT NULL,
            Student_LastName VARCHAR(255) NOT NULL,
            Student_City VARCHAR(255) NOT NULL,
            Student_State VARCHAR(255) NOT NULL,
            Student_Grade INT NOT NULL
        )
    `;

    database.query(createTableSQL, (err) => {
        if (err) {
            console.error('Error creating table:', err);
        } else {
            console.log('Table ensured successfully.');
            showMenu();
        }
    });
});

function showMenu() {
    console.log(`
1. Drop the table
2. Insert records
3. View all records
4. View records with condition
5. Exit
    `);

    rl.question('Enter your choice (1-5): ', (choice) => {
        switch (choice) {
            case '1':
                dropTable();
                break;
            case '2':
                insertRecords();
                break;
            case '3':
                selectRecords();
                break;
            case '4':
                selectRecordsWithCondition();
                break;
            case '5':
                console.log('Goodbye!');
                rl.close();
                database.end();
                break;
            default:
                console.log('Invalid choice, please try again.');
                showMenu();
        }
    });
}

function dropTable() {
    database.query('DROP TABLE IF EXISTS Student', (err) => {
        if (err) {
            console.error('Error dropping table:', err);
        } else {
            console.log('Table dropped successfully.');
        }
        showMenu();
    });
}

function insertRecords() {
    const sql = `
        INSERT INTO Student (Student_ID, Student_FirstName, Student_LastName, Student_City, Student_State, Student_Grade) 
        VALUES 
        (1, 'Krisha', 'Patel', 'Vadodara', 'Gujarat', '11'),
        (2, 'Aditya', 'Suthar', 'Vadodara', 'Gujarat', '11'),
        (3, 'Vyom', 'Varia', 'Vadodara', 'Gujarat', 11), 
        (4, 'Prahlad', 'Suthar', 'Vadodara', 'Gujarat', 11)
    `;
    database.query(sql, (err, results) => {
        if (err) {
            console.error('Error inserting records:', err);
        } else {
            console.log('Records inserted successfully.');
        }
        showMenu();
    });
}

function selectRecords() {
    database.query('SELECT * FROM Student', (err, results) => {
        if (err) {
            console.error('Error fetching records:', err);
        } else {
            console.table(results);
        }
        showMenu();
    });
}

function selectRecordsWithCondition() {
    console.log(`
Select records by:
1. Student_ID
2. Student_City
3. Student_State
4. Student_Grade
5. Go Back
    `);

    rl.question('Enter your choice (1-5): ', (choice) => {
        switch (choice) {
            case '1':
                rl.question('Enter Student_ID: ', (id) => {
                    queryWithCondition('Student_ID = ?', [id]);
                });
                break;
            case '2':
                rl.question('Enter Student_City: ', (city) => {
                    queryWithCondition('Student_City = ?', [city]);
                });
                break;
            case '3':
                rl.question('Enter Student_State: ', (state) => {
                    queryWithCondition('Student_State = ?', [state]);
                });
                break;
            case '4':
                rl.question('Enter Student_Grade: ', (grade) => {
                    queryWithCondition('Student_Grade = ?', [grade]);
                });
                break;
            case '5':
                showMenu();
                break;
            default:
                console.log('Invalid choice.');
                selectRecordsWithCondition();
        }
    });
}

function queryWithCondition(condition, params) {
    const sql = `SELECT * FROM Student WHERE ${condition}`;
    database.query(sql, params, (err, results) => {
        if (err) {
            console.error('Error fetching records:', err);
        } else {
            console.table(results);
        }
        showMenu();
    });
}