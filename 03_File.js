const fs = require("fs");

// Sync
// fs.writeFileSync('./04_Test.txt',"Hello World ")

// Async
// fs.writeFile("./04_Test.txt","Hello Check",(err) => {})

// const result = fs.readFileSync("./05_Contacts.txt", "utf-8");
// console.log( result);

// fs.readFile("./05_Contacts.txt", "utf-8", (err, result) => {
//   if (err) console.log("err: ", err);
//   else {
//     console.log(result);
//   }
// });

// fs.appendFileSync("./04_Test.txt", new Date().getDate().toLocaleString())

// fs.appendFileSync("./04_Test.txt", `New Line \n`)

// fs.cpSync("./04_Test.txt","./06_CopyTest.txt")

// fs.unlinkSync("./06_CopyTest.txt")

// console.log(fs.statSync("./04_Test.txt"));

// fs.mkdirSync("06_MyDir")

// fs.mkdirSync("07_MyDir/a/b",{recursive : true})

// Blocking
// console.log("1");
// const blocking = fs.readFileSync("./05_Contacts.txt", "utf-8");
// console.log(blocking);
// console.log("2");

// Non - Blocking
// console.log("1");
// fs.readFile("./05_Contacts.txt", "utf-8",(err,nonBlocking)=>{

//     console.log(nonBlocking);
// });
// console.log("2");

const os = require("os")
console.log(os.cpus().length);


