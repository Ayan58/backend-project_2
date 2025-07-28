import "./config.js"
import express from "express"
import db from './db.js';
import bodyParser from "body-parser";
import userRoutes from './routes/user.routes.js';
import candidateRoutes from './routes/candidate.routes.js';

const app = express();

app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

app.use('/user', userRoutes);
app.use('/candidate', candidateRoutes);

app.listen(PORT, ()=>{
    console.log('listening on port 3000');
})