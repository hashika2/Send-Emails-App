const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
   process.env.CLIENT_ID, // ClientID
    process.env.SECRET_KEY, // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
    refresh_token: process.env.REFRESHH_TOKEN
});
const accessToken = oauth2Client.getAccessToken()

const main =()=>{
    const smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
             type: "OAuth2",
             user: process.env.MY_EMAIL, 
             clientId:  process.env.CLIENT_ID,
             clientSecret: process.env.SECRET_KEY,
             refreshToken: process.env.REFRESHH_TOKEN,
             accessToken: accessToken
        }
    });
    
    const mailOptions = {
        from: process.env.MY_EMAIL,
        to: "hashika96.ebay@gmail.com",
        subject: "Hashika sent a message",
        generateTextFromHTML: true,
        html: "<b>test</b>"
    };
    
    smtpTransport.sendMail(mailOptions, (error, response) => {
        error ? console.log(error) : console.log(response);
        smtpTransport.close();
    });
}

main();

