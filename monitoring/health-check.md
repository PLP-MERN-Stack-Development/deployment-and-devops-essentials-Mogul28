# Health Check Endpoints

## Backend Health Check

The backend includes a health check endpoint at `/health` that returns:

```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 12345.67,
  "environment": "production",
  "database": "connected"
}
```

## Monitoring Setup

### 1. Uptime Monitoring

Use services like:
- **UptimeRobot**: https://uptimerobot.com
- **Pingdom**: https://www.pingdom.com
- **StatusCake**: https://www.statuscake.com

Configure to check: `https://deployment-and-devops-essentials-mogul28-mm0n.onrender.com/health`

### 2. Error Tracking

#### Sentry Setup

1. Create account at https://sentry.io
2. Create a new project
3. Get your DSN
4. Add to environment variables:
   - Backend: `SENTRY_DSN`
   - Frontend: `VITE_SENTRY_DSN`

#### Backend Integration

Add to `backend/server.js`:
```javascript
const Sentry = require("@sentry/node");

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});

// Add before other middleware
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// Add after routes, before error handler
app.use(Sentry.Handlers.errorHandler());
```

#### Frontend Integration

Add to `frontend/src/main.jsx`:
```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.VITE_NODE_ENV,
  integrations: [
    new Sentry.BrowserTracing(),
  ],
  tracesSampleRate: 1.0,
});
```

### 3. Performance Monitoring

- **New Relic**: https://newrelic.com
- **Datadog**: https://www.datadoghq.com
- **Application Insights**: Azure

### 4. Log Aggregation

- **Loggly**: https://www.loggly.com
- **Papertrail**: https://www.papertrail.com
- **CloudWatch**: AWS

Configure your logging middleware (morgan) to send logs to these services.

