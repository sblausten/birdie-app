import * as express from "express";
import {main} from "./controllers/main";

const app = express();

app.use(main);

export default app;
