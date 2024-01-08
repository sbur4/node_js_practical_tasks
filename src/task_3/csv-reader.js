const csvtojson = require('csvtojson');
const fs = require('fs');
const {pipeline} = require('stream');

const csvFilePath = "csvdirectory/nodejs-hw1-ex1.csv";
const txtFilePath = "csvdirectory/nodejs-hw1-ex1.txt";

const csvReadStream = fs.createReadStream(csvFilePath);
const txtWriteStream = fs.createWriteStream(txtFilePath);

const csvToJsonTransform = csvtojson({
    noheader: true,
    trim: true,
    ignoreEmpty: true,
    headers: ["book", "author", "amount", "price"],
    colParser: {
        price: "number",
    },
    ignoreColumns: /amount/,
    downstreamFormat: "line",
});

console.log("Starting CSV to JSON conversion...");
pipeline(csvReadStream, csvToJsonTransform, txtWriteStream, (err) => {
    if (err) {
        console.error("Pipeline failed:", err);
    } else {
        console.log("Conversion completed successfully.");
        console.log("Output written to:", txtFilePath);
    }
});
