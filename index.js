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
  const Login = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('Password').value;
  
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        window.location.href = 'profile.html';
        
      })
      .catch((error) => {
        console.log('Login error:', error.message);
      });
  };
  
