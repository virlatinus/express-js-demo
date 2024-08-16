var express = require("express");
var http = require("http");
var reload = require("reload");
var dataFile = require("./data/data.json");

var app = express();

app.set("port", process.env.PORT || 3000);
app.set("appData", dataFile);
app.set("view engine", "ejs");
app.set("views", "app/views");

app.locals.siteTitle = "Roux Meetups";
app.locals.allSpeakers = dataFile.speakers;

app.use(express.static("app/public"));
app.use(require("./routes/index"));
app.use(require("./routes/speakers"));
app.use(require("./routes/feedback"));
app.use(require("./routes/api"));
app.use(require("./routes/chat"));

var server = http.createServer(app);

var io = require("socket.io")(server);

io.on("connection", (socket) => {
  socket.on("postMessage", (data) => {
    io.emit("updateMessages", data);
  });
});

reload(app)
  .then(() => {
    // reloadReturned is documented in the returns API in the README

    // Reload started, start web server
    server.listen(app.get("port"), () => {
      console.log("Web server started");
      console.log("Point your browser to: http://localhost:" + app.get("port"));
    });
  })
  .catch((err) => {
    console.error(
      "Reload could not start, could not start server/sample app",
      err
    );
  });
