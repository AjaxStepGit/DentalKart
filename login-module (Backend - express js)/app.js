require('dotenv').config();
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path')
const app = express()


const userRouter = require('./api/users/users.router')
app.use(cors())
app.use(express.json())
app.use(bodyParser.json());

app.use('/', userRouter)

/*app.get('/', (req, res) => {
    res.send('Hello')
})*/

// MULTER CONFIGURATION

let storage = multer.diskStorage({
    destination:(req, file, callback) => {
        callback(null, 'uploads/')
    },
    filename:(req, file, callback) => {
        callback(null, file.fieldname +'-'+ Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage });


//Routing for uploading the data into the table
app.post('/submit-form', upload.single('file'), (req, res) => {
    console.log(req.file.path); // check if req.file is defined
    insertDataIntoDB(__dirname+'/uploads/'+req.file.filename, res)
});

//Routing for downloading the data from db table
app.get('/download', (req, res) => {
    downloadData(res)
})

// Routing for listing the data from the db
app.get('/getall', (req, res) => {
    listData(res)
})


const listData = async (res) => {
    const mysql = require('mysql2')
    const connection = await mysql.createConnection({
        host : 'localhost' ,
        port : 3306,
        user : 'root',
        password : '',
        database : 'ajaxdb'
    })
    const sqlGet = "SELECT * FROM `students`"
    connection.query(sqlGet, (error, result) => {
        res.send(result)
    })
}

const downloadData = async (res) => {
    const mysql = require('mysql2/promise')
    const stringify = require('csv-stringify');
    const fs = require('fs')
    const csv = require('fast-csv')

    const connection = await mysql.createConnection({
        host : 'localhost' ,
        port : 3306,
        user : 'root',
        password : '',
        database : 'ajaxdb'
    })

    try{

        const [rows] = await connection.query('SELECT Name, Roll_No, Address, Institute, Course, Email FROM students')
        const filteredRows = rows.map(({ id, ...rest }) => rest);

        //console.log(filteredRows)

        stringify(filteredRows, { header: true }, (err, csvString) => {
            if(err){
                console.error(err)
                res.status(500).send('Error generating CSV file')
            } else {
                console.log(csvString)
                res.set('Content-Type', 'text/csv')
                res.set('Content-Disposition', 'attachment; filename=data.csv')
                res.send(csvString)
            }
        })
    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error')
    } finally {
        connection.end()
    }

    
}


const insertDataIntoDB = async (path, res) => {
    const mysql = require('mysql2/promise')
    const fs = require('fs')
    const csv = require('fast-csv')

    const connection = await mysql.createConnection({
        host : 'localhost' ,
        port : 3306,
        user : 'root',
        password : '',
        database : 'ajaxdb'
    })

    const rows = []

    fs.createReadStream(path)
    .pipe(csv.parse({header : true}))
    .on('error', (error) => console.error(error))
    .on('data', (row) => rows.push(row))
    .on('end', async (rowCount) => {
        console.log(`Parsed ${rowCount} rows`)
        let count = 0
        for(const row of rows){
            //console.log(row[0])

            const[existingRow] = await connection.query(
                `SELECT * FROM students WHERE Roll_No = ? AND Name = ?`, [row[1], row[0]]
            )

            console.log(existingRow)

            if ((!existingRow.length) && (row[0] != "Name")) {
                console.log(`Inserting row: ${JSON.stringify(row)}`);
                // Insert the row into the database
                await connection.query(
                    `INSERT INTO students (id, Name, Roll_No, Address, Institute, Course, Email) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                    [null, row[0], row[1], row[2], row[3], row[4], row[5]]
                );
            } else {
                console.log(`Skipping row: ${JSON.stringify(row)}`);
            }

        }

        console.log('Data Inserted Successfully')


        await connection.end()

        res.send({
            success: 1,
            message: 'Success'
        })
    })
}


app.listen(process.env.APP_PORT, () => {
    console.log('Server running at: ', process.env.APP_PORT)
})