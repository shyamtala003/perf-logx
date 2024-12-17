# performance-logger

A lightweight Express middleware to log HTTP requests and responses with colored output.

## Features:

- Logs HTTP methods, paths, status codes, and request duration.
- Adds colors to improve readability.
- Customizable logging behavior.

## Installation

```bash
npm install performance-logger
```

## Usage

#### Basic Setup

Here's how you can use perf-logx in a simple Express application:

```js
const express = require("express");
const perfLogx = require("perf-logx");

const app = express();

// Use the perf-logx middleware
app.use(perfLogx());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

#### Output

When a request is made to the server, you'll see a log like:

```csharp
[INFO] GET / 200 0.003s
```

- Method: GET
- Route: /
- Status Code: 200
- Request Duration: 0.003 seconds (color-coded)

## Example with Customization

You can also customize the logger behavior by passing options:

```js
const express = require("express");
const performanceLogger = require("perf-logx");

const app = express();

// Use the logger middleware with customized options
app.use(
  performanceLogger({
    logIncoming: true, // Log incoming requests
    logStatusCode: true, // Log response status codes
    logDuration: true, // Log the request duration
    logMethod: true, // Log the HTTP method
    logPath: true, // Log the request path
    logIP: true, // Log the IP address of the requester
    logUserAgent: true, // Log the User-Agent of the requester
  })
);

// Example route
app.get("/example", (req, res) => {
  res.send("This is an example route.");
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
```

## Configuration Options

| Option          | Type    | Default | Description                                                   |
| --------------- | ------- | ------- | ------------------------------------------------------------- |
| `logIncoming`   | Boolean | `true`  | Whether to log incoming requests (enabled by default).        |
| `logStatusCode` | Boolean | `true`  | Whether to log the response status code (enabled by default). |
| `logDuration`   | Boolean | `true`  | Whether to log the request duration (enabled by default).     |
| `logMethod`     | Boolean | `true`  | Whether to log the HTTP method (enabled by default).          |
| `logPath`       | Boolean | `true`  | Whether to log the request path (enabled by default).         |
| `logIP`         | Boolean | `false` | Whether to log the IP address of the requester.               |
| `logUserAgent`  | Boolean | `false` | Whether to log the User-Agent of the requester.               |

## License

This project is licensed under the MIT License
