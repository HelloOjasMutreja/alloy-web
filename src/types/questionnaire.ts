export type Intent = 'FIRST' | 'AUDIT' | 'OPTIMISE';
export type Tenure = 'UNDER_6M' | '6_12M' | '1_3Y' | '3Y_PLUS';
export type Goal = 'SAVINGS' | 'REWARDS' | 'BUILD_CREDIT' | 'TRAVEL' | 'NOT_SURE';
export type SpendCategory = 'FUEL' | 'DINING' | 'TRAVEL' | 'GROCERIES' | 
  'SHOPPING' | 'ENTERTAINMENT' | 'UTILITIES' | 'GENERAL';
export type TravelType = 'NONE' | 'DOMESTIC' | 'INTERNATIONAL';
export type MonthlySpend = 'S1' | 'S2' | 'S3' | 'S4' | 'S5';
export type IncomeBracket = 'I1' | 'I2' | 'I3' | 'I4' | 'I5';

export interface QuestionnaireState {
  intent: Intent | null;
  currentCards: string[];
  manualCardEntry: boolean;
  manualCardName: string | null;
  tenure: Tenure | null;
  goal: Goal | null;
  priorityRanking: string[];
  spendCategories: SpendCategory[];
  travelType: TravelType | null;
  monthlySpendBracket: MonthlySpend | null;
  incomeBracket: IncomeBracket | null;
  currentScreen: string;
  history: string[];
}
