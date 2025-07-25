//import dotenv from "dotenv"
import express from "express"
const app = express()


//dotenv.config({
//    path: "./env"
//})







const PORT = process.env.PORT || 8000;








app.listen(PORT, () => {
    console.log("App is listening")

})