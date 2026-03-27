export interface CardSearchResult {
  card_id: string;
  card_name: string;
  bank: string;
  card_type: string;
  thumbnail_url?: string;
}

export interface CardRecord extends CardSearchResult {
  annual_fee: number;
  fee_waiver_annual_spend: number;
  reward_rates: Record<string, number>;
  income_min: number;
  lounge_access_domestic: number;
  lounge_access_international: number;
  welcome_bonus_value: number;
  is_active: boolean;
}
