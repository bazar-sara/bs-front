export function getResponseData<T>(response: { data: { data?: T } }): T {
  return response.data.data as T;
}
