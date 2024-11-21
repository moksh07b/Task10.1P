import { useState } from "react";

function SignUpForm(){

    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/hello', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            setEmail('');
        } catch (error) {
            console.error('Failed to send email:', error);
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
