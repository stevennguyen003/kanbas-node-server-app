import "dotenv/config";
import session from "express-session";
import express from "express";
import mongoose from "mongoose";
import UserRoutes from "./Users/routes.js";
import Lab5  from "./Lab5.js";
import Hello from "./Hello.js";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import cors from "cors";
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas'
mongoose.connect(CONNECTION_STRING);
const app = express();
app.use(
    cors({
        origin: ["http://localhost:3000", process.env.FRONTEND_URL],
        credentials: true,
    })
);
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.HTTP_SERVER_DOMAIN,
    };
}
app.use(session(sessionOptions));
app.use(express.json());
ModuleRoutes(app);
CourseRoutes(app);
Hello(app);
Lab5(app);
UserRoutes(app);
app.listen(4000);