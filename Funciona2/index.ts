import * as dotenv from "dotenv";
import express     from "express";
import * as bodyParser from "body-parser";

import { PiezasLinkerRouter } from "./routes/PiezasLinkerRouter";
import { ProcesoRouter }      from "./routes/ProcesoRouter";
import { PiezaRouter }        from "./routes/PiezaRouter";

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
dotenv.config();

app.use(bodyParser.json());

app.use("/piezas", PiezaRouter);
app.use("/procesos", ProcesoRouter);
app.use("/piezasLinker", PiezasLinkerRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT, () => {
    console.log(`Node server running in port ${process.env.PORT}! (๑✪ . ✪๑)`);
});
