const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());    
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/test', (req, res, next) => {
    const { userId, dateToCheck } = req.body;   
    // const date = new Date(dateToCheck);

    return res.status(200).json({
        userId,
        dateToCheck,
        total: 3,
       "Schedules" : [
        // {
        //     "id": 1,
        //     "date": dateToCheck,
        //     "startTime": "09:00",
        //     "endTime": "10:00",
        //     "description": "Meeting with client",
        //     "location": "Office",
        //     "status": "confirmed"
        // },
        {
            "id": 2,
            "date": dateToCheck,
            "startTime": "11:00",
            "endTime": "12:00",
            "description": "Team meeting",
            "location": "Zoom",
            "status": "tentative"
        },
        {
            "id": 3,
            "date": dateToCheck,
            "startTime": "14:00",
            "endTime": "15:00",
            "description": "Project review",
            "location": "Office",
            "status": "cancelled"
        }
       ],
    });
});

app.post('/test2', (req, res, next)=> {
    const { userId, startDate, endDate } = req.body;   

    return res.status(200).json({
        userId,
        startDate,
        endDate,
       "Schedules" : `This is a dummy expenses for ${userId} from ${startDate} to ${endDate}`,
    });

})


app.post('/ping', (req, res, next) => {
    return res.status(200).json({
        message: 'Ping request successful',
    });
});

app.get('/', (req, res, next) => {
    const endpoints = [
        { 
            method: "GET", 
            path: "/", 
            description: "API documentation and endpoints overview" 
        },
        { 
            method: "POST", 
            path: "/ping", 
            description: "Ping endpoint for testing server availability",
            requestBodyExample: "No body required"
        },
        { 
            method: "POST", 
            path: "/test", 
            description: "Returns dummy schedules for a user on a specific date",
            requestBodyExample: JSON.stringify({
                userId: "user123",
                dateToCheck: "2024-06-10"
            }, null, 2)
        },
        { 
            method: "POST", 
            path: "/test2", 
            description: "Returns dummy expenses for a user between dates",
            requestBodyExample: JSON.stringify({
                userId: "user123",
                startDate: "2024-06-01",
                endDate: "2024-06-30"
            }, null, 2)
        }
    ];

    let html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Simple API Playground</title>
        <style>
            body {
                font-family: 'Segoe UI', Arial, sans-serif;
                background: #f7f7f9;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 800px;
                margin: 40px auto;
                background: #fff;
                border-radius: 10px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.07);
                padding: 32px 40px 40px 40px;
            }
            h1 {
                color: #2d3a4b;
                margin-bottom: 8px;
            }
            p {
                color: #555;
                margin-bottom: 32px;
            }
            .middleware-info {
                background: #f0f4f8;
                padding: 16px;
                border-radius: 6px;
                margin-bottom: 24px;
                border-left: 4px solid #2d3a4b;
            }
            .middleware-info h3 {
                margin: 0 0 8px 0;
                color: #2d3a4b;
            }
            .middleware-info ul {
                margin: 0;
                padding-left: 20px;
            }
            .middleware-info li {
                color: #555;
                margin-bottom: 4px;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 24px;
            }
            th, td {
                padding: 12px 10px;
                border-bottom: 1px solid #eaeaea;
                text-align: left;
                vertical-align: top;
            }
            th {
                background: #f0f4f8;
                color: #2d3a4b;
                font-weight: 600;
            }
            tr:last-child td {
                border-bottom: none;
            }
            code, pre {
                background: #f4f4f4;
                color: #c7254e;
                border-radius: 4px;
                padding: 2px 6px;
                font-size: 0.97em;
            }
            pre {
                display: block;
                padding: 10px;
                margin: 0;
                overflow-x: auto;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Simple API Playground</h1>
            <p>Welcome! Here are the available API endpoints:</p>
            
            <div class="middleware-info">
                <h3>Middleware Configuration</h3>
                <ul>
                    <li><strong>CORS:</strong> Cross-Origin Resource Sharing enabled</li>
                    <li><strong>JSON Parser:</strong> Express JSON middleware for parsing JSON request bodies</li>
                    <li><strong>URL Encoded:</strong> Extended URL encoding for form data</li>
                </ul>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th>Method</th>
                        <th>Path</th>
                        <th>Description</th>
                        <th>Request Body Example</th>
                    </tr>
                </thead>
                <tbody>
                    ${endpoints.map(ep => `
                        <tr>
                            <td><code>${ep.method}</code></td>
                            <td><code>${ep.path}</code></td>
                            <td>${ep.description}</td>
                            <td>
                                ${typeof ep.requestBodyExample === 'string' 
                                    ? `<pre>${ep.requestBodyExample}</pre>` 
                                    : `<pre>${JSON.stringify(ep.requestBodyExample, null, 2)}</pre>`
                                }
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <p style="color:#888;font-size:0.95em;">&copy; ${new Date().getFullYear()} API Playground</p>
        </div>
    </body>
    </html>
    `;

    res.status(200).send(html);
});

app.listen(3000);