import { ApiErrorResponseDetails } from './ApiErrorResponse.model';

export interface ErrorState {
  messageKey: string;
  responseDetails?: ApiErrorResponseDetails;
}
