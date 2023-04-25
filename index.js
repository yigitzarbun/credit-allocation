const server = require("./server/api/server");

const PORT = 9000;

server.listen(PORT, () => {
  console.log(`server is working on ${PORT}`);
});
