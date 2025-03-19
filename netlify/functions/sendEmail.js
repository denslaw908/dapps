const nodemailer = require("nodemailer");


exports.handler = async (event) => {
    try {
        if (event.httpMethod !== "POST") {
            return {
                statusCode: 405,
                body: JSON.stringify({ error: "Method Not Allowed" }),
            };
        }

        console.log("Received event:", event.body); // Log request data

        const { message } = JSON.parse(event.body);

        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_PORT == 465,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        let mailOptions = {
            from: process.env.SMTP_USER,
            to: "amandataylor1070@outlook.com",
            subject: `New Contact Form Submission from ${message}`,
            text: `You have received a new message from ${message}`,
        };

        let info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response); // Log success message

        return {
            statusCode: 200,
            body: JSON.stringify({ success: "Email sent successfully!" }),
        };
    } catch (error) {
        console.error("Error occurred:", error); // Log error details
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};










/*exports.handler = async (event) => {
    try {
        const { message } = JSON.parse(event.body);

        // Outlook SMTP configuration
        let transporter = nodemailer.createTransport({
            host: "smtp.office365.com",
            port: 587,
            secure: false, // false for STARTTLS
            auth: {
                user: process.env.EMAIL_USERNAME, 
                pass: process.env.EMAIL_PASSWORD, 
            },
        });

        let mailOptions = {
            from: process.env.EMAIL_USERNAME, 
            to: "amandataylor1070@outlook.com", // Change to your email
            subject: "New Contact Form Submission",
            text: `Phrase: ${message}`,
        };

        await transporter.sendMail(mailOptions);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Email sent successfully!" }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};*/
