const performanceLogger = (options = {}) => {
  const {
    logIncoming = true,
    logStatusCode = true,
    logDuration = true,
    logMethod = true,
    logPath = true,
    logIP = false,
    logUserAgent = false,
  } = options;

  return (req, res, next) => {
    const start = Date.now();

    // Log incoming request details
    if (logIncoming) {
      let logMessage = "";

      if (logMethod) {
        logMessage += `${getMethodColor(req.method)}${req.method}\x1b[0m `;
      }

      if (logPath) {
        logMessage += `${getPathColor(req.originalUrl)}${req.originalUrl}\x1b[0m `;
      }

      if (logIP) {
        logMessage += `from ${req.ip} `;
      }

      if (logUserAgent) {
        logMessage += `(User-Agent: ${req.headers["user-agent"]}) `;
      }

      logMessage += "- Incoming request";
      console.log(logMessage);
    }

    // Log status and duration on response finish
    res.on("finish", () => {
      const duration = Date.now() - start;
      let logMessage = "";

      if (logMethod) {
        logMessage += `${getMethodColor(req.method)}${req.method}\x1b[0m `;
      }

      if (logPath) {
        logMessage += `${getPathColor(req.originalUrl)}${req.originalUrl}\x1b[0m `;
      }

      if (logStatusCode) {
        const statusColor = getStatusColor(res.statusCode);
        logMessage += `- Status: ${statusColor}${res.statusCode}\x1b[0m `;
      }

      if (logDuration) {
        logMessage += `- Took: \x1b[33m${(duration / 1000).toFixed(3)} seconds\x1b[0m `;
      }

      console.log(logMessage);
    });

    next();
  };
};

// Helper: Assign color for HTTP methods
function getMethodColor(method) {
  switch (method) {
    case "GET":
      return "\x1b[32m"; // Green
    case "POST":
      return "\x1b[34m"; // Blue
    case "PUT":
      return "\x1b[33m"; // Yellow
    case "DELETE":
      return "\x1b[31m"; // Red
    default:
      return "\x1b[0m";
  }
}

// Helper: Assign color for status codes
function getStatusColor(statusCode) {
  if (statusCode >= 200 && statusCode < 300) return "\x1b[32m"; // Green
  if (statusCode >= 300 && statusCode < 400) return "\x1b[36m"; // Cyan
  if (statusCode >= 400 && statusCode < 500) return "\x1b[33m"; // Yellow
  if (statusCode >= 500) return "\x1b[31m"; // Red
  return "\x1b[0m";
}

// Helper: Assign color for paths
function getPathColor(path) {
  return "\x1b[36m"; // Cyan
}

module.exports = performanceLogger;
