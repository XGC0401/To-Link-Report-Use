# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## n8n AI Assistant Integration

This project routes AI chat through a Nuxt server endpoint: `POST /api/ai-assistant`.

### 1) Environment variables

Create a `.env` file in this frontend folder:

```bash
N8N_WEBHOOK_URL=https://your-n8n-domain/webhook/ai-assistant
N8N_INTERNAL_TOKEN=your-shared-secret-optional
```

### 2) n8n webhook input

Nuxt sends this payload to n8n:

```json
{
	"message": "What are the parking rules?",
	"building_id": "default",
	"lang": "en"
}
```

### 3) n8n webhook output

Return JSON with one of these fields:

```json
{
	"reply": "Visitor parking is allowed for up to 2 hours on B1."
}
```

`output` or `answer` are also accepted if `reply` is not present.
