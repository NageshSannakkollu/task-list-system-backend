const express =require("express")
const app = express()
const cors = require("cors")
const DBConnection = require("./config/db")
const port = 3010;
app.use(express.json())
app.use(cors())

const taskRouteUnits = require("./routes/taskRoutes.js")
const userAuthenticationUnits = require("./routes/userRoutes")

app.use("/",taskRouteUnits)
app.use("/",userAuthenticationUnits)


DBConnection();

app.listen(port,(() => {
    console.log(`Server running at: http://localhost:${port}/`)
}))