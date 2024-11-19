import { useState } from "react"
import { createAuthUserWithEmailAndPassword} from "../init-firebase"
import { useNavigate } from "react-router-dom"


function SignUp(){

    const navigate = useNavigate();

    const [user, setUser] = useState({
        firstName : "",
        lastName : "",
        emailId : "",
        password : "",
    });
    
    const {firstName, lastName, emailId, password} = user;

    const handleChange = (event)=>{
        const {name, value} = event.target;
        setUser((preValue) => {
            return{
                ...preValue,
                [name] : value
            }
        })
    }

    const handleSubmit = async(event) =>{

        event.preventDefault();

    try{        
        await createAuthUserWithEmailAndPassword(emailId, password, firstName + " " + lastName)
        navigate("/login")
    }
    catch(err){
        console.log(err.message);
    }
}

    return(
        <div className="Login">

            <h2>Register</h2>

            <form onSubmit={handleSubmit}>
                <div className="input-label">
                <label htmlFor="firstName">First Name</label>
                <input name="firstName" id="firstName" type="text" value={firstName} onChange={handleChange} placeholder="Input First Name" required/>
                </div>
                <div className="input-label">
                <label htmlFor="lastName">Last Name</label>
                <input name="lastName" id="lastName" type="text" value={lastName} onChange={handleChange} placeholder="Input Last Name" required/>
                </div>
                <div className="input-label">
                <label htmlFor="emailId">Email ID</label>
                <input name="emailId" id="emailId" type="email" value={emailId} onChange={handleChange} placeholder="Input email id" required/>
                </div>
                <div className="input-label">
                <label htmlFor="password">Password</label>
                <input name="password" id="password" type="password" value={password} onChange={handleChange} placeholder="Input Password" required/>
                </div>
                <button type="submit" className="login-button">Register</button>
            </form>

        </div>
    )
}



export default SignUp