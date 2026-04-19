/** Normalizes `{ data: { data: T } }` envelope from panel auth responses. */
export function getResponseData<T>(response: { data: { data?: T } }): T {
  return response.data.data as T;
}
