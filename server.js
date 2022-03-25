var express = require("express");
var app = express();
var session = require("express-session");
// var uuid = require("uuid");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var dbConnect = require("./dbConnection");
var runAPIS = require("./APIS/index");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    // origin:"http://localhost:4200"
    // credentials:true
  })
);

app.use(
  session({
    // genid: function () {
    //   return uuid;
    // },
    secret: "hossam",
    resave: false,
    cookie: { maxAge: 1000000000000 },
  })
);

function Authenticate(req, resp, next) {
  if (req.url === "/signup" || req.url === "/signin") next();
  else {
    if (req.session.user && req.cookies["connect.sid"]) next();
    else resp.json({ message: "authentication failed" });
  }
}

app.use(Authenticate);
dbConnect();
runAPIS(app);

app.get("/", (req, resp) => {
  resp.send("server is running");
});
app.listen(8080);
