import React, { useState, useContext } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import {
  handleGoogleSignIn,
  initializeLoginFramework,
  handleSignOut,
  handleFbSignIn,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "./LoginManager";

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    photo: "",
    password: "",
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  let history = useHistory();
  let location = useLocation();
  // let auth = useAuth();

  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      handleResponse(res, true);
    });
  };

  const signOut = () => {
    handleSignOut().then((res) => {
      handleResponse(res, false);
    });
  };

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
  };

  const fbSignIn = () => {
    handleFbSignIn().then((res) => {
      handleResponse(res, true);
    });
  };

  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };

  //When user submit button
  const handleSubmit = (e) => {
    //When user is new user
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password).then(
        (res) => {
          handleResponse(res, true);
        }
      );
    }

    // When user is old user
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password).then((res) => {
        handleResponse(res, true);
      });
    }
    e.preventDefault();
  };

  return (
    <div style={{ textAlign: "center" }}>
      {user.isSignedIn ? (
        <button onClick={signOut}>Sign out</button>
      ) : (
        <button onClick={googleSignIn}>Sign in</button>
      )}
      <br />
      <button onClick={fbSignIn}>Sign in using Facebook</button>
      {user.isSignedIn && (
        <div>
          <p> Welcome, {user.name}</p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}

      <h1>Our own Authentication</h1>
      <input
        type="checkbox"
        onChange={() => setNewUser(!newUser)}
        name="newUser"
        id=""
      />
      <label htmlFor="newUser">New User Sign Up</label>
      <form onSubmit={handleSubmit}>
        {newUser && (
          <input
            name="name"
            onBlur={handleBlur}
            type="text"
            placeholder="Your name"
          />
        )}
        <br />
        <input
          onBlur={handleBlur}
          name="email"
          type="text"
          placeholder="Your email address"
        />
        <br />
        <input
          onBlur={handleBlur}
          name="password"
          type="password"
          placeholder="Your password"
          required
        />
        <br />
        <input type="submit" value={newUser ? "Sign up" : "Sign in"} />
      </form>
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && (
        <p style={{ color: "green" }}>
          User {newUser ? "created" : "Logged In"} successfully
        </p>
      )}
    </div>
  );
}

export default Login;
