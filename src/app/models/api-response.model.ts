export interface ApiResponse {
    message: string;
    errors?: {
      email?: string[];
    };
  }