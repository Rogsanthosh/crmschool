const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const port = 2001;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('./uploads', express.static(path.join(__dirname, 'uploads')),(err)=>{
    console.log("image ",err)
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '_' + uniqueSuffix);
    }
});

const storageExcel = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + '_' + uniqueSuffix + extension);
    }
});

const upload = multer({ storage: storage });
const uploadExcel = multer({storage: storageExcel});

const db = mysql.createPool({
    // host: "127.0.0.1",
    // port: "3306",
    // user: "root",
    // password: "0210",
    // database: "school"

    host:'193.203.184.74',
    port:"3306",
    user:'u534462265_AS_GLOBAL',
    password:'ASGlobal@12345',
    database:'u534462265_school_crm'

});

(async () => {
    try {
        const connection = await db.getConnection();
        console.log("Database is connected successfully.");
        connection.release();
    } catch (err) {
        console.log("Database is not connected.", err.message);
    }
})();
     
// const authenticationController =require('./Controllers/AuthenticationController')(db);
// app.use('/auth',authenticationController );

const departmentController = require('./Controllers/departmentController')(db);
app.use('/department', departmentController);

const roleController = require('./Controllers/roleController')(db);
app.use('/role', roleController);

const classAndSecController = require('./Controllers/classAndSecController')(db);
app.use('/clsAndSec', classAndSecController);

const staffsMasterController = require('./Controllers/staffsMasterController')(db, upload);
app.use('/staffs', staffsMasterController);

const studentsMasterController = require('./Controllers/studentsMasterController')(db, upload);
app.use('/students', studentsMasterController);

const studentsAllocationController = require('./Controllers/studentsAllocationController')(db, upload);
app.use('/stuAllocation', studentsAllocationController);

const feesAllocationController = require('./Controllers/feesAllocationController')(db, upload);
app.use('/feeAllocation', feesAllocationController);

const feesLogsController = require('./Controllers/feesLogsController')(db, upload);
app.use('/feeLogs', feesLogsController);

const discountController = require('./Controllers/discountController')(db, upload);
app.use('/discount', discountController);

const classTeacherAndAttenance = require('./Controllers/classTeacherAndAttenance')(db);
app.use('/attenance', classTeacherAndAttenance);

const subjectController = require('./Controllers/subjectController')(db);
app.use('/subject', subjectController);

const staffAllocationController = require('./Controllers/staffAllocationController')(db);
app.use('/staffAllocation', staffAllocationController);

const classTeacherController = require('./Controllers/classTeacherController')(db);
app.use('/clsTeach', classTeacherController);

const dashboardController = require('./Controllers/dashboardController')(db);
app.use('/dashboard', dashboardController);

const timeTableController = require('./Controllers/timeTableController')(db,upload);
app.use('/timeTable', timeTableController);

const studentsUploadExcelController = require('./Controllers/studentsUploadExcelController')(db,uploadExcel);
app.use('/upload', studentsUploadExcelController);



app.post('/addstudents', (req, res) => {
    const data = req.body;
    console.log('Received data:', data);
    const sql = `INSERT INTO students_data 
      (class, student_name, date_of_birth, gender, date_of_join, father_name, father_mobile, mother_name, mother_mobile, address, aadhar_no, community, bookingfees, totalfees) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
    db.query(sql, [
      data.cls_id, 
      data.stu_name, 
      data.dob, 
      data.gender, 
      data.doj, 
      data.father_name, 
      data.father_mobile, 
      data.mother_name, 
      data.mother_mobile, 
      data.address, 
      data.stu_aadhar, 
      data.community, 
      data.Bookingfees,
      data.totalfees
    ], (err, result) => {
      if (err) {
          console.error("Error executing query:", err);
          return res.status(500).json({ message: "Internal server error." });
      } else {
          console.log("Query result:", result);
          return res.status(200).json({ message: "Data added successfully." });
      }
    });
  });
  

app.listen(port, () => {
    console.log(`Server is running on ${port}...`);
});
