let http = require("http");
let { open, appendFile } = require("fs");

http.createServer((req, res) => {
    open("file5.html", "a", (err, fd) => {
        if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Error opening file");
            return;
        }
        appendFile(fd, "This is a new paragraph", (err) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Error writing to file");
                return;
            }
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("File updated successfully");
        });
    });
}).listen(8080, () => {
    console.log("Running")
});