const mysql = require("mysql2");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
// const app = require("express")();44

dotenv.config({ path: "./.env" });

const sql = mysql.createConnection({
    host: "localhost",
    port: process.env.PORT || 3306,
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "taskmeister",
});

exports.SQL_Connection = sql.connect((err) =>
    console.log(err ? err.message : "DB connected successfully.")
);

exports.adminLogin = (request, response) => {
    const { username, password } = request.body;

    sql.query(
        `SELECT * FROM admin_login WHERE username = '${username}'`,
        async (err, res) => {
            console.log(err ? err.message : "Something went wrong.");
            if (res.length === 0) {
                return response.render("index", {
                    message: "Oops! Can not find user.",
                    color: "tomato",
                });
            } else if (!(await bcrypt.compare(password, res[0].password))) {
                return response.render("index", {
                    message: "Password is incorrect.",
                    color: "tomato",
                });
            } else {
                response.render("create-project");
                // app.use("/new", require("./routes/new-project"));
            }
        }
    );
};

exports.createNew = (request, response) => {
    const { project_name, project_summary } = request.body;
    const summary = project_summary.replace(/\'/g, "\\'")

    sql.query(
        `SELECT * FROM project WHERE project_name = '${project_name}'`,
        (err, res) => {
            console.log(err ? err.message : "Data Fetched");
            if (res.length > 0) {
                return response.render("create-project", {
                    message: "Project existing. Choose another name.",
                    color: "tomato",
                });
            } else {
                sql.query(
                    `INSERT INTO project (project_name, project_summary)
                     VALUES ('${project_name}', '${summary}')`,
                    (err) => {
                        console.log(
                            err ? err.message : "Project created successfully."
                        );
                        response.render("create-project", {
                            message: "Project created successfully.",
                            color: "#27ae60",
                        });
                    }
                );
            }
        }
    );
};

exports.getList = (request, response) => {
    sql.query(`SELECT * FROM project`, (err, res) => {
        console.log(err ? err.message : "Fetched Project list.");
        response.render("project-list", { project: res });
    });
};

exports.deleteItem = (request, response) => {
    const project_id = request.params.project_id

    sql.query(
        `DELETE FROM project WHERE project_id='${project_id}'`,
        (err, res) => {
            console.log(err ? err.message: 'Item deleted.');
            sql.query(`SELECT * FROM project`, (err, res) => {
                // console.log(err ? err.message : 'Item deleted.');
                response.render("project-list", { project: res });
            });
        }
    )
};

exports.routeToUpdate = (request, response) => {
    const project_id = request.params.project_id

    sql.query(
        `SELECT * from project WHERE project_id='${project_id}'`,
        (err, res) => {
            if(err || res.length === 0) return console.log(err.message);
            response.render('update-form', { 
                id: project_id,
                name: res[0].project_name,
                summary: res[0].project_summary,
            })
        }
    )
};

exports.updateItem = (request, response) => {
    const { project_id, project_name, project_summary } = request.body;

    sql.query(
        `UPDATE project
         SET project_name = '${project_name}', project_summary = '${project_summary}'
         WHERE project_id = '${project_id}'`,
         (err, res) => {
            console.log(res)
            if(err) return console.log(err.message);
            response.render('update-form', { message: 'Project updated.'})
         }
    )
}