import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';

import StudentLookup from './StudentLookup';
import ClassLookupCascade from './ClassLookupCascade';
import AssignmentAdder from './AssignmentAdder';
import ApplicationList from './ApplicationList';
import Login from './Login';
import MasterDashboard from './MasterDashboard';
import BulkUploadAssignments from './BulkUploadAssignments';

function App() {
  const [studentData, setStudentData] = useState(null);
  const [classDetails, setClassDetails] = useState(null);
  const [formResetKey, setFormResetKey] = useState(0);
  const [isAuthenticated, setAuth] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setStudentData(null);
      setClassDetails(null);
      setFormResetKey(prev => prev + 1);
    }
  }, [location]);

  const handleLogin = () => setAuth(true);
  const handleLogout = () => setAuth(false);

  const onReset = () => {
    setStudentData(null);
    setClassDetails(null);
    setFormResetKey(prev => prev + 1);
  };

  return (
    <>
      <nav style={navStyles.navbar}>
        <ul style={navStyles.navList}>
          <li><Link to="/" style={navStyles.navLink}>Home</Link></li>
          <li><Link to="/applications" style={navStyles.navLink}>Applications</Link></li>
          <li><Link to="/bulk-upload" style={navStyles.navLink}>Bulk Upload</Link></li>
          {!isAuthenticated ? (
            <li><Link to="/login" style={navStyles.navLink}>Login</Link></li>
          ) : (
            <>
              <li><Link to="/dashboard" style={navStyles.navLink}>Dashboard</Link></li>
              <li>
                <button onClick={handleLogout} style={navStyles.logoutBtn}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>

      <div style={pageStyles.container}>
        <Routes>
          <Route
            path="/"
            element={
              <div style={homeStyles.container}>
                <h2 style={homeStyles.header}>Student Assignment Management</h2>

                <div style={homeStyles.section}>
                  <StudentLookup
                    key={`student-${formResetKey}`}
                    setStudentData={setStudentData}
                  />
                </div>

                <div style={homeStyles.section}>
                  <ClassLookupCascade
                    key={`class-${formResetKey}`}
                    setClassDetails={setClassDetails}
                  />
                </div>

                {studentData && (
                  <div style={homeStyles.section}>
                    <AssignmentAdder
                      studentData={studentData}
                      classDetails={classDetails || {}}
                      onReset={onReset}
                    />
                  </div>
                )}
              </div>
            }
          />
          <Route path="/applications" element={<ApplicationList />} />
          <Route
            path="/login"
            element={
              isAuthenticated
                ? <Navigate to="/dashboard" replace />
                : <Login onLogin={handleLogin} />
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated
                ? <MasterDashboard />
                : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/bulk-upload"
            element={
               <BulkUploadAssignments />
            }
          />
        </Routes>
      </div>
    </>
  );
}

const navStyles = {
  navbar: {
    backgroundColor: '#8c1d40',
    padding: '10px 20px',
    borderBottom: '10px solid #ffba05'
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    margin: 0,
    padding: 0,
    gap: '15px'
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  logoutBtn: {
    background: 'transparent',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    fontWeight: 'bold',
    padding: 0
  }
};

const pageStyles = {
  container: {
    padding: '20px',
    backgroundColor: '#f7f7f7',
    minHeight: '100vh'
  }
};

const homeStyles = {
  container: {
    maxWidth: '960px',
    margin: '0 auto',
    padding: '20px'
  },
  header: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '30px',
    color: '#333',
    textAlign: 'center'
  },
  section: {
    marginBottom: '40px',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 8px rgba(0,0,0,0.1)',
    width: '100%'
  }
};

export default App;









// --- Original without the reset logic on the uselocation of browser router ---

// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

// import StudentLookup from './StudentLookup';
// import ClassLookupCascade from './ClassLookupCascade';
// import AssignmentAdder from './AssignmentAdder';
// import ApplicationList from './ApplicationList';
// import Login from './Login';
// import MasterDashboard from './MasterDashboard';

// function App() {
//   const [studentData, setStudentData] = useState(null);
//   const [classDetails, setClassDetails] = useState(null);
//   const [formResetKey, setFormResetKey] = useState(0); // ✅ Added
//   const [isAuthenticated, setAuth] = useState(false);

//   const handleLogin = () => setAuth(true);
//   const handleLogout = () => setAuth(false);

//   // ✅ Reset the entire form stack (Student + Class + AssignmentAdder)
//   const onReset = () => {
//     setStudentData(null);
//     setClassDetails(null);
//     setFormResetKey(prev => prev + 1); // force remount
//   };

//   return (
//     <Router>
//       <nav style={navStyles.navbar}>
//         <ul style={navStyles.navList}>
//           <li><Link to="/" style={navStyles.navLink}>Home</Link></li>
//           <li><Link to="/applications" style={navStyles.navLink}>Applications</Link></li>
//           {!isAuthenticated ? (
//             <li><Link to="/login" style={navStyles.navLink}>Login</Link></li>
//           ) : (
//             <>
//               <li><Link to="/dashboard" style={navStyles.navLink}>Dashboard</Link></li>
//               <li>
//                 <button onClick={handleLogout} style={navStyles.logoutBtn}>Logout</button>
//               </li>
//             </>
//           )}
//         </ul>
//       </nav>

//       <div style={pageStyles.container}>
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <div style={homeStyles.container}>
//                 <h2 style={homeStyles.header}>Student Assignment Management</h2>

//                 <div style={homeStyles.section}>
//                   <StudentLookup
//                     key={`student-${formResetKey}`} // ✅ key forces remount
//                     setStudentData={setStudentData}
//                   />
//                 </div>

//                 <div style={homeStyles.section}>
//                   <ClassLookupCascade
//                     key={`class-${formResetKey}`} // ✅ key forces remount
//                     setClassDetails={setClassDetails}
//                   />
//                 </div>

//                 {studentData && (
//                   <div style={homeStyles.section}>
//                     <AssignmentAdder
//                       studentData={studentData}
//                       classDetails={classDetails || {}}
//                       onReset={onReset} // ✅ trigger reset
//                     />
//                   </div>
//                 )}
//               </div>
//             }
//           />
//           <Route path="/applications" element={<ApplicationList />} />
//           <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />} />
//           <Route path="/dashboard" element={isAuthenticated ? <MasterDashboard /> : <Navigate to="/login" replace />} />
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

// const pageStyles = {
//   container: {
//     padding: '20px',
//     backgroundColor: '#f7f7f7',
//     minHeight: '100vh'
//   }
// };

// const homeStyles = {
//   container: {
//     maxWidth: '960px',
//     margin: '0 auto',
//     padding: '20px'
//   },
//   header: {
//     fontSize: '28px',
//     fontWeight: 'bold',
//     marginBottom: '30px',
//     color: '#333',
//     textAlign: 'center'
//   },
//   section: {
//     marginBottom: '40px',
//     backgroundColor: '#ffffff',
//     padding: '20px',
//     borderRadius: '8px',
//     boxShadow: '0 0 8px rgba(0,0,0,0.1)',
//     width: '100%',
//   }
// };

// export default App;




//{/* <AssignmentAdder
//   studentData={studentData}
//   classDetails={classDetails}
//   onReset={() => {
//     setStudentData(null);
//     setClassDetails(null);
//   }}
// /> */}







// I do like this one in a card format ----------------------------------------------------------------



// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
// import StudentLookup from './StudentLookup';
// import ClassLookupCascade from './ClassLookupCascade';
// import AssignmentAdder from './AssignmentAdder';
// import ApplicationList from './ApplicationList';
// import Login from './Login';
// import MasterDashboard from './MasterDashboard';

// // MUI imports
// import { AppBar, Toolbar, Typography, Button, Box, Card, CardContent, Grid } from '@mui/material';

// function App() {
//   const [studentData, setStudentData] = useState(null);
//   const [classDetails, setClassDetails] = useState(null);
//   const [isAuthenticated, setAuth] = useState(false);

//   const handleLogin = () => setAuth(true);
//   const handleLogout = () => setAuth(false);

//   return (
//     <Router>
//       {/* Navbar */}
//       <AppBar position="static" sx={{ bgcolor: '#8c1d40', borderBottom: '10px solid #ffba05' }}>
//         <Toolbar>
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             ASU Student Assignment Dashboard
//           </Typography>
//           <Button color="inherit" component={Link} to="/">Home</Button>
//           <Button color="inherit" component={Link} to="/applications">Applications</Button>
//           {!isAuthenticated ? (
//             <Button color="inherit" component={Link} to="/login">Login</Button>
//           ) : (
//             <>
//               <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
//               <Button color="inherit" onClick={handleLogout}>Logout</Button>
//             </>
//           )}
//         </Toolbar>
//       </AppBar>

//       {/* Page Content */}
//       <Box sx={{ padding: 4 }}>
//         <Routes>
//           {/* Home Page */}
//           <Route
//             path="/"
//             element={
//               <Grid container spacing={4}>
//                 <Grid item xs={12} md={12}>
//                   <Card variant="outlined">
//                     <CardContent>
//                       <Typography variant="h5" gutterBottom>🔍 Student Lookup</Typography>
//                       <StudentLookup setStudentData={setStudentData} />
//                     </CardContent>
//                   </Card>
//                 </Grid>

//                 <Grid item xs={12} md={12}>
//                   <Card variant="outlined">
//                     <CardContent>
//                       <Typography variant="h5" gutterBottom>🏫 Class Selection</Typography>
//                       <ClassLookupCascade setClassDetails={setClassDetails} />
//                     </CardContent>
//                   </Card>
//                 </Grid>

//                 {studentData && (
//                   <Grid item xs={12} md={12}>
//                     <Card variant="outlined">
//                       <CardContent>
//                         <Typography variant="h5" gutterBottom>📌 Assign Student to Class</Typography>
//                         <AssignmentAdder studentData={studentData} classDetails={classDetails || {}} />
//                       </CardContent>
//                     </Card>
//                   </Grid>
//                 )}
//               </Grid>
//             }
//           />

//           {/* Applications Page */}
//           <Route path="/applications" element={<ApplicationList />} />

//           {/* Login Page */}
//           <Route
//             path="/login"
//             element={
//               isAuthenticated
//                 ? <Navigate to="/dashboard" replace />
//                 : <Login onLogin={handleLogin} />
//             }
//           />

//           {/* Dashboard Page */}
//           <Route
//             path="/dashboard"
//             element={
//               isAuthenticated
//                 ? <MasterDashboard />
//                 : <Navigate to="/login" replace />
//             }
//           />
//         </Routes>
//       </Box>
//     </Router>
//   );
// }

// export default App;







//  ________________ v1 which isnt bad 





// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
// import StudentLookup from './StudentLookup';
// import ClassLookupCascade from './ClassLookupCascade';
// import AssignmentAdder from './AssignmentAdder';
// import ApplicationList from './ApplicationList';
// import Login from './Login';
// import MasterDashboard from './MasterDashboard';

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
//              <li style={navStyles.navItem}>
//               <Link to="/dashboard" style={navStyles.navLink}> Master Dashboard</Link>
//              </li>
//               <li style={navStyles.navItem}>
//                 <button onClick={handleLogout} style={navStyles.logoutBtn}>Logout</button>
//               </li>
//              </>
//             )}
//         </ul>
//       </nav>

//       <div style={{ padding: '20px' }}>
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <>
//                 <StudentLookup setStudentData={setStudentData} />
//                 <hr />
//                 <ClassLookupCascade setClassDetails={setClassDetails} />
//                 <hr />
//                 {studentData && (
//                   <AssignmentAdder studentData={studentData} classDetails={classDetails || {}} />
//                 )}
//               </>
//             }
//           />
//           <Route path="/applications" element={<ApplicationList />} />

//           <Route
//             path="/login"
//             element={
//               isAuthenticated
//                 ? <Navigate to="/dashboard" replace/>
//                 : <Login onLogin={handleLogin}/>
//             }
//           />

//           <Route
//             path="/dashboard"
//             element={
//               isAuthenticated
//                 ? <MasterDashboard/>
//                 : <Navigate to="/login" replace/>
//             }
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// const navStyles = {
//   navbar: {
//     // Maroon color is #8c1d40 and yellow sun color is #ffba05, default is blue #007bff
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