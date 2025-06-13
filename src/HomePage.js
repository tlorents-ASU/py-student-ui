// // src/HomePage.js

// import React from 'react';
// import { Container, Grid, Typography, Paper } from '@mui/material';
// import StudentLookup from './StudentLookup';
// import ClassLookupCascade from './ClassLookupCascade';
// import AssignmentAdder from './AssignmentAdder';

// export default function HomePage({ setStudentData, setClassDetails, studentData, classDetails }) {
//   return (
//     <Container maxWidth="md" sx={{ mt: 4 }}>
//       <Grid container spacing={4}>
//         <Grid item xs={12}>
//           <Typography variant="h4" gutterBottom>
//             ASU Student Assignment Dashboard
//           </Typography>
//         </Grid>

//         <Grid item xs={12}>
//           <Paper elevation={3} sx={{ p: 3 }}>
//             <Typography variant="h6" gutterBottom>Step 1: Search Student</Typography>
//             <StudentLookup setStudentData={setStudentData} />
//           </Paper>
//         </Grid>

//         <Grid item xs={12}>
//           <Paper elevation={3} sx={{ p: 3 }}>
//             <Typography variant="h6" gutterBottom>Step 2: Lookup Class</Typography>
//             <ClassLookupCascade setClassDetails={setClassDetails} />
//           </Paper>
//         </Grid>

//         {studentData && (
//           <Grid item xs={12}>
//             <Paper elevation={3} sx={{ p: 3 }}>
//               <Typography variant="h6" gutterBottom>Step 3: Add Assignment</Typography>
//               <AssignmentAdder studentData={studentData} classDetails={classDetails || {}} />
//             </Paper>
//           </Grid>
//         )}
//       </Grid>
//     </Container>
//   );
// }




// // src/HomePage.js
// import React from 'react';
// import StudentLookup from './StudentLookup';
// import ClassLookupCascade from './ClassLookupCascade';
// import AssignmentAdder from './AssignmentAdder';

// const HomePage = ({ studentData, setStudentData, classDetails, setClassDetails }) => {
//   return (
//     <div style={styles.container}>
//       <section>
//         <h2 style={styles.sectionTitle}>Student Lookup</h2>
//         <StudentLookup setStudentData={setStudentData} />
//       </section>

//       <hr style={styles.divider} />

//       <section>
//         <h2 style={styles.sectionTitle}>Class Lookup</h2>
//         <ClassLookupCascade setClassDetails={setClassDetails} />
//       </section>

//       <hr style={styles.divider} />

//       {studentData && (
//         <section>
//           <h2 style={styles.sectionTitle}>Assignment Entry</h2>
//           <AssignmentAdder studentData={studentData} classDetails={classDetails || {}} />
//         </section>
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: '1100px',
//     margin: 'auto',
//     padding: '30px',
//   },
//   sectionTitle: {
//     fontSize: '1.8rem',
//     marginBottom: '10px',
//     borderBottom: '2px solid #8c1d40',
//     paddingBottom: '5px',
//     color: '#8c1d40',
//   },
//   divider: {
//     margin: '40px 0',
//     border: 'none',
//     borderTop: '1px dashed #ccc',
//   }
// };

// export default HomePage;



// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

// import ApplicationList from './ApplicationList';
// import Login from './Login';
// import MasterDashboard from './MasterDashboard';
// import HomePage from './HomePage'; // New component

// function App() {
//   const [studentData, setStudentData] = useState(null);
//   const [classDetails, setClassDetails] = useState(null);
//   const [isAuthenticated, setAuth] = useState(false);

//   const handleLogin = () => setAuth(true);
//   const handleLogout = () => setAuth(false);

//   return (
//     <Router>
//       <nav style={navStyles.navbar}>
//         <ul style={navStyles.navList}>
//           <li style={navStyles.navItem}>
//             <Link to="/" style={navStyles.navLink}>Home</Link>
//           </li>
//           <li style={navStyles.navItem}>
//             <Link to="/applications" style={navStyles.navLink}>View Masters Applications</Link>
//           </li>

//           {!isAuthenticated && (
//             <li style={navStyles.navItem}>
//               <Link to="/login" style={navStyles.navLink}>Login</Link>
//             </li>
//           )}

//           {isAuthenticated && (
//             <>
//               <li style={navStyles.navItem}>
//                 <Link to="/dashboard" style={navStyles.navLink}>Master Dashboard</Link>
//               </li>
//               <li style={navStyles.navItem}>
//                 <button onClick={handleLogout} style={navStyles.logoutBtn}>Logout</button>
//               </li>
//             </>
//           )}
//         </ul>
//       </nav>

//       <div style={{ padding: '20px' }}>
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <HomePage
//                 studentData={studentData}
//                 setStudentData={setStudentData}
//                 classDetails={classDetails}
//                 setClassDetails={setClassDetails}
//               />
//             }
//           />
//           <Route path="/applications" element={<ApplicationList />} />
//           <Route
//             path="/login"
//             element={
//               isAuthenticated
//                 ? <Navigate to="/dashboard" replace />
//                 : <Login onLogin={handleLogin} />
//             }
//           />
//           <Route
//             path="/dashboard"
//             element={
//               isAuthenticated
//                 ? <MasterDashboard />
//                 : <Navigate to="/login" replace />
//             }
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// const navStyles = {
//   navbar: {
//     backgroundColor: '#8c1d40',
//     padding: '10px 20px',
//     borderBottom: '10px solid #ffba05'
//   },
//   navList: {
//     listStyle: 'none',
//     display: 'flex',
//     margin: 0,
//     padding: 0,
//     gap: '15px'
//   },
//   navItem: {
//     marginRight: '20px'
//   },
//   navLink: {
//     color: '#fff',
//     textDecoration: 'none',
//     fontWeight: 'bold'
//   },
//   logoutBtn: {
//     background: 'transparent',
//     border: 'none',
//     color: 'white',
//     cursor: 'pointer',
//     fontWeight: 'bold',
//     padding: 0
//   }
// };

// export default App;
