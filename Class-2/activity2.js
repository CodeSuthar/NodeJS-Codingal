// Creating a file named testactivity.txt and deleting it after 5 seconds
let { writeFile, unlink } = require('fs');

writeFile('testactivity.txt', "Activity2: Shows how to write and delete file with FS module", (err) => {
    if (err) {
        console.error("Error writing file:", err);
    } else {
        console.log("File written successfully");

        let countdown = 5;

        setInterval(() => {
            if (countdown > 0) {
                console.log(`Deleting file in ${countdown} seconds...`);
                countdown--;
            } else if (countdown === 0) {
                clearInterval(this);
               
               
                unlink('testactivity.txt', (err) => {
                    if (err) {
                        console.error("Error deleting file:", err);
                    } else {
                        console.log("File deleted successfully");
                    }
                });

                process.exit(0);
            }
        }, 1000);
    }
});