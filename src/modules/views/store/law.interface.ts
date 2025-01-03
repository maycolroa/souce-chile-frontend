// interfaces/law.interface.ts
export interface Article {
  article: number;
  summary: string;
  evaluation: string;
  interest?: string;
}

export interface Law {
  id: string;
  title: string;
  articles: Article[];
  generalEvaluation: string;
}

export interface EvaluationStats {
  evaluatedPercentage: number;
  compliantPercentage: number;
}

export interface ArticleEvaluation {
  article: number;
  evaluation: string;
}
