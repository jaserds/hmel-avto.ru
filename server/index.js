import express from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload"
import path from "path"
import db from "./db.js"
import mainRoute from "./routes/index.js";
import errorResponce from "./middlewares/error-middlewares.js"
 

db.authenticate()
  .catch(error => console.error(error))


const __dirname = path.resolve("")
const app = express();
app.use(express.static(path.join(__dirname, 'static')));
app.use(fileUpload({}));
app.use(express.json());
app.use(cookieParser());
app.use('/api', mainRoute);
app.get('*', (req, res) => {
  res.sendFile('/var/www/hmel-avto.ru/client/dist/index.html');
});

app.use(errorResponce)

console.log(path.join(__dirname, '../client/dist', 'index.html'));
console.log(path.join(__dirname, 'static'));

const start = async () => {
    try{
        app.listen(4444, (err) => {
            if (err) {
                return console.log("Server error " + err);
            }
            console.log("Server Работает");
        })
    }
    catch (e){
        console.log(e);
    }
}


start()