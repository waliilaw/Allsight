import { MarketParser } from './parsers/parser';
import { MarketMatcher } from './matcher/matcher';
import { RuleValidator } from './validator/validator';
import { CacheStore } from './cache/redis';

// normalization service
// consumes raw market data, normalizes schema, matches equivalent markets

class NormalizationService {
  private parser: MarketParser;
  private matcher: MarketMatcher;
  private validator: RuleValidator;
  private cache: CacheStore;

  constructor() {
    this.parser = new MarketParser();
    this.matcher = new MarketMatcher();
    this.validator = new RuleValidator();
    this.cache = new CacheStore();
  }

  async processMarket(rawMarket: any) {
    // parse resolution criteria, deadlines, sources
    const parsed = this.parser.parse(rawMarket);
    
    // find matching markets across platforms
    const matches = await this.matcher.findMatches(parsed);
    
    // validate rules and flag conflicts
    const validation = this.validator.validate(parsed, matches);
    
    // cache normalized state
    await this.cache.set(parsed.id, {
      ...parsed,
      matches,
      validation,
    });

    return { parsed, matches, validation };
  }
}

export { NormalizationService };
