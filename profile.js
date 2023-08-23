
const firebaseConfig = {
    apiKey: "AIzaSyDux8jd0XaFZpbE3shPfoNxBRCvyZzPbrY",
    authDomain: "fir-frontend-f2440.firebaseapp.com",
    projectId: "fir-frontend-f2440",
    storageBucket: "fir-frontend-f2440.appspot.com",
    messagingSenderId: "910882375571",
    appId: "1:910882375571:web:61ad19ff91f37da30f0a66",
    measurementId: "G-8TZVCVRTM8"
  };
  
  firebase.initializeApp(firebaseConfig);   
  const auth = firebase.auth();
  const db = firebase.firestore(); 
  const displayBio = () => {
    const userId = auth.currentUser.uid;
  
    db.collection('Myuser').doc(userId).get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          const bio = userData.bio;
          const userBioElement = document.getElementById('userBio');
          userBioElement.textContent = `Diary content: ${bio}`;
        } else {
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  };
  const saveBio = () => {
    const userId = auth.currentUser.uid;
    const newBio = document.getElementById('userBioo').value;
  
    db.collection('Myuser').doc(userId).update({ bio: newBio })
      .then(() => {
        console.log('Bio updated successfully');
      })
      .catch((error) => {
        console.log('Error updating bio:', error);
      });
  };