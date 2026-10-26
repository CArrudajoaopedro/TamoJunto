import swaggerJSDoc, {Options} from "swagger-jsdoc"

const swaggerOptions: Options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "API do TamoJunto",
            version: "0.3.0",
            description: "Documentação da API de gerenciamento de eventos do TamoJunto",
        },
    servers: [
        {
            url: "http://localhost:3000",
            description: "Servidor Local",
        },
    ],
    },
    apis : [
        "/**/*.routes.ts",
        "/**/*controller.ts",
    ],
};
export const swaggerSpec = swaggerJSDoc(swaggerOptions);