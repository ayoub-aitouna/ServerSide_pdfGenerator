const express = require("express");
const bodyParser = require("body-parser");
const pdf = require("html-pdf");
const cors = require("cors");

const PdfTemplate = require("./Documents");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());
app.post("/create-pdf", (req, res) => {
    console.log("dat" + req.body);

    pdf.create(PdfTemplate(req.body), {}).toFile("Result.pdf", (err) => {
        if (err) {
            res.send(Promise.reject());
        } else {
            res.send(Promise.resolve());
        }
    });
});

app.get("/fetch-pdf", (req, res) => {
    res.sendFile(`${__dirname}/Result.pdf`);
});
app.listen(port, () => console.log(`Listening on port ${port}`));