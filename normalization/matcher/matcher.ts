// semantic matching algorithm for equivalent markets
import Anthropic from '@anthropic-ai/sdk';

export class MarketMatcher {
  private anthropic: Anthropic | null = null;
  private claudeEnabled: boolean;
  private model: string;

  constructor() {
    this.claudeEnabled = process.env.CLAUDE_ENABLED === 'true';
    this.model = process.env.CLAUDE_MODEL || 'claude-3-5-haiku-20241022';
    
    if (this.claudeEnabled && process.env.ANTHROPIC_API_KEY) {
      this.anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
      });
    }
  }

  async findMatches(market: any): Promise<any[]> {
    if (!this.claudeEnabled || !this.anthropic) {
      console.warn('Claude is not enabled or configured');
      return [];
    }

    try {
      // Use Claude Haiku 4.5 for semantic market matching
      const prompt = this.buildMatchingPrompt(market);
      
      const message = await this.anthropic.messages.create({
        model: this.model,
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      // Parse Claude's response to extract matches
      const matches = this.parseMatchResponse(message.content);
      return matches;
    } catch (error) {
      console.error('Claude matching error:', error);
      return [];
    }
  }

  private buildMatchingPrompt(market: any): string {
    return `Analyze this prediction market and identify semantically equivalent markets:

Market Details:
- Platform: ${market.platform}
- Question: ${market.question}
- Outcomes: ${JSON.stringify(market.outcomes)}
- Deadline: ${market.deadline}
- Resolution Criteria: ${market.resolution}
- Source: ${market.source}

Task: Determine if this market is semantically equivalent to other markets about the same real-world event, even if worded differently. Consider:
1. Core question intent
2. Resolution criteria alignment
3. Outcome compatibility
4. Timing overlap

Respond with a JSON array of potential matches with similarity scores (0-1).`;
  }

  private parseMatchResponse(content: any): any[] {
    try {
      // Extract text from Claude's response
      const text = content[0]?.text || '';
      
      // Look for JSON array in response
      const jsonMatch = text.match(/\[.*\]/s);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      return [];
    } catch (error) {
      console.error('Failed to parse match response:', error);
      return [];
    }
  }

  private computeSimilarity(market1: any, market2: any): number {
    // Fallback similarity computation if Claude is unavailable
    // Basic string similarity for question matching
    const q1 = market1.question.toLowerCase();
    const q2 = market2.question.toLowerCase();
    
    const words1 = new Set(q1.split(/\s+/));
    const words2 = new Set(q2.split(/\s+/));
    
    const intersection = new Set([...words1].filter(x => words2.has(x)));
    const union = new Set([...words1, ...words2]);
    
    return intersection.size / union.size;
  }
}
