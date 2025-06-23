let http = require("http");

http.createServer((req, res) => {
    res.write(`This isn't my first NodeJs Project but I like NodeJS a lot`);
    res.end();
}).listen(8080, () => {
    console.log("Running")
});