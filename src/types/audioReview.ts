export interface AudioReview {
  id: number;
  title: string;
  audioUrl: string;
  rating: number;
  fallbackDuration?: number;
}
