const express = require("express");
const app = express();
const bedRouter = require("./routes/noteRoutes");
const userRouter = require("./routes/userRoutes"); 
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan")

dotenv.config();

const mongoose = require("mongoose");

app.use(express.json());

app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));

app.use("/users", userRouter);
app.use("/note", bedRouter);

app.get("/", (req, res) =>{
    res.send("API");
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server running on http://localhost:${PORT}`);
    });
})
.catch((error)=>{
    console.log(error);
})
