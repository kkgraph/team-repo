var firebaseConfig = {
  apiKey: "AIzaSyDQtEqo93MUEgnY0AngvOsfshKbMH8ChA4",
  authDomain: "crumbs-243103.firebaseapp.com",
  databaseURL: "https://crumbs-243103.firebaseio.com",
  projectId: "crumbs-243103",
  storageBucket: "crumbs-243103.appspot.com",
  messagingSenderId: "68338396052",
  appId: "1:68338396052:web:2d602427a8bff86c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

database.ref().on("child_added", function (child) {
  // console.log(child.val().ingrList)
});

// ----------- Firebase logic for landing page ------------ 
// firebase.auth().onAuthStateChanged(function (user) {
//   window.user = user
// });

// New User Sign Up function
function userSignIn() {
  if (firebase.auth().currentUser) {
    // [START signout]
    firebase.auth().signOut();
    // [END signout]
  } else {
    var email = $("#email").val();
    console.log(email);
    var password = $("#password").val();
    console.log(password);
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
    });
  }
}

// Adds User to Database
function writeUserData(userId, email) {
  firebase.database().ref('users/' + userId).set({
    email: email,
    id: userId
  });
  console.log("added user to firebase" + userId);
}

// User sign in function
function newUserSignUp() {
  var email = $("#newUserEmail").val();
  console.log(email);
  var password = $("#newUserPassword").val();
  console.log(password);

  // Runs the firebase auth sign function
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/wrong-password') {
      alert('Wrong password.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
  });
};

/**
 * The ID of the currently signed-in User. We keep track of this to detect Auth state change events that are just
 * programmatic token refresh but not a User status change.
 */
var currentUID;

/**
 * Triggers every time there is a change in the Firebase auth state (i.e. user signed-in or user signed out).
 */
function onAuthStateChanged(user) {
  // We ignore token refresh events.
  if (user && currentUID === user.uid) {
    return;
  }

  cleanupUi();
  if (user) {
    currentUID = user.uid;
    splashPage.style.display = 'none';
    writeUserData(user.uid, user.displayName, user.email, user.photoURL);
    startDatabaseQueries();
  } else {
    // Set currentUID to null.
    currentUID = null;
    // Display the splash page where you can sign-in.
    splashPage.style.display = '';
  }
}

function initApp() {
  // Listening for auth state changes.
  // [START authstatelistener]
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      var email = user.email;
      currentUserId = user.uid;
      console.log(email);
      console.log("user ID: " + currentUserId);
    }
  });
};

window.onload = function () {
  initApp();
};



// .catch (function (error) {
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   console.log(errorCode)
//   console.log(errorMessage)