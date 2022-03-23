export interface ApiSuccessResponse<T> {
  message?: string;
  total?: number;
  skip?: number;
  limit?: number;
  data?: T;
}
