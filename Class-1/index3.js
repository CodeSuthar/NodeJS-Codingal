let http = require("http");
let { appendFile } = require("fs");

http.createServer((req, res) => {
    appendFile("file.html", "This is a new paragraph", (err) => {
        if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Error writing to file");
            return;
        }
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("File updated successfully");
    });
}).listen(8080, () => {
    console.log("Running")
});