export type ResultType = 'A' | 'B' | 'C';
export type GapSentiment = 'POSITIVE' | 'NEUTRAL' | 'SIGNAL';
export type HonestVerdict = 'SWITCH' | 'STAY' | 'UPGRADE';

export interface RecommendedCard {
  card_id: string;
  card_name: string;
  bank: string;
  net_annual_value: number;
  annual_fee: number;
  fee_waiver_spend: number;
  why_it_fits: string;
  honest_weakness: string;
  welcome_bonus_value: number;
}

export interface RecommendationResponse {
  result_type: ResultType;
  recommendations: RecommendedCard[];
  current_card_value: number | null;
  best_alternative_value: number | null;
  annual_gap: number | null;
  gap_sentiment: GapSentiment;
  honest_verdict: HonestVerdict;
  engine_version: string;
}
