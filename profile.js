const firebaseConfig = {
    apiKey: "AIzaSyDVqOyWRQqig9C-asf3iMo1Bl76Er9Ukd4",
    authDomain: "fir-diary-85b9f.firebaseapp.com",
    projectId: "fir-diary-85b9f",
    storageBucket: "fir-diary-85b9f.appspot.com",   
    messagingSenderId: "387627257709",
    appId: "1:387627257709:web:c2dca84638d9cde1c49464",
    measurementId: "G-YW7XNLSX00"
  };
  
  firebase.initializeApp(firebaseConfig);   
  const auth = firebase.auth();
  const db = firebase.firestore(); 
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
   
  const checkCollectionExists = async (collectionName) => {
    const collectionRef = db.collection(collectionName);
    const snapshot = await collectionRef.get();
    return !snapshot.empty;
  };
  
  const displayButtonBasedOnCollection = async (collectionName) => {
    const submitButton = document.getElementById('submitButton');
    const updateButton = document.getElementById('updateButton');
    const collectionExists = await checkCollectionExists(collectionName);
  
    if (collectionExists) {
      submitButton.style.display = 'none';
      updateButton.style.display = 'block';
    } else {
      submitButton.style.display = 'block';
      updateButton.style.display = 'none';
    }
  };
  const currentDate = new Date();
  const collectionName = formatDate(currentDate);
  displayButtonBasedOnCollection(collectionName);
  
  // Call this function when the page loads or when a user logs in
  
  
  const Submit = () => {
  let inputVal = document.getElementById('diary').value;
  const currentDate = new Date();
  const collectionName = formatDate(currentDate); // Use this as the collection name
  const documentId = formatDate(currentDate); // Use this as the document ID

  db.collection(collectionName).doc(documentId).set({
    data: inputVal,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    console.log("Document inserted successfully");
    inputVal = "";
    displayDiaryEntries(collectionName);

    displayButtonBasedOnCollection(collectionName); // Update the button visibility
  }).catch((err) => {
    console.log(err);
  });
};
  
  
  // const Update = () => {
  //   let inputVal = document.getElementById('diary').value;
  //   const currentDate = new Date();
  //   const collectionName = formatDate(currentDate);
  
  //   // Assume you want to update the latest entry in the collection
  //   db.collection(collectionName)
  //     .orderBy("timestamp", "desc")
  //     .limit(1)
  //     .get()
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         db.collection(collectionName).doc(doc.id).update({
  //           data: inputVal,
  //           timestamp: firebase.firestore.FieldValue.serverTimestamp()
  //         }).then(() => {
  //           console.log("Document updated successfully");
  //           inputVal = "";
  //           displayDiaryEntries(collectionName);
  //         }).catch((err) => {
  //           console.log(err);
  //         });
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  
  const displayDiaryEntries = (collectionName) => {
    const diaryEntriesDiv = document.getElementById('diaryEntries');
  
    diaryEntriesDiv.innerHTML = ''; // Clear previous entries
  
    db.collection(collectionName)
      .orderBy("timestamp", "desc")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const entryText = data.data;
          const timestamp = data.timestamp.toDate().toLocaleString();
          const userBioElement = document.getElementById('diaryEntries');
          userBioElement.textContent = `Diary content: ${entryText}`;
        //   const entryDiv = document.createElement('div');
        //   entryDiv.innerHTML = `
        //     <p>${entryText}</p>
        //     <small>${timestamp}</small>
        //     <hr>
        //   `;
  
        //   diaryEntriesDiv.appendChild(entryDiv);

        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const fetchDiary=()=>{
  //   const enterDate=document.getElementById('date').value;
  //   const selectedDate=new Date(enterDate);
  //   if(isNaN(selectedDate)){
  //     console.log("inavid date format");
  //     return;
  //   }
  //   const collectionName=formatDate(selectedDate);
  //   const diaryEntries=document.getElementById('diaryEntries');
  //   // db.collection(collectionName).get()
  //   // .then((querySnapshot)=>{
  //   //   querySnapshot.forEach((doc)=>{
  //   //     const data=doc.data();
  //   //     const entryText=data.data;
  //   //     diaryEntries.textContent=`Diary Content :${entryText}`
  //   //   });
  //   //   if (querySnapshot.empty) {
  //   //     console.log("No diary entries found for the selected date.");
  //   //   }
  //   // })
  //   // .catch((err) => {
  //   //   console.log(err);
  //   // });
  //   db.collection(collectionName).doc(collectionName)
  //   .get()
  //   .then((doc) => {
  //     if (doc.exists) {
  //       const data = doc.data();
  //       const entryText = data.data;
  //       diaryEntries.textContent=`Diary Content :${entryText}`

  //     } else {
  //       console.log("No diary entries found for the selected date.");
  //     }
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  
    
  // }
  const fetchDiary = () => {
    const enteredDate = document.getElementById('date').value;
    const selectedDate = new Date(enteredDate);
  
    if (isNaN(selectedDate)) {
      console.log("Invalid date format.");
      return;
    }
  
    const collectionName = formatDate(selectedDate);
    const diaryEntriesDiv = document.getElementById('diaryEntries');
  
    db.collection(collectionName).doc(collectionName)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          const entryText = data.data;
          diaryEntriesDiv.textContent = `Diary Content: ${entryText}`;
          
          // Fill the textarea with the fetched entry
          document.getElementById('diary').value = entryText;
        } else {
          diaryEntriesDiv.textContent = "No diary entries found for the selected date.";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  const Update = () => {
    const inputVal = document.getElementById('diary').value;
    const enteredDate = document.getElementById('date').value;
    const selectedDate = new Date(enteredDate);
  
    if (isNaN(selectedDate)) {
      console.log("Invalid date format.");
      return;
    }
  
    const collectionName = formatDate(selectedDate);
  
    db.collection(collectionName).doc(collectionName)
      .update({
        data: inputVal,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        console.log("Document updated successfully");
        fetchDiary(); // Fetch and display updated data
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  // displayDiaryEntries(collectionName);

