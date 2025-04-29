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
  const honey = req.body.honey;

  // Bot honeypot check
  if (honey && honey.length > 0) {
    return res.status(400).send("Bot detected");
  }

  // Basic validation
  if (!req.body.name || req.body.name.length < 2) {
    return res.status(400).send("Invalid name");
  }
  if (!req.body.email || !/^\S+@\S+\.\S+$/.test(req.body.email)) {
    return res.status(400).send("Invalid email");
  }
  if (!req.body.message || req.body.message.trim().length < 10) {
    return res.status(400).send("Message too short");
  }

  const message = `<h3>email: ${req.body.email}</h3>
  <h3>name: ${req.body.name}</h3>
  <p/>${req.body.message}<p/>`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: pass,
    },
  });
  const mailOptions = {
    subject: `Email from: ${req.body.name}`,
    from: email,
    to: email,
    html: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      console.log("email SeNt: " + info.response);
      res.send("success");
    }
  });
});
