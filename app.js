require('dotenv').config()
const express = require('express');
const router = require('./route');
const errorMiddleware = require('./middleware/errorMiddleware');
const { syncDatabase } = require('./model');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use(router);
app.use(errorMiddleware);

const start = async () => {
    try {
        await syncDatabase();
        console.log('Db synced');
        
        app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
    } catch (e) {
        console.log(e);
    }
}

start();