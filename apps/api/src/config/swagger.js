const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Task Manager API",
            version: "1.0.0",
        },
        servers: [
            {
                //url: "http://localhost:3000",
                url: process.env.SERVER_URL,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                Task: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            format: "uuid",
                        },
                        title: {
                            type: "string",
                        },
                        description: {
                            type: "string",
                        },
                        status: {
                            type: "string",
                            enum: [
                                "TODO",
                                "IN_PROGRESS",
                                "DONE",
                            ],
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                        },
                        userId: {
                            type: "string",
                        },
                    },
                },
            },

        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/modules/**/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;