const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    "57557651117-cva1kc0m1qtcdaurb8r3it2vnt3rrs0t.apps.googleusercontent.com", // ClientID
    "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", // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
    refresh_token: "1//04g4zVh-c32j2CgYIARAAGAQSNwF-L9IrAqcD2b3_C0OPTheqrNQIlNrM2RKVnkh1cT1BNmcojUFGyQ6r59YHRKxf-Qm7KGvnxWM"
});
const accessToken = oauth2Client.getAccessToken()

const main =()=>{
    const smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
             type: "OAuth2",
             user: "m.g.hashikamaduranga@gmail.com", 
             clientId: "57557651117-cva1kc0m1qtcdaurb8r3it2vnt3rrs0t.apps.googleusercontent.com",
             clientSecret: "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",
             refreshToken: "1//04g4zVh-c32j2CgYIARAAGAQSNwF-L9IrAqcD2b3_C0OPTheqrNQIlNrM2RKVnkh1cT1BNmcojUFGyQ6r59YHRKxf-Qm7KGvnxWM",
             accessToken: accessToken
        }
    });
    
    const mailOptions = {
        from: "m.g.hashikamaduranga@gmail.com",
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

