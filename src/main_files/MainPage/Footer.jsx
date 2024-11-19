function Footer(){
    return(
        <div className="footer-bg">
        <footer>
            <div>
                <h2>Explore</h2>
                <ul>
                    <li>Home</li>
                    <li>Questions</li>
                    <li>Articles</li>
                    <li>Tutorials</li>
                </ul>
            </div>
            <div>
                <h2>Support</h2>
                <ul>
                    <li>FAQs</li>
                    <li>Help</li>
                    <li>Contact Us</li>
                </ul>
            </div>
            <div>
                <h2>Stay connected</h2>
                <ul className="footer-img">
                    <li><img src="./images/insta.png" alt="Instagram Logo" /></li>
                    <li><img src="./images/face.png" alt="Facebook Logo" /></li>
                    <li><img src="./images/twitter.jpeg" alt="Twitter Logo" /></li>
                </ul>
            </div>
        </footer>
        <h2>DEV@Deakin 2022</h2>
        <div className="footer-bg-last"> 
            <p>Privacy Policy</p>
            <p>Terms</p>
            <p>Code of Conduct</p>
        </div>
        </div>
    )
}

export default Footer