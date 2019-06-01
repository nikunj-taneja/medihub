const express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser'),
      mongoose   = require('mongoose');

const hostname = '127.0.0.1';
const port = 3000;

mongoose.connect("mongodb://localhost/medihub");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

// Medication Schema
let medicationSchema = new mongoose.Schema({
    name: String,
    dosage: String,
    frequency: Number,
    reminderFrequency: Number,
    reminderTimes: Array,
});

let Medication = mongoose.model("Medication", medicationSchema);

// Medication.create({
//     name: "Aspirin",
//     dosage: "10mg",
//     frequency: 2,
//     reminderFrequency: 2,
//     reminderTimes: ["0900", "2100"]
//     }, (err, medication) => {
//         if (err) {
//             console.log(`X Error: ${err}`);
//         }
//         else {
//             console.log("Newly added medication: ");
//             console.log(medication);
//         }
//     }
// );

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/medications", (req, res) => {
    Medication.find({}, (err, allMedications) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render("medications", {meds: allMedications});
        }
    });
    //res.render("medications", {meds: medications});
});

app.post("/medications", (req, res) => {
    const name = req.body.name;
    const dosage = req.body.dosage;
    const newMed = {
        name: name,
        dosage: dosage,
    };
    //medications.push(newMed);
    Medication.create(newMed, (err, medication) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Newly created medication: ");
            console.log(medication);
            res.redirect("/medications");
        }
    });
});

app.get("/medications/new", (req, res) => {
    res.render("newMedication");
});

app.listen(port, hostname, () => {
  console.log(`MediHub server running at http://${hostname}:${port}/`);
});