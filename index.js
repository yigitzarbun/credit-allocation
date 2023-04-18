const server = require("./server/server");

const port = process.env.PORT || 9000;

server.listen(port, () => {
  console.log(`server is working on ${port}`);
});
