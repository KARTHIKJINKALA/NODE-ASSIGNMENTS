const express = require("express");
const nodemailer = require("nodemailer");
var otp=require("./otp.js")
console.log(otp)

const app = express();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "karthikjinkala11@gmail.com", // Replace with your email
        pass: "kdwaxjjluqafpyqm" // Replace with your app password
    }
});

const options = {
    from: "karthikjinkala11@gmail.com",
    to: "karthikjinkala12@gmail.com",
    subject: "Sending Email using Node.js",
    text: `Your OTP is: ${otp}`
};
module.exports={transporter,options}




// app.get("/gmail", (req, res) => {
//     transporter.sendMail(options, (err, info) => {
//         if (err) {
//             res.status(500).send(err.message);
//         } else {
//             res.send("Email sent successfully!");
//         }
//     });
// });

// const port = 3009;
// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });
