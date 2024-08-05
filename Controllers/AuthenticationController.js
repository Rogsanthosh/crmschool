// const express = require('express');
// const jwt = require('jsonwebtoken');
// const config = require('../config');

// const router = express.Router();
// module.exports = (db) => {
// // Login endpoint
// // router.post('/login', async (req, res) => {
// //     const { userId, password, role } = req.body;
  
// //     try {
// //       const [rows] = await db.execute('SELECT * FROM admin_data WHERE email = ? AND role = ? AND phone_number = ?', [userId, role, password]);
  
// //       if (rows.length === 0) {
// //         return res.status(401).json({ message: 'Invalid credentials' });
// //       }
  
// //       const user = rows[0];
  
// //       res.json({
// //         role: user.role,
// //         user: {
// //           userId: user.email,
// //           name: user.name,
// //           email: user.email,
// //           phoneNumber: user.phone_number,
// //           role: user.role
// //         }
// //       });
// //     } catch (err) {
// //       console.error(err);
// //       res.status(500).json({ message: 'Server error' });
// //     }
// //   });


// router.post('/auth/login', async (req, res) => {
//     const { userId, password, role } = req.body;

//     try {
//         let query;
//         let params = [userId, password];

//         if (role === 'Admin' || role === 'superAdmin') {
//             query = 'SELECT * FROM admin_data WHERE userId = ? AND password = ?';
//         } else if (role === 'user') {
//             query = 'SELECT * FROM user_data WHERE userId = ? AND password = ?';
//         } else {
//             return res.status(400).json({ error: 'Invalid role' });
//         }

//         const user = await db.query(query, params);

//         if (user.length === 0) {
//             return res.status(401).json({ error: 'Invalid credentials' });
//         }

//         // Check if the user has a valid staff allocation
//         const allocation = await db.query('SELECT * FROM staff_allocation WHERE staff_id = ? AND academic_year = ? AND isExpired = 0', [user[0].staff_id, '2024-2025']); // Example academic year

//         if (allocation.length === 0) {
//             return res.status(403).json({ error: 'No valid staff allocation found' });
//         }

//         // Respond with user data and role
//         res.json({
//             role: user[0].role,
//             staff_id: user[0].staff_id
//         });
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });
  
  
//   return router;
  
// }
