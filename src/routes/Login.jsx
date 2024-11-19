import { useState } from "react";
import { createUserDocFromAuth,signinAuthUserWithEmailAndPassword, signInWithGooglePopup } from "../init-firebase";
import { Link, useNavigate } from "react-router-dom";
import { useSignIn } from "../context/SignInContext";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate()

  const {SetIsSignIn,SetUserData } = useSignIn();

  const logGoogleUser = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      await createUserDocFromAuth(user);
      SetIsSignIn(true);
      SetUserData(user);
    } catch (error) {
      console.error("Google Sign-in Error:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try{
      const res = await signinAuthUserWithEmailAndPassword(email, password)
      SetIsSignIn(true);
      SetUserData(res.user)
      navigate("/")   
    }
    catch(error){
      SetIsSignIn(false)
      console.log(error.message);
    }
    
  };

  const { email, password } = user;

  return (
    <div className="Login">
      <Link to="/signup">
        <button className="sign-up">Sign up</button>
      </Link>
      <div className="login-details">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Your email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter Your Email ID"
            required
          ></input>

          <label htmlFor="password">Your Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
            placeholder="Enter Your Password"
            required
          ></input>

          <br />
          <button className="login-button" type="submit">
            Login
          </button>
        </form>

        <button className="Google" onClick={logGoogleUser}>
          Sign in With Google
        </button>
      </div>
    </div>
  );
}

export default Login;
