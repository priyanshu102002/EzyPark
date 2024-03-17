const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { connectDB } = require("./config/db.config");
const userRouter = require("./controllers/user");
const handleError = require('./utils/errorHandler');
const { isLoggedIn } = require("./controllers/middleware");
const parkingRouter = require("./controllers/parking");
const paymentMethodRouter = require("./controllers/paymentMethod");
const bookingRouter = require("./controllers/booking");
const spaceRouter = require("./controllers/spaceRouter");
const cors = require('cors');
const dotenv = require("dotenv");
const reviewRouter = require("./controllers/review");
const path = require("path")


// Set body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

dotenv.config();
const port = 8000;

app.use(cors())

// Connect Database
connectDB();

// const __dirname = path.resolve();

app.get('/', isLoggedIn, async (req, res) => {
    res.json({ message: 'Hello world!'})
})

app.use("/user", userRouter)
app.use("/parking", parkingRouter)
app.use("/paymentMethod", paymentMethodRouter)
app.use("/booking", bookingRouter)
app.use("/space", spaceRouter)
app.use("/review", reviewRouter)

app.use(express.static(path.join(__dirname,"Frontend/build")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})

// Error handler

app.use((req, res, next) => {
    const error = new Error("Not Found")
    error.status = 404;
    next(error)
})

app.use((error, req, res, next) => {
    handleError(error, res);
})

app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})