![demo](AllSight.gif)

# allsight

allsight is a cross-platform intelligence layer for prediction markets.

it aggregates markets across web2 and web3, normalizes their structure and rules, and exposes pricing inconsistencies and resolution risk through a single coherent surface.

the problem is not access to markets.
the problem is fragmentation.

prices, deadlines, resolution sources, and settlement logic vary across platforms. reconciling this manually is slow, error-prone, and expensive. allsight exists to remove that overhead.

## what it does

- ingests live and batch market data from multiple platforms
- normalizes schemas, timing, and resolution criteria
- maps equivalent markets with assisted verification
- compares implied probabilities across venues
- flags arbitrage, rule conflicts, and execution risk
- exposes read-only insights via api and dashboard

## what it is not

- not a betting platform
- not custodial
- not automation-first

## design stance

- analytics before execution
- correctness over speed
- human-in-the-loop where ambiguity exists
- infrastructure, not hype

## status

early-stage.
core systems under active development.


## project structure

```
allsight/
│
├── ingestion/           # platform connectors and data pipelines
│   ├── adapters/        # polymarket, kalshi, betfair, drift, hedgehog, smarkets
│   ├── websockets/      # real-time price feeds
│   ├── rest/            # polling for platforms without ws
│   └── queue/           # message broker for ingestion events
│
├── normalization/       # schema mapping and market matching
│   ├── parsers/         # extract resolution criteria, deadlines, sources
│   ├── matcher/         # semantic market matching algorithm
│   ├── validator/       # rule conflict detection
│   └── cache/           # normalized market state store
│
├── analysis/            # pricing and opportunity detection
│   ├── pricing/         # implied probability calculation
│   ├── arbitrage/       # cross-platform arb scanner
│   ├── risk/            # settlement risk scoring
│   └── signals/         # custom alert triggers
│
├── execution/           # order routing and strategy automation
│   ├── router/          # platform selection logic
│   ├── strategies/      # pre-built arb, hedge, farm templates
│   ├── executor/        # order placement abstraction layer
│   └── positions/       # cross-platform position tracking
│
├── api/                 # external interface
│   ├── rest/            # read endpoints for market data
│   ├── websocket/       # live price streams for pro users
│   ├── auth/            # token-gating and subscription mgmt
│   └── webhooks/        # alert delivery system
│
├── dashboard/           # frontend (next.js or similar)
│   ├── markets/         # comparison view, filters, search
│   ├── arb/             # opportunity feed with execution ui
│   ├── alerts/          # alert config and history
│   └── analytics/       # user stats, performance tracking
│
└── infra/               # platform services
    ├── db/              # postgres for structured data, timescaledb for pricing history
    ├── cache/           # redis for hot data and rate limiting
    ├── monitoring/      # error tracking, latency metrics, platform health
    └── workers/         # background jobs for reconciliation and cleanup
```

## ----------------------------------

<img width="1479" height="551" alt="Screenshot 2026-01-04 at 11 34 41 PM" src="https://github.com/user-attachments/assets/302d83da-a4e8-4413-8b5d-9c05da88e554" />
