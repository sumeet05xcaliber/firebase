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
  const fetchOrCreateDiary = () => {
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
  
          document.getElementById('updateButton').style.display = 'block';
          document.getElementById('submitButton').style.display = 'none';
  
          document.getElementById('diary').value = entryText;
        } else {
          diaryEntriesDiv.textContent = "No diary entries found for the selected date.";
  
          document.getElementById('submitButton').style.display = 'block';
          document.getElementById('updateButton').style.display = 'none';
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  const Submit = () => {
    const inputVal = document.getElementById('diary').value;
    const enteredDate = document.getElementById('date').value;
    const selectedDate = new Date(enteredDate);
  
    if (isNaN(selectedDate)) {
      console.log("Invalid date format.");
      return;
    }
  
    const collectionName = formatDate(selectedDate);
  
    db.collection(collectionName).doc(collectionName)
      .set({
        data: inputVal,
      })
      .then(() => {
        console.log("Document inserted successfully");
        fetchOrCreateDiary(); 
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
      })
      .then(() => {
        console.log("Document updated successfully");
        fetchOrCreateDiary(); 
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
