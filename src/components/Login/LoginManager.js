import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

export const initializeLoginFramework = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
};

export const handleGoogleSignIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then((res) => {
      const { displayName, photoURL, email } = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true
      };
      return signedInUser;
    })
    .catch((err) => {
      console.log(err);
      console.log(err.message);
    });
};

export const handleFbSignIn = () => {
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(fbProvider)
    .then((result) => {
      var credential = result.credential;

      // The signed-in user info.
      var user = result.user;
      user.success = true;
      return user;
      var accessToken = credential.accessToken;
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
};

export const handleSignOut = () => {
  return firebase
    .auth()
    .signOut()
    .then((res) => {
      const signedOutUser = {
        isSignedIn: false,
        name: "",
        photo: "",
        email: "",
        password: "",
        error: "",
        success: false,
      };
      return signedOutUser;
    })
    .catch((err) => {
      //An error happened
    });
};

export const createUserWithEmailAndPassword = (name, email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)

    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      updateUserName(name);
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
      // ..
    });
};

export const signInWithEmailAndPassword = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)

    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {}
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
};

const updateUserName = (name) => {
  const user = firebase.auth().currentUser;

  user
    .updateProfile({
      displayName: name,
    })
    .then(function () {
      // Update successful.
      console.log("user name updated successfully");
    })
    .catch(function (error) {
      // An error happened.
      console.log(error);
    });
};
