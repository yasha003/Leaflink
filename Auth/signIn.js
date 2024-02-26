const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const querystring = require('querystring');

let submit1=document.querySelector("#signIn");
submit1.addEventListener("click",()=>{
    open("index.html")
})

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);

  if (req.method === 'POST' && pathname === '/user.html') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const { email, password } = querystring.parse(body);

      // Check if email and password are valid (this is a basic example)
      if (email === 'user@example.com' && password === 'password') {
        // Redirect to index.html
        res.writeHead(302, { 'Location': '/index.html' });
        return res.end();
      } else {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'Invalid credentials' }));
      }
    });
  } else {
    // Serve static files (e.g., index.html)
    const filePath = path.join(__dirname, 'public', req.url);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('Not found');
      }
      res.writeHead(200);
      res.end(data);
    });
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
