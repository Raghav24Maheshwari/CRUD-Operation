export interface ApiResponse<T> {
  data: T | null | boolean | object | Array<T>;
  message: string;
}

export function createApiResponse<T>(
  data: T | null | boolean | object | Array<T> = null,
  message: string,
): ApiResponse<T> {
  return {
    message,
    data,
  };
}
