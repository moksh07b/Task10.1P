const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser'); 

app.use(bodyParser.json());
app.use(cors({
    origin : 'http://localhost:3000'
}));

const axios = require('axios');

const stripe = require('stripe')('sk_test_51QFsx3EJAsUd94etXfHbLK0ycybB26eHa9QYe9sKOxNgvDtXp6dkB2i6CgiOr7rOqh9x15PSav66dm2VC3CMxnEv00zDlXYt9z');

app.post('/create-payment-intent', async (req, res) => {
    const {priceID } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode : 'subscription',
            line_items: [
                {
                    price: priceID,
                    quantity: 1
                },
            ],
            success_url: 'http://localhost:3000/',
            cancel_url: 'http://localhost:3000/',
        });
        res.json({ url: session.url});
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


app.post('/hello', async (req, res) => {
    const { email } = req.body;

    const emailData = {
        sender: { email: 'moksh4794.be23@chitkara.edu.in'},
        to: [{ email: email }],
        subject: 'Welcome to DEV@Deakin Newsletter!',
        htmlContent: '<html><body><h3>Thank you for subscribing to the DEV@Deakin newsletter!</h3></body></html>',
    };

    try {
        const response = await axios.post(
            'https://api.brevo.com/v3/smtp/email',
            emailData,
            {
                headers: {
                    "api-key": "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",
                    "Content-Type": "application/json",
                },
            }
        );
        if(response.status === 200) {
            res.status(200).send({ message: 'Welcome email sent successfully!'});
        }
        else {
            res.status(500).send({ error: 'Failed to send email' });
        }
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send({ error: 'Failed to send email' });
    }
});