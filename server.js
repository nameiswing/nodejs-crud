const express = require("express");
const db = require("./controllers/project-queries");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "hbs");

app.use(express.static(__dirname + "/public")); //all files/folder inside this folder will treated as if they're in the root folder;
app.use("/new", require("./routes/new-project"));
app.use("/create", require("./routes/create"));
app.use("/list", require("./routes/list"));
app.use("/", require("./routes/auth"));

app.listen(port, () => {
    console.log(`Server: http://localhost:${port}`)
    db.SQL_Connection;
});