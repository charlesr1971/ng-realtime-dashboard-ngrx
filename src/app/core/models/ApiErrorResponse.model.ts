export interface ApiErrorResponse {
  status?: number;
  error: ApiErrorResponseDetails;
}

export interface ApiErrorResponseDetails {
  code: string;
  message: string;
  errors?: ApiErrorItem[];
}

export interface ApiErrorItem {
  code: string;
  message: string;
  source?: ApiErrorSource;
}

export interface ApiErrorSource {
  id: number;
  type: string;
}
