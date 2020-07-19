const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./utils/generateMarkdown");
const generateDoubleMarkdown = require("./utils/generateDoubleMarkdown");

// array of questions for user
const questions = [
  "What is your project title?",
  "Give a description of your project",
  "What are the steps required to install your project?",
  "What are the usages of your project?",
  "What are the contribution guidlines?",
  "What are the test instructions?",
  "What is your Github username?",
  "What is your email?",
];

// function to write README file
function writeToFile(filename, data) {
  let license = "";
  if (data.license === "MIT License") {
    license = "mit";
  } else if (data.license === "The Unlicense") {
    license = "unlicense";
  } else {
    license = "bsl-1.0";
  }

  let readMeDoc =
    "[![License](https://img.shields.io/badge/license-" +
    license +
    "-blue)](https://choosealicense.com/licenses/" +
    license +
    "/)" +
    "\n\n" +
    generateMarkdown(data) +
    generateDoubleMarkdown("Description") +
    data.description +
    "\n\n" +
    generateDoubleMarkdown("Table of Contents") +
    "* [installation](#Installation)" +
    "\n* [Usage](#Usage)" +
    "\n* [Contributing](#Contributing)" +
    "\n* [License](#License)" +
    "\n* [Tests](#Tests)" +
    "\n* [Questions](#Questions)" +
    "\n\n" +
    generateDoubleMarkdown("Installation") +
    data.installation +
    "\n\n" +
    generateDoubleMarkdown("Usage") +
    data.usage +
    "\n\n" +
    generateDoubleMarkdown("Contributing") +
    data.contribution +
    "\n\n" +
    generateDoubleMarkdown("License") +
    "Licensed under the " +
    "[" +
    data.license +
    "]" +
    "(https://choosealicense.com/licenses/" +
    license +
    "/)" +
    "\n\n" +
    generateDoubleMarkdown("Tests") +
    data.test +
    "\n\n" +
    generateDoubleMarkdown("Questions") +
    "[https://github.com/" +
    data.username +
    "/]" +
    "(https://github.com/" +
    data.username +
    "/)" +
    "\n\nIf you have any questions, please contact me at " +
    data.email;

  //clear read me if node application is ran more than once
  fs.writeFile(filename, "", function () {});

  fs.appendFile(filename, readMeDoc, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("ReadMe generated!");
  });
}

// function to initialize program
function init() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: questions[0],
      },
      {
        type: "input",
        name: "description",
        message: questions[1],
      },
      {
        type: "input",
        name: "installation",
        message: questions[2],
      },
      {
        type: "input",
        name: "usage",
        message: questions[3],
      },
      {
        type: "input",
        name: "contribution",
        message: questions[4],
      },
      {
        type: "input",
        name: "test",
        message: questions[5],
      },
      {
        type: "list",
        message: "What is the license of your project?",
        name: "license",
        choices: ["The Unlicense", "MIT License", "Boost Software License 1.0"],
      },
      {
        type: "input",
        name: "username",
        message: questions[6],
      },
      {
        type: "input",
        name: "email",
        message: questions[7],
      },
    ])
    .then(function (data) {
      writeToFile("generatedREADME.md", data);
    });
}

// function call to initialize program
init();
