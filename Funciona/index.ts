import * as dotenv            from "dotenv";
import      express           from "express";
import * as bodyParser        from "body-parser";

import { PiezaRouter }        from "./routes/PiezaRouter";
import { PiezasLinkerRouter } from "./routes/PiezasLinkerRouter";
import { ProcesoRouter }      from "./routes/ProcesoRouter"

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const swaggerOptions = {
    swaggerDefinition:{
        info:{
            version: "1.0.0",
            title: "Docu API",
            description: "API Documentation for use",
            contact:{
                name: "Peppino Spagetti",
                url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
            },
            servers: ["http://localhost:3000"]
        }
    },
    basePath: "/",
    apis:[
        "./routes/PiezaRouter.ts",
        "./routes/PiezasLinkerRouter.ts",
        "./routes/ProcesoRouter.ts",
    ]
};


const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use("/piezas",       PiezaRouter);
app.use("/piezaslinker", PiezasLinkerRouter);
app.use("/procesos",     ProcesoRouter);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT, () => {
    console.log(`Node server running in port ${process.env.PORT}! (๑✪ . ✪๑)`);
});

module.exports = app;
