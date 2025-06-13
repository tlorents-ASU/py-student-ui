// import React, { useState } from 'react';

// const ClassLookup = () => {
//   // State for the ClassNum input (captured as a string because HTML inputs return strings)
//   const [classNumInput, setClassNumInput] = useState('');
//   // State for the fetched class data; initialize with default empty values
//   const [classData, setClassData] = useState({
//     classNum: '',
//     term: '',
//     subject: '',
//     catalogNum: '',
//     session: '',
//     instructorID: '',
//     instructorLastName: '',
//     instructorFirstName: '',
//     instructorEmail: ''
//   });
//   // Error and loading state
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Fetch class details by ClassNum
//   const handleClassSearch = async () => {
//     setError('');
//     setLoading(true);
//     // Clear any previous data
//     setClassData({
//       classNum: '',
//       term: '',
//       subject: '',
//       catalogNum: '',
//       session: '',
//       instructorID: '',
//       instructorLastName: '',
//       instructorFirstName: '',
//       instructorEmail: ''
//     });

//     // Convert the input string to a number
//     const classNum = parseInt(classNumInput, 10);
//     if (isNaN(classNum)) {
//       setError('Please enter a valid numeric Class Number');
//       setLoading(false);
//       return;
//     }

//     try {
//       // Call the GET endpoint; the API accepts an int.
//       const response = await fetch(`https://localhost:7209/api/Class/${classNum}`);
//       if (!response.ok) {
//         throw new Error('Class not found');
//       }
//       const data = await response.json();
//       setClassData(data);
//     } catch (err) {
//       setError(err.message);
//     }
//     setLoading(false);
//   };

//   // Update class details using the API
//   const handleClassUpdate = async () => {
//     setError('');
//     setLoading(true);
//     try {
//       const response = await fetch(`https://localhost:7209/api/Class/${classData.classNum}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(classData)
//       });
//       if (!response.ok) {
//         throw new Error('Failed to update class details');
//       }
//       alert('Class details updated successfully!');
//     } catch (err) {
//       setError(err.message);
//     }
//     setLoading(false);
//   };

//   // Generic handler to update individual fields
//   const handleChange = (field, value) => {
//     setClassData(prev => ({ ...prev, [field]: value }));
//   };

//   return (
//     <div style={styles.container}>
//       <h1>Class Lookup</h1>
//       <div style={styles.searchContainer}>
//         <label htmlFor="classNum" style={styles.label}>Class Number (PK):</label>
//         <input
//           type="text"
//           id="classNum"
//           value={classNumInput}
//           onChange={(e) => setClassNumInput(e.target.value)}
//           placeholder="Enter Class Number"
//           style={styles.input}
//         />
//         <button onClick={handleClassSearch} style={styles.button}>Search</button>
//       </div>
//       {loading && <p>Loading class...</p>}
//       {error && <p style={styles.error}>Error: {error}</p>}
//       {classData && classData.classNum !== '' && (
//         <div style={styles.detailsCard}>
//           <h2>Class Details</h2>
//           <div style={styles.field}>
//             <label style={styles.fieldLabel}>Term:</label>
//             <input
//               type="text"
//               value={classData.term}
//               onChange={(e) => handleChange('term', e.target.value)}
//               style={styles.fieldInput}
//             />
//           </div>
//           <div style={styles.field}>
//             <label style={styles.fieldLabel}>Subject:</label>
//             <input
//               type="text"
//               value={classData.subject}
//               onChange={(e) => handleChange('subject', e.target.value)}
//               style={styles.fieldInput}
//             />
//           </div>
//           <div style={styles.field}>
//             <label style={styles.fieldLabel}>Catalog Number:</label>
//             <input
//               type="text"
//               value={classData.catalogNum}
//               onChange={(e) => handleChange('catalogNum', e.target.value)}
//               style={styles.fieldInput}
//             />
//           </div>
//           <div style={styles.field}>
//             <label style={styles.fieldLabel}>Session:</label>
//             <input
//               type="text"
//               value={classData.session}
//               onChange={(e) => handleChange('session', e.target.value)}
//               style={styles.fieldInput}
//             />
//           </div>
//           <div style={styles.field}>
//             <label style={styles.fieldLabel}>Instructor ID:</label>
//             <input
//               type="text"
//               value={classData.instructorID}
//               onChange={(e) => handleChange('instructorID', e.target.value)}
//               style={styles.fieldInput}
//             />
//           </div>
//           <div style={styles.field}>
//             <label style={styles.fieldLabel}>Instructor Last Name:</label>
//             <input
//               type="text"
//               value={classData.instructorLastName}
//               onChange={(e) => handleChange('instructorLastName', e.target.value)}
//               style={styles.fieldInput}
//             />
//           </div>
//           <div style={styles.field}>
//             <label style={styles.fieldLabel}>Instructor First Name:</label>
//             <input
//               type="text"
//               value={classData.instructorFirstName}
//               onChange={(e) => handleChange('instructorFirstName', e.target.value)}
//               style={styles.fieldInput}
//             />
//           </div>
//           <div style={styles.field}>
//             <label style={styles.fieldLabel}>Instructor Email:</label>
//             <input
//               type="text"
//               value={classData.instructorEmail}
//               onChange={(e) => handleChange('instructorEmail', e.target.value)}
//               style={styles.fieldInput}
//             />
//           </div>
//           <button onClick={handleClassUpdate} style={styles.updateButton}>Update Class Details</button>
//         </div>
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     padding: '20px',
//     fontFamily: 'Arial, sans-serif'
//   },
//   searchContainer: {
//     marginBottom: '20px',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '10px'
//   },
//   label: { fontWeight: 'bold' },
//   input: { padding: '8px', width: '200px' },
//   button: { padding: '8px 16px' },
//   error: { color: 'red' },
//   detailsCard: {
//     marginTop: '20px',
//     padding: '20px',
//     border: '1px solid #ccc',
//     borderRadius: '8px',
//     maxWidth: '600px'
//   },
//   field: {
//     marginBottom: '10px',
//     display: 'flex',
//     flexDirection: 'column'
//   },
//   fieldLabel: {
//     fontWeight: 'bold',
//     marginBottom: '5px'
//   },
//   fieldInput: {
//     padding: '8px',
//     width: '100%'
//   },
//   updateButton: {
//     marginTop: '20px',
//     padding: '10px 20px',
//     backgroundColor: '#4CAF50',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer'
//   }
// };

// export default ClassLookup;


// // import React, { useState } from 'react';

// // const ClassLookup = () => {
// //   // State for the ClassNum input (captured as a string from the input field)
// //   const [classNumInput, setClassNumInput] = useState('');
// //   // State for the fetched class data; initialize with default empty values
// //   const [classData, setClassData] = useState({
// //     classNum: '',
// //     term: '',
// //     subject: '',
// //     catalogNum: '',
// //     session: '',
// //     instructorID: '',
// //     instructorLastName: '',
// //     instructorFirstName: '',
// //     instructorEmail: ''
// //   });
// //   // Error and loading state
// //   const [error, setError] = useState('');
// //   const [loading, setLoading] = useState(false);

// //   const handleClassSearch = async () => {
// //     setError('');
// //     setLoading(true);
// //     // Clear any existing data
// //     setClassData({
// //       classNum: '',
// //       term: '',
// //       subject: '',
// //       catalogNum: '',
// //       session: '',
// //       instructorID: '',
// //       instructorLastName: '',
// //       instructorFirstName: '',
// //       instructorEmail: ''
// //     });

// //     // Convert the input string to a number
// //     const classNum = parseInt(classNumInput, 10);
// //     if (isNaN(classNum)) {
// //       setError('Please enter a valid numeric Class Number');
// //       setLoading(false);
// //       return;
// //     }

// //     try {
// //       // Call the GET endpoint; the API accepts an int.
// //       const response = await fetch(`https://localhost:7209/api/Class/${classNum}`);
// //       if (!response.ok) {
// //         throw new Error('Class not found');
// //       }
// //       const data = await response.json();
// //       setClassData(data);
// //     } catch (err) {
// //       setError(err.message);
// //     }
// //     setLoading(false);
// //   };

// //   // Handler to update individual fields if you want to allow editing later
// //   const handleChange = (field, value) => {
// //     setClassData(prev => ({ ...prev, [field]: value }));
// //   };

// //   return (
// //     <div style={styles.container}>
// //       <h1>Class Lookup</h1>
// //       <div style={styles.searchContainer}>
// //         <label htmlFor="classNum" style={styles.label}>Class Number (PK):</label>
// //         <input
// //           type="text"
// //           id="classNum"
// //           value={classNumInput}
// //           onChange={(e) => setClassNumInput(e.target.value)}
// //           placeholder="Enter Class Number"
// //           style={styles.input}
// //         />
// //         <button onClick={handleClassSearch} style={styles.button}>Search</button>
// //       </div>
// //       {loading && <p>Loading class...</p>}
// //       {error && <p style={styles.error}>Error: {error}</p>}
// //       {/* Render the form only if a class is found (i can check a key field like classNum) */}
// //       {classData && classData.classNum !== '' && (
// //         <div style={styles.detailsCard}>
// //           <h2>Class Details</h2>
// //           <div style={styles.field}>
// //             <label style={styles.fieldLabel}>Term:</label>
// //             <input
// //               type="text"
// //               value={classData.term}
// //               onChange={(e) => handleChange('term', e.target.value)}
// //               style={styles.fieldInput}
// //             />
// //           </div>
// //           <div style={styles.field}>
// //             <label style={styles.fieldLabel}>Subject:</label>
// //             <input
// //               type="text"
// //               value={classData.subject}
// //               onChange={(e) => handleChange('subject', e.target.value)}
// //               style={styles.fieldInput}
// //             />
// //           </div>
// //           <div style={styles.field}>
// //             <label style={styles.fieldLabel}>Catalog Number:</label>
// //             <input
// //               type="text"
// //               value={classData.catalogNum}
// //               onChange={(e) => handleChange('catalogNum', e.target.value)}
// //               style={styles.fieldInput}
// //             />
// //           </div>
// //           <div style={styles.field}>
// //             <label style={styles.fieldLabel}>Session:</label>
// //             <input
// //               type="text"
// //               value={classData.session}
// //               onChange={(e) => handleChange('session', e.target.value)}
// //               style={styles.fieldInput}
// //             />
// //           </div>
// //           <div style={styles.field}>
// //             <label style={styles.fieldLabel}>Instructor ID:</label>
// //             <input
// //               type="text"
// //               value={classData.instructorID}
// //               onChange={(e) => handleChange('instructorID', e.target.value)}
// //               style={styles.fieldInput}
// //             />
// //           </div>
// //           <div style={styles.field}>
// //             <label style={styles.fieldLabel}>Instructor Last Name:</label>
// //             <input
// //               type="text"
// //               value={classData.instructorLastName}
// //               onChange={(e) => handleChange('instructorLastName', e.target.value)}
// //               style={styles.fieldInput}
// //             />
// //           </div>
// //           <div style={styles.field}>
// //             <label style={styles.fieldLabel}>Instructor First Name:</label>
// //             <input
// //               type="text"
// //               value={classData.instructorFirstName}
// //               onChange={(e) => handleChange('instructorFirstName', e.target.value)}
// //               style={styles.fieldInput}
// //             />
// //           </div>
// //           <div style={styles.field}>
// //             <label style={styles.fieldLabel}>Instructor Email:</label>
// //             <input
// //               type="text"
// //               value={classData.instructorEmail}
// //               onChange={(e) => handleChange('instructorEmail', e.target.value)}
// //               style={styles.fieldInput}
// //             />
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // const styles = {
// //   container: {
// //     padding: '20px',
// //     fontFamily: 'Arial, sans-serif'
// //   },
// //   searchContainer: {
// //     marginBottom: '20px',
// //     display: 'flex',
// //     alignItems: 'center',
// //     gap: '10px'
// //   },
// //   label: {
// //     fontWeight: 'bold'
// //   },
// //   input: {
// //     padding: '8px',
// //     width: '200px'
// //   },
// //   button: {
// //     padding: '8px 16px'
// //   },
// //   error: {
// //     color: 'red'
// //   },
// //   detailsCard: {
// //     marginTop: '20px',
// //     padding: '20px',
// //     border: '1px solid #ccc',
// //     borderRadius: '8px',
// //     maxWidth: '600px'
// //   },
// //   field: {
// //     marginBottom: '10px',
// //     display: 'flex',
// //     flexDirection: 'column'
// //   },
// //   fieldLabel: {
// //     fontWeight: 'bold',
// //     marginBottom: '5px'
// //   },
// //   fieldInput: {
// //     padding: '8px',
// //     width: '100%'
// //   }
// // };

// // export default ClassLookup;






// // import React, { useState } from 'react';

// // const ClassLookup = () => {
// //   // State for the ClassNum input (captured as a string)
// //   const [classNumInput, setClassNumInput] = useState('');
// //   // State for the fetched class data
// //   const [classData, setClassData] = useState(null);
// //   // Error and loading state
// //   const [error, setError] = useState('');
// //   const [loading, setLoading] = useState(false);

// //   const handleClassSearch = async () => {
// //     setError('');
// //     setLoading(true);
// //     setClassData(null);

// //     if (!classNumInput) {
// //       setError('Please enter a Class Number');
// //       setLoading(false);
// //       return;
// //     }

// //     try {
// //       // Now we pass the classNumInput (a string) directly to the endpoint.
// //       const response = await fetch(`https://localhost:7209/api/Class/${classNumInput}`);
// //       if (!response.ok) {
// //         throw new Error('Class not found');
// //       }
// //       const data = await response.json();
// //       setClassData(data);
// //     } catch (err) {
// //       setError(err.message);
// //     }
// //     setLoading(false);
// //   };

// //   return (
// //     <div style={styles.container}>
// //       <h1>Class Lookup</h1>
// //       <div style={styles.searchContainer}>
// //         <label htmlFor="classNum" style={styles.label}>Class Number (PK):</label>
// //         <input
// //           type="text"
// //           id="classNum"
// //           value={classNumInput}
// //           onChange={(e) => setClassNumInput(e.target.value)}
// //           placeholder="Enter Class Number"
// //           style={styles.input}
// //         />
// //         <button onClick={handleClassSearch} style={styles.button}>Search</button>
// //       </div>
// //       {loading && <p>Loading class...</p>}
// //       {error && <p style={styles.error}>Error: {error}</p>}
// //       {classData && (
// //         <div style={styles.detailsCard}>
// //           <h2>Class Details</h2>
// //           <p><strong>Term:</strong> {classData.term}</p>
// //           <p><strong>Subject:</strong> {classData.subject}</p>
// //           <p><strong>Catalog Number:</strong> {classData.catalogNum}</p>
// //           <p><strong>Session:</strong> {classData.session}</p>
// //           <p><strong>Instructor ID:</strong> {classData.instructorID}</p>
// //           <p><strong>Instructor Last Name:</strong> {classData.instructorLastName}</p>
// //           <p><strong>Instructor First Name:</strong> {classData.instructorFirstName}</p>
// //           <p><strong>Instructor Email:</strong> {classData.instructorEmail}</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // const styles = {
// //   container: {
// //     padding: '20px',
// //     fontFamily: 'Arial, sans-serif'
// //   },
// //   searchContainer: {
// //     marginBottom: '20px',
// //     display: 'flex',
// //     alignItems: 'center',
// //     gap: '10px'
// //   },
// //   label: { fontWeight: 'bold' },
// //   input: { padding: '8px', width: '200px' },
// //   button: { padding: '8px 16px' },
// //   error: { color: 'red' },
// //   detailsCard: {
// //     marginTop: '20px',
// //     padding: '20px',
// //     border: '1px solid #ccc',
// //     borderRadius: '8px',
// //     maxWidth: '400px'
// //   }
// // };

// // export default ClassLookup;











// // import React, { useState, useEffect } from 'react';

// // function ClassLookup() {
// //   // State for subjects, catalogs, and class details.
// //   const [subjects, setSubjects] = useState([]);
// //   const [selectedSubject, setSelectedSubject] = useState('');
// //   const [catalogs, setCatalogs] = useState([]);
// //   const [selectedCatalog, setSelectedCatalog] = useState('');
// //   const [classDetails, setClassDetails] = useState(null);
// //   const [error, setError] = useState('');
// //   const [loadingSubjects, setLoadingSubjects] = useState(false);
// //   const [loadingCatalogs, setLoadingCatalogs] = useState(false);
// //   const [loadingDetails, setLoadingDetails] = useState(false);

// //   // Fetch subjects on component mount
// //   useEffect(() => {
// //     const fetchSubjects = async () => {
// //       setLoadingSubjects(true);
// //       try {
// //         const response = await fetch('https://localhost:7209/api/Class/subjects');
// //         if (!response.ok) throw new Error('Failed to fetch subjects');
// //         const data = await response.json();
// //         setSubjects(data);
// //       } catch (err) {
// //         setError(err.message);
// //       }
// //       setLoadingSubjects(false);
// //     };
// //     fetchSubjects();
// //   }, []);

// //   // When a subject is selected, fetch its catalogs
// //   useEffect(() => {
// //     if (selectedSubject) {
// //       const fetchCatalogs = async () => {
// //         setLoadingCatalogs(true);
// //         try {
// //           const response = await fetch(`https://localhost:7209/api/Class/catalog?subject=${encodeURIComponent(selectedSubject)}`);
// //           if (!response.ok) throw new Error('Failed to fetch catalogs');
// //           const data = await response.json();
// //           setCatalogs(data);
// //         } catch (err) {
// //           setError(err.message);
// //         }
// //         setLoadingCatalogs(false);
// //       };
// //       fetchCatalogs();
// //     } else {
// //       setCatalogs([]);
// //       setSelectedCatalog('');
// //       setClassDetails(null);
// //     }
// //   }, [selectedSubject]);

// //   // When a catalog number is selected, fetch class details
// //   useEffect(() => {
// //     if (selectedSubject && selectedCatalog) {
// //       const fetchDetails = async () => {
// //         setLoadingDetails(true);
// //         try {
// //           const response = await fetch(`https://localhost:7209/api/Class/details?subject=${encodeURIComponent(selectedSubject)}&catalogNum=${selectedCatalog}`);
// //           if (!response.ok) throw new Error('Failed to fetch class details');
// //           const data = await response.json();
// //           // For simplicity, we select the first record if multiple are returned.
// //           setClassDetails(data.length > 0 ? data[0] : null);
// //         } catch (err) {
// //           setError(err.message);
// //         }
// //         setLoadingDetails(false);
// //       };
// //       fetchDetails();
// //     } else {
// //       setClassDetails(null);
// //     }
// //   }, [selectedSubject, selectedCatalog]);

// //   return (
// //     <div style={styles.container}>
// //       <h1>Class Lookup</h1>
// //       {error && <p style={styles.error}>Error: {error}</p>}
// //       <div style={styles.field}>
// //         <label style={styles.label}>Subject:</label>
// //         {loadingSubjects ? (
// //           <span>Loading subjects...</span>
// //         ) : (
// //           <select
// //             value={selectedSubject}
// //             onChange={(e) => { setSelectedSubject(e.target.value); setSelectedCatalog(''); }}
// //             style={styles.select}
// //           >
// //             <option value="">Select a Subject</option>
// //             {subjects.map((subj, index) => (
// //               <option key={index} value={subj}>{subj}</option>
// //             ))}
// //           </select>
// //         )}
// //       </div>
// //       {selectedSubject && (
// //         <div style={styles.field}>
// //           <label style={styles.label}>Catalog Number:</label>
// //           {loadingCatalogs ? (
// //             <span>Loading catalogs...</span>
// //           ) : (
// //             <select
// //               value={selectedCatalog}
// //               onChange={(e) => setSelectedCatalog(e.target.value)}
// //               style={styles.select}
// //             >
// //               <option value="">Select a Catalog Number</option>
// //               {catalogs.map((cat, index) => (
// //                 <option key={index} value={cat}>{cat}</option>
// //               ))}
// //             </select>
// //           )}
// //         </div>
// //       )}
// //       {selectedCatalog && (
// //         <div style={styles.details}>
// //           {loadingDetails ? (
// //             <p>Loading class details...</p>
// //           ) : classDetails ? (
// //             <>
// //               <p><strong>Session:</strong> {classDetails.session}</p>
// //               <p><strong>Class Number:</strong> {classDetails.classNum}</p>
// //               {/* You can add more details as needed */}
// //             </>
// //           ) : (
// //             <p>No class details found.</p>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // const styles = {
// //   container: {
// //     padding: '20px',
// //     fontFamily: 'Arial, sans-serif'
// //   },
// //   field: {
// //     marginBottom: '15px'
// //   },
// //   label: {
// //     marginRight: '10px',
// //     fontWeight: 'bold'
// //   },
// //   select: {
// //     padding: '8px',
// //     minWidth: '200px'
// //   },
// //   details: {
// //     marginTop: '20px',
// //     border: '1px solid #ccc',
// //     padding: '15px',
// //     borderRadius: '5px'
// //   },
// //   error: {
// //     color: 'red'
// //   }
// // };

// // export default ClassLookup;
