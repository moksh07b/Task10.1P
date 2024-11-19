import axios from "axios";
import { useState } from "react";

function SignUpForm(){

    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4000/hello', { email });
            setEmail(''); 
        } catch (error) {
        }
    }

    return(
        <form onSubmit={handleSubmit} className="form-signup">
            <label id="email">SIGN UP FOR OUR DAILY INSIDER</label>
            <input type="email" class="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Enter your email" required></input>
            <button type="submit">Subscribe</button>
        </form>
    )
}

export default SignUpForm