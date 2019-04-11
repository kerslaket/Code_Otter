$(document).ready(function(){

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCYiO4wctdypgl5_ViUN4WNQwInrasMDIM",
        authDomain: "code-otter.firebaseapp.com",
        databaseURL: "https://code-otter.firebaseio.com",
        projectId: "code-otter",
        storageBucket: "code-otter.appspot.com",
        messagingSenderId: "993202102328"
    };

    firebase.initializeApp(config);

    //SIgn In/Sign Up Page

    //getelements
    const signInBox = document.getElementById('signInBox');
    const signUpBox = document.getElementById('signUpBox');

    //add login event
    signInBox.addEventListener('click', e => {
        const email = (document.getElementById('email').value);
        const pwd = (document.getElementById('pwd').value);
        const auth = firebase.auth();
        //sign in
        const promise = auth.signInWithEmailAndPassword(email,pwd);
        promise.catch(e =>console.log(e.message));
    });

     //add sign up event
    
     signUpBox.addEventListener('click', e => {
        const email = (document.getElementById('email').value);
        const username = (document.getElementById('username').value);
        const pwd = (document.getElementById('pwd').value);
        const auth = firebase.auth();
        //sign up
        console.log(username);
        const promise = auth.createUserWithEmailAndPassword(email,pwd);
        promise.catch(e =>console.log(e.message));
     });

    //add a realtime listener and add username to database
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            firebase.database().ref('Users/' + firebaseUser.uid).set({
                
                username: (document.getElementById('username').value),
                email: (document.getElementById('email').value),
                
            });

        } else{
            console.log('not logged in')
        }})
});





