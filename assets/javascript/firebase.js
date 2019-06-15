$(document).ready(function () {

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


// var ref = database.ref('user-ingrList/' + uid).orderByChild("dateAdded")
//   .limitToLast(1)
// ref.once("value", function (snapshot) {
//   console.log(snapshot.val())
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

// Adds User to Database
function writeUserData(userId, email) {
  firebase.database().ref('users/' + userId).set({
    email: email,
    id: userId
  });
  console.log("added user to firebase" + userId);
}

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
  if (user) {
    currentUID = user.uid;
    writeUserData(user.uid, user.email);
  } else {
    // Set currentUID to null.
    currentUID = null;
  }
}

function initApp() {
  // Listening for auth state changes.
  // [START authstatelistener]
  firebase.auth().onAuthStateChanged(onAuthStateChanged)
  var user = firebase.auth().currentUser;
  if (user != null) {
    uid = user.uid;
  }
};

window.onload = function () {
  initApp();

};
});