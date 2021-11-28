const authRouter = require("./modules/authenticate/router");
const classRouter = require("./modules/classes/router");
const fileRouter = require("./modules/test");
const notesRouter = require("./modules/notes/router");
const assignmentRouter = require("./modules/assignment/router");
const submissionRouter = require("./modules/solution/router");
const userRouter = require("./modules/user/router")

exports.initialise = async (app) => {
    app.get("/", function (req, res) { res.send("hi, the server is running fine!") })
    app.use("/auth", authRouter)
    app.use("/classes", classRouter)
    app.use("/file",fileRouter)
    app.use("/notes",notesRouter)
    app.use("/assignment",assignmentRouter)
    app.use("/submission",submissionRouter)
    app.use("/user",userRouter)
}