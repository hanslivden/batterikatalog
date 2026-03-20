# Beredskapsstrom

Norsk katalog for batterisystemer og installatører — hjelper privatpersoner og bedrifter å finne riktig løsning for beredskapsstrom.

## Local setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Fill in values in .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side only) |
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog project API key |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog host (e.g. `https://eu.i.posthog.com`) |
| `SENTRY_DSN` | Sentry DSN for error tracking |
| `SENTRY_AUTH_TOKEN` | Sentry auth token for source map uploads |
| `ANTHROPIC_API_KEY` | Anthropic API key for AI features |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `RESEND_API_KEY` | Resend API key for transactional email |

## Deploy

This project is deployed to Vercel. Every push to `master` triggers a production deployment.

```bash
# Deploy manually via CLI
vercel --prod
```

Make sure all environment variables are set in the Vercel project dashboard before deploying.
