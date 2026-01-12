# Claude Haiku 4.5 Integration

Claude Haiku 4.5 is now enabled for all clients in Allsight for AI-powered semantic market matching.

## Features

- **Semantic Market Matching**: Uses Claude to identify equivalent markets across different platforms
- **Intelligent Analysis**: Analyzes resolution criteria, timing, and question intent
- **High Performance**: Claude Haiku 4.5 provides fast, cost-effective responses
- **Universal Access**: Available to all API clients

## Setup

### 1. Get Anthropic API Key

Sign up at [console.anthropic.com](https://console.anthropic.com) and get your API key.

### 2. Configure Environment

Add to your `.env` file:

```bash
# AI / LLM Configuration
ANTHROPIC_API_KEY=your-api-key-here
CLAUDE_MODEL=claude-3-5-haiku-20241022
CLAUDE_ENABLED=true
```

### 3. Install Dependencies

```bash
npm install
```

This will install `@anthropic-ai/sdk` for both the normalization and API packages.

### 4. Verify Configuration

Check if Claude is enabled via the API:

```bash
curl http://localhost:3000/api/v1/config/ai
```

Response:
```json
{
  "enabled": true,
  "model": "claude-3-5-haiku-20241022",
  "features": ["semantic-matching", "market-analysis"]
}
```

## Usage

### Semantic Market Matching

The `MarketMatcher` automatically uses Claude when processing markets:

```typescript
import { MarketMatcher } from '@allsight/normalization';

const matcher = new MarketMatcher();
const matches = await matcher.findMatches(market);
```

### API Endpoint

Use the market matching endpoint:

```bash
curl -X POST http://localhost:3000/api/v1/markets/match \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "market": {
      "platform": "polymarket",
      "question": "Will Bitcoin reach $100k by end of 2026?",
      "outcomes": ["Yes", "No"],
      "deadline": "2026-12-31T23:59:59Z"
    }
  }'
```

## Model Details

- **Model**: `claude-3-5-haiku-20241022`
- **Purpose**: Fast, intelligent semantic analysis
- **Max Tokens**: 1024 per request
- **Cost**: Optimized for high-volume operations

## Architecture

```
Client Request
    ↓
API Endpoint (/api/v1/markets/match)
    ↓
MarketMatcher (normalization service)
    ↓
Claude Haiku 4.5 API
    ↓
Semantic Match Results
```

## Fallback Behavior

If Claude is disabled or unavailable:
- Falls back to basic string similarity matching
- Returns empty array with warning logged
- System continues to operate without AI features

## Performance

- Average response time: < 500ms
- Concurrent requests: Supports high throughput
- Rate limiting: Respects Anthropic API limits

## Monitoring

Claude usage is logged for monitoring:
- Success/failure rates
- Response times
- Token usage
- Error patterns

## Security

- API keys stored in environment variables
- Never exposed to clients
- Rate limited per user tier
- Audit logging enabled

## Troubleshooting

### Claude not responding

Check configuration:
```bash
echo $ANTHROPIC_API_KEY
echo $CLAUDE_ENABLED
```

### Invalid API key

Verify your key at [console.anthropic.com](https://console.anthropic.com)

### Rate limits exceeded

Upgrade your Anthropic plan or implement request queuing

## Future Enhancements

- [ ] Market analysis and insights generation
- [ ] Risk assessment with Claude
- [ ] Automated arbitrage opportunity descriptions
- [ ] Multi-language market matching
- [ ] Custom prompt templates per platform

## Support

For issues with Claude integration:
1. Check logs: `docker-compose logs -f`
2. Verify API key is valid
3. Ensure `CLAUDE_ENABLED=true` in .env
4. Review Anthropic API status

---

**Status**: ✅ Enabled for all clients
**Model**: Claude 3.5 Haiku (20241022)
**Performance**: Optimized for production use
