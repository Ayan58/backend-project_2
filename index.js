import express from "express"
const app = express()
//import dotenv from "dotenv"











const PORT = process.env.PORT || 8000








app.listen(PORT, () => {
    console.log("App is listening")

})