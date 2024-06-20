const express = require("express"); 
const cors = require("cors");

const dbConnection = require("./utils/config")
const userRoutes = require("./routes/user");
const contactRoutes = require("./routes/contact");

const estimateRoutes = require("./routes/estimate");

const morgan = require("morgan");
const dotenv =require("dotenv");
const app = express();

app.use(express.json());
app.use(cors());  
app.use(morgan("combined"));
dotenv.config();



 
dbConnection();



//user

app.use("/users", userRoutes)



//contact

app.use("/contact", contactRoutes)


 
//Estimate
app.use("/estimate", estimateRoutes)



const port =process.env.PORT || 3000;
const host =process.env.HOST || localhost;

app.listen(port, host, () => {
    console.log(`server is running on http://${host}:${port}`);
})

