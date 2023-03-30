import * as dotenv            from "dotenv";
import      express           from "express";
import * as bodyParser        from "body-parser";
import { PiezaRouter }        from "./routes/PiezaRouter";
import { PiezasLinkerRouter } from "./routes/PiezasLinkerRouter";

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use("/piezas", PiezaRouter);
app.use("/piezaslinker", PiezasLinkerRouter);

app.listen(process.env.PORT, () => {
    console.log(`Node server running in port ${process.env.PORT}! (๑✪ . ✪๑)`);
});