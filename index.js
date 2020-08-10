const server = require("./api/server.js");

const PORT = process.env.PORT || 5000;

server.get("/", (req, res) => {
  res.status(200).json({ api: "up - server working" });
});

server.listen(PORT, () => {
  console.log(`\n== API running on port ${PORT} ==\n`);
});
