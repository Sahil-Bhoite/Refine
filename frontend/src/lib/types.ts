// Core types for the application

export type Step = 'upload' | 'preview' | 'evaluation' | 'refinement' | 'download';

export interface ResumeData {
  latexCode: string;
}

export interface ScoreCategory {
  name: string;
  score: number;
  feedback: string;
}

export interface EvaluationResult {
  overallScore: number;
  categories: ScoreCategory[];
  pros: string[];
  cons: string[];
  fitDecision: 'poor' | 'moderate' | 'good' | 'excellent';
  summary: string;
}

export interface SectionImprovement {
  original: string;
  improved: string;
  explanation: string;
}

export interface RefinementResult {
  refinedLatexCode: string;
  overallImprovementsSummary?: string;
}

export interface AppState {
  currentStep: Step;
  originalResume: ResumeData | null;
  jobDescription: string;
  evaluationResult: EvaluationResult | null;
  refinementResult: RefinementResult | null;
  refinedEvaluationResult: EvaluationResult | null;
  isLoading: boolean;
  error: string | null;
}
