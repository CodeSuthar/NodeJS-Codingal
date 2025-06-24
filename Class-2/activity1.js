let { writeFile } = require('fs');

writeFile('file.txt', "Activity1: Shows how to write file with FS module", (err) => {
    if (err) {
        console.error("Error writing file:", err);
    } else {
        console.log("File written successfully");
    }
})