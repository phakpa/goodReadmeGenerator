const inquirer = require("inquirer");
const fs = require("fs");

// array of questions for user
const questions = [
  "What is your project title?",
  "Give a description of your project",
  "What is the installation instruction?",
  "What is the usage information?",
  "What are the contribution guidlines?",
  "What are the test instructions?",
];

// function to write README file
function writeToFile(fileName, data) {
  console.log(fileName);
  console.log(data);
  //   const filename = data.name.toLowerCase().split(" ").join("") + ".json";
  //   fs.writeFile(filename, JSON.stringify(data, null, "\t"), function (err) {
  //     if (err) {
  //       return console.log(err);
  //     }
  //     console.log("Success!");
  //   });
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
      //   {
      //     type: "checkbox",
      //     message: "What languages do you know?",
      //     name: "stack",
      //     choices: ["HTML", "CSS", "JavaScript", "MySQL"],
      //   },
      //   {
      //     type: "list",
      //     message: "What is your preferred method of communication?",
      //     name: "contact",
      //     choices: ["email", "phone", "telekinesis"],
      //   },
    ])
    .then(function (data) {
      writeToFile("generatedREADME.md", data);
    });
}

// function call to initialize program
init();
