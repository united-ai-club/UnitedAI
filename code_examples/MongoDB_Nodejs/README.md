1. run `npm install`

2. run `node exampleMongoDB.js`

3.1 Save a log entry:
`curl -X POST http://localhost:3000/logs \
     -H "Content-Type: application/json" \
     -d '{"message": "This is a log entry"}'
`

3.2 Retrieve all logs:
`curl -X GET http://localhost:3000/logs`
