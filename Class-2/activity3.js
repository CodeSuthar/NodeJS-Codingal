let { rename } = require('fs');

//Asking user to enter the old and new file names
let oldFileName = process.argv[2];
let newFileName = process.argv[3];

//Renaming the file
rename(oldFileName, newFileName, (err) => {
    if (err) {
        console.error("Error renaming file:", err);
    } else {
        console.log(`File renamed from ${oldFileName} to ${newFileName} successfully`);
    }
});