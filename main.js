const http = require("http");
require('dotenv').config();

function dt() {
  let date = new Date().toISOString();
  return date;
}

const server = http.createServer(function (res, req) {
  if (res.url !== '/') {
    return false;
  }
  const taimer = setInterval(() => {
    console.log(dt());
  }, process.env.INTERVAL);
  req.setHeader("Content-Type", "text/html; charset=utf-8");
  req.setHeader("Transfer-Encoding", "chunked")
  setTimeout(() => {
    clearInterval(taimer);
    req.end(`Таймер завершил выполнение в: " ${dt()}.\n`);
    console.log(`Таймер завершил выполнение в: " ${dt()}`);
  }, process.env.STOP_INTERVAL);
})

server.listen(process.env.PORT, () => {
  console.log(`server started on port  ${process.env.PORT}`);
})

