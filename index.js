
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
  const register =()=>{
    const email=document.getElementById('email').value;
    const password=document.getElementById('Password').value;
    auth.createUserWithEmailAndPassword(email,password).then(res=>{
      return db.collection('Myuser').doc(res.user.uid).set({
        bio:""
      })
    }).then(()=>{
      console.log("user created succesffuly");
    }).catch((err)=>console.log(err));
  }
  const readBio = () => {
    const userId = auth.currentUser.uid; // Get the current user's unique ID
  
    db.collection('Myuser').doc(userId).get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          const bio = userData.bio;
          console.log('User bio:', bio,userId);
          // You can display the bio in the HTML or perform any other actions here
        } else {
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  };
  // const login = () => {
  //   const email = document.getElementById('email').value;
  //   const password = document.getElementById('Password').value;
  
  //   auth.signInWithEmailAndPassword(email, password)
  //     .then((userCredential) => {
  //       // User successfully logged in
  //       const user = userCredential.user;
  //       console.log('User logged in:', user.uid);
  
  //       // Redirect to the profile page
  //       window.location.href = 'profile.html';
  //     })
  //     .catch((error) => {
  //       console.log('Login error:', error.message);
  //     });
  // };
  const login = () => {
    // Get email and password input values
    const email = document.getElementById('email').value;
    const password = document.getElementById('Password').value;
  
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        // Redirect to the profile page after login
        window.location.href = 'profile.html';
      })
      .catch((error) => {
        console.log('Login error:', error.message);
      });
  };

  