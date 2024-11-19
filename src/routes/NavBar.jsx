import { Link, Outlet } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import { useSignIn } from "../context/SignInContext";
import { signOut } from "firebase/auth";
import { auth } from "../init-firebase";



function NavBar() {
  const {search, setSearch} = useSearch();

  
  const { isSignIn, SetIsSignIn, userData} = useSignIn();

  const notLoggedIn = <div><img className="profile-pic" src="./images/profile_pic.jpg" alt="Profile Pic"></img>
            <h6>Sign in</h6></div>

  const revertLogin = () =>{
    SetIsSignIn(false)
    signOut(auth)
    alert("You've Signed Out!")
  }

var isLoggedIn = null
  if(isSignIn && userData)
  {
    isLoggedIn = <div className="loggedInCLick" onClick={revertLogin}><div className="loggedIn"><span>{userData.displayName[0]}</span></div>
    <h6>Sign-out</h6></div>
  }

  return (
    <div>
      <header>
        <div className="nav_div">
          <p>DEV@Deakin</p>
          <input type="search" onChange={(e)=>{setSearch(e.target.value)}} placeholder="Search..." value={search} />
          
          <div className="nav_but">
            <Link to="/">
            <img src="./images/home.png" alt="Home icon"></img>
            </Link>
            <Link to="plans">
            <button>Plans</button>
            </Link>
            <Link to="/find-question">
            <button>Find Question</button>
            </Link>
            <Link to="/post">
            <button>Post</button>
            </Link>
            { !isSignIn ?
              <Link to="/login">  <div>{notLoggedIn} </div> </Link> : <div>{isLoggedIn}</div>
            } 
            
          </div>
        </div>
      </header>
        <Outlet/>
    </div>
  );
}

export default NavBar;