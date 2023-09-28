import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { activityInformation, state } from './initial-statement.js';
import { options } from './config/swagger.js';
import { set_SSE_headers } from './functions/sse.js';
import { randomChange } from './functions/randomChange.js';
import { pickRoom } from './functions/pickRoom.js';

const app = express();
const PORT = 3001;

const openapiSpecification = swaggerJsdoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use(cors());

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get profile information
 *     responses:
 *       200:
 *         description: OK
 */
app.get('/profile', (req, res) => {
  res.send({
    name: 'John',
    surname: 'Smith',
    email: 'john.smith@jito.dev'
  });
});

/**
 * @swagger
 * /activity:
 *   get:
 *     summary: Get activity information via SSE
 *     description: This endpoint provides Server-Sent Events. In the Swagger UI, it will "load" indefinitely since it is a persistent connection. Use EventSource on the client to listen for these events.
 *     responses:
 *       200:
 *         description: OK
 */
app.get('/activity', (req, res) => {
    set_SSE_headers(res)
  
    const messageInterval = setInterval(() => {
        activityInformation.calls += Math.round(Math.random() * 4);
        activityInformation.mails += Math.round(Math.random() * 3);
        activityInformation.texts += Math.round(Math.random() * 5);

        res.write(`event: message\n`);
        res.write(`data: ${JSON.stringify(activityInformation)}\n`);
    }, 5000);
  
    req.on('close', () => {
      clearInterval(messageInterval);
    });
});

/**
 * @swagger
 * /activity-example:
 *   get:
 *     summary: Example of response body for /activity SSE
 *     description: This is just an example of response body for /activity SSE endpoint 
 *     responses:
 *       200:
 *         description: OK
 */
app.get('/activity-example', (req, res) => {
    res.send(activityInformation);
});

/**
 * @swagger
 * /state:
 *   get:
 *     summary: Get apartment state information via SSE
 *     description: This endpoint provides Server-Sent Events. In the Swagger UI, it will "load" indefinitely since it is a persistent connection. Use EventSource on the client to listen for these events.
 *     responses:
 *       200:
 *         description: OK
 */
app.get('/state', (req, res) => {
    set_SSE_headers(res)
  
    const messageInterval = setInterval(() => {
        const changeMessage = randomChange(state)

        const data = {
            state,
            message: changeMessage
        }

        res.write(`event: message\n`);
        res.write(`data: ${JSON.stringify(data)}\n`);
    }, 3000);
  
    req.on('close', () => {
      clearInterval(messageInterval);
    });
});

/**
 * @swagger
 * /state-example:
 *   get:
 *     summary: Example of response body for /state SSE
 *     description: This is just an example of response body for /state SSE endpoint 
 *     responses:
 *       200:
 *         description: OK
 */
app.get('/state-example', (req, res) => {
    const changeMessage = randomChange(state)

    const data = {
        state,
        message: changeMessage
    }

    res.send(data);
});

/**
 * @swagger
 * /movement:
 *   get:
 *     summary: Get movement information via SSE
 *     description: This endpoint provides Server-Sent Events. In the Swagger UI, it will "load" indefinitely since it is a persistent connection. Use EventSource on the client to listen for these events.
 *     responses:
 *       200:
 *         description: OK
 */
app.get('/movement', (req, res) => {
    set_SSE_headers(res)
  
    const messageInterval = setInterval(() => {
        const room = pickRoom()

        res.write(`event: message\n`);
        res.write(`data: ${JSON.stringify({ room })}\n`);
    }, 4000);
  
    req.on('close', () => {
      clearInterval(messageInterval);
    });
});

/**
 * @swagger
 * /movement-example:
 *   get:
 *     summary: Example of response body for /movement SSE
 *     description: This is just an example of response body for /movement SSE endpoint 
 *     responses:
 *       200:
 *         description: OK
 */
app.get('/movement-example', (req, res) => {
    const room = pickRoom()

    res.send({
        room
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});