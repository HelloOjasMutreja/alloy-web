import type { CardSearchResult } from '../types/cards';
import type { RecommendationResponse } from '../types/results';
import type { QuestionnaireState } from '../types/questionnaire';

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

const MOCK_CARDS: CardSearchResult[] = [
  { card_id: 'hdfc_regalia_gold', card_name: 'HDFC Regalia Gold', bank: 'HDFC Bank', card_type: 'Travel' },
  { card_id: 'hdfc_millennia', card_name: 'HDFC Millennia', bank: 'HDFC Bank', card_type: 'Cashback' },
  { card_id: 'axis_magnus', card_name: 'Axis Magnus', bank: 'Axis Bank', card_type: 'Travel' },
  { card_id: 'sbi_simplysave', card_name: 'SBI SimplySAVE', bank: 'SBI', card_type: 'Cashback' },
  { card_id: 'icici_amazon_pay', card_name: 'Amazon Pay ICICI', bank: 'ICICI Bank', card_type: 'Shopping' },
  { card_id: 'amex_mrcc', card_name: 'American Express MRCC', bank: 'Amex', card_type: 'Rewards' },
];

const MOCK_RESULT_B: RecommendationResponse = {
  result_type: 'B',
  recommendations: [{
    card_id: 'hdfc_regalia_gold',
    card_name: 'HDFC Regalia Gold',
    bank: 'HDFC Bank',
    net_annual_value: 6000,
    annual_fee: 2500,
    fee_waiver_spend: 300000,
    why_it_fits: 'Earns 4x on your top spend categories with lounge access included.',
    honest_weakness: 'Not ideal if your fuel spend is your biggest category.',
    welcome_bonus_value: 2500,
  }],
  current_card_value: 1800,
  best_alternative_value: 6000,
  annual_gap: 4200,
  gap_sentiment: 'SIGNAL',
  honest_verdict: 'SWITCH',
  engine_version: 'mock-1.0',
};

export const api = {
  searchCards: async (query: string): Promise<CardSearchResult[]> => {
    await delay(400 + Math.random() * 400);
    if (!query || query.length < 2) return [];
    return MOCK_CARDS.filter(c =>
      c.card_name.toLowerCase().includes(query.toLowerCase()) ||
      c.bank.toLowerCase().includes(query.toLowerCase())
    );
  },

  getRecommendations: async (
    _payload: Partial<QuestionnaireState>
  ): Promise<RecommendationResponse> => {
    await delay(600 + Math.random() * 400);
    return MOCK_RESULT_B;
  },
};
