const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const hostname = '127.0.0.1';
const port = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var medications = [
    {name: "Crocin Advanced", dosage: "3mg"},
    {name: "Prozac", dosage: "2mg"},
    {name: "Aspirin", dosage: "5mg"},
    {name: "Sinarest", dosage: "1mg"},
    {name: "Dolo", dosage: "0.5mg"},
];

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/medications", (req, res) => {
    res.render("medications", {meds: medications});
});

app.post("/medications", (req, res) => {
    const name = req.body.name;
    const dosage = req.body.dosage;
    const newMed = {
        name: name,
        dosage: dosage,
    };
    medications.push(newMed);
    res.redirect("/medications");
});

app.get("/medications/new", (req, res) => {
    res.render("newMedication");
});

app.listen(port, hostname, () => {
  console.log(`MediHub server running at http://${hostname}:${port}/`);
});