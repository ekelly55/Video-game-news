import express from "express"
import * as dotevnv from "dotenv"
import cors from "cors"
import helmet from "helmet"


dotenv.config()

const app = express();
const PORT = parseInt(process.env.PORT as string, 10);

app.set('view engine', 'ejs');


app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors())
app.use(helmet())

app.use(
    session({
        store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
        secret: "super secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, 
        },
    })
);


app.use(function (req, res, next) {
    res.locals.currentUser = req.session.currentUser;
    next();
});


    
    
app.listen(process.env.PORT || 4000)