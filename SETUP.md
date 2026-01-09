# allsight

## quick start

### 1. install dependencies
```bash
npm install
```

### 2. setup infrastructure
```bash
docker-compose up -d
```

this starts postgres, redis, and kafka locally.

### 3. configure environment
```bash
cp .env.example .env
# edit .env with your api keys
```

### 4. run migrations
```bash
psql -h localhost -U user -d allsight -f infra/db/schema.sql
```

### 5. start services

```bash
# development mode
npm run dev

# production build
npm run build
npm start
```

## architecture

- **ingestion**: pulls data from polymarket, kalshi, betfair, etc
- **normalization**: maps equivalent markets and validates rules
- **analysis**: calculates probabilities and detects arbitrage
- **execution**: routes orders to optimal platform
- **api**: rest + websocket endpoints
- **dashboard**: next.js frontend

## tech stack

- typescript / node.js
- postgres + timescaledb
- redis for caching
- kafka for message queue
- next.js for frontend

## development

each module is a workspace. run individual services:

```bash
cd ingestion && npm run dev
cd api && npm run dev
cd dashboard && npm run dev
```
