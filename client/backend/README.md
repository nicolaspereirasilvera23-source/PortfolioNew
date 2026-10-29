# Portfolio contact API

NestJS service that accepts portfolio contact messages and sends them through Resend.

## Run locally

```powershell
cd client/backend
npm install
npm run start:dev
```

The API listens on port 3000 by default. The frontend posts to `POST /api/send-email` and can override the URL with `window.PORTFOLIO_API_URL`.

Configure `RESEND_API_KEY` in the process environment or in a `.env` file. The API loads `client/backend/.env` first, then the project root `.env`. The service also accepts `RECIPIENT_EMAIL` (or the existing `CONTACT_EMAIL`) and `SENDER_EMAIL` (or the existing `RESEND_FROM`). Defaults preserve the current portfolio recipient and Resend test sender.

`GET /health` reports service health and whether the Resend key is present. Set `CORS_ORIGIN` to a comma-separated list of allowed frontend origins in production; local development allows all origins.
