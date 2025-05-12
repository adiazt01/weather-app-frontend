export interface ErrorApi {
    message: string;
    code?: string;
    details?: Record<string, any>;
  }