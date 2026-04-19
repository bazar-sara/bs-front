export function getResponseData<T>(response: { data: { data?: T } }): T {
  return response.data.data as T;
}

/** Maps axios/API errors to a user-facing string for toasts and inline messages. */
export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (error && typeof error === 'object' && 'response' in error) {
    const msg = (
      error as { response?: { data?: { message?: string } } }
    ).response?.data?.message;
    if (msg) return msg;
  }
  if (
    error &&
    typeof error === 'object' &&
    'message' in error &&
    typeof (error as Error).message === 'string'
  ) {
    return (error as Error).message;
  }
  return fallback;
}
