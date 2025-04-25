require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const nodemailer = require("nodemailer");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.render("index.ejs");
});

// Ititialize
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serving on port ${port}`);
  console.log();
});

// Email
const email = process.env.EMAIL;
const pass = process.env.PASS;

app.post("/", (req, res) => {
  // define vars
  const {name, email: userEmail, message, honey} = read.body;

// 1. Honeypot field check (hidden field only bots would fill)
if (honey && honey.length > 0) {
  return res.status(400).send("Bot detected");
}
// 2. Server-side validation
if (!name || name.length < 2) {
  return res.status(400).send("Invalid name");
}
if (!userEmail || !/^\S+@\S+\.\S+$/.test(userEmail)) {
  return res.status(400).send("Invalid email");
}
if (!message || message.trim().length < 10) {
  return res.status(400).send("Message too short");
}

  // Message
  const formattedmMessage = `<h3>email: ${usereEmail}</h3>
  <h3>name: ${name}</h3>
  
  <p/>${message}<p/>`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: pass,
    },
  });

  const mailOptions = {
    subject: `Email from: ${name}`,
    from: email,
    to: email,
    html: formattedMessage,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("mailer error: ", error);
      res.send("error");
    } else {
      console.log("email Sent: " + info.response);
      res.send("success");
    }
  });
});
