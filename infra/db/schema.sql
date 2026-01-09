-- markets table
CREATE TABLE markets (
  id VARCHAR(255) PRIMARY KEY,
  platform VARCHAR(50) NOT NULL,
  question TEXT NOT NULL,
  outcomes JSONB NOT NULL,
  deadline TIMESTAMP,
  resolution_criteria TEXT,
  resolution_source VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_markets_platform ON markets(platform);
CREATE INDEX idx_markets_deadline ON markets(deadline);

-- market_prices table (timeseries)
CREATE TABLE market_prices (
  market_id VARCHAR(255) NOT NULL,
  prices JSONB NOT NULL,
  implied_prob JSONB NOT NULL,
  volume NUMERIC,
  timestamp TIMESTAMP NOT NULL,
  PRIMARY KEY (market_id, timestamp)
);

SELECT create_hypertable('market_prices', 'timestamp');

-- arbitrage_opportunities table
CREATE TABLE arbitrage_opportunities (
  id SERIAL PRIMARY KEY,
  market_ids JSONB NOT NULL,
  platforms JSONB NOT NULL,
  edge NUMERIC NOT NULL,
  detected_at TIMESTAMP DEFAULT NOW(),
  expired_at TIMESTAMP
);

-- user_positions table
CREATE TABLE user_positions (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  market_id VARCHAR(255) NOT NULL,
  platform VARCHAR(50) NOT NULL,
  side VARCHAR(10) NOT NULL,
  amount NUMERIC NOT NULL,
  entry_price NUMERIC NOT NULL,
  opened_at TIMESTAMP DEFAULT NOW(),
  closed_at TIMESTAMP
);

CREATE INDEX idx_positions_user ON user_positions(user_id);
CREATE INDEX idx_positions_market ON user_positions(market_id);

-- user_alerts table
CREATE TABLE user_alerts (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  market_id VARCHAR(255),
  condition JSONB NOT NULL,
  webhook_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  active BOOLEAN DEFAULT true
);
