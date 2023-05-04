import * as bodyParser from "body-parser";
import * as dotenv     from "dotenv";
import      express    from "express";

import { PiezasLinkerRouter } from "./routes/PiezasLinkerRouter";
import { ProcesoRouter }      from "./routes/ProcesoRouter";
import { UsuarioRouter }      from "./routes/UsuarioRouter";
import { PiezaRouter }        from "./routes/PiezaRouter"

const swaggerUi       = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
dotenv.config();

app.use(bodyParser.json());

app.use("/piezas",       PiezaRouter);
app.use("/procesos",     ProcesoRouter);
app.use("/piezasLinker", PiezasLinkerRouter);
app.use("/usuarios",     UsuarioRouter);

//app.use("/", (req, res) => res.json({"hola (": "como va"}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT, () => {
    console.log(`Node server running in http://localhost:${process.env.PORT}! (๑✪ . ✪๑)`);
});